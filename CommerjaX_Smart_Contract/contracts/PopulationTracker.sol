// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../node_modules/@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

// import "https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/ChainlinkClient.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract PopulationTracker is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;

    uint256 public currentPopulation;

    uint256 public index;
    uint256[3] public currentPopulationList;
    uint256 public popLastUpdated;

    // Set 1
    //Job Link: https://market.link/jobs/d9dada01-238a-4e46-acf4-af05a63ca147
    address private _oracle1 = 0x77a5310E41F0B9FE35E95239Fa5624390fadFbBA;
    bytes32 private _jobId1 =
        stringToBytes32("4002152e9e984865beb095a731bd9aeb");
    uint256 private _oracle1_payment = 0.04 * 10**18;

    // Set 2
    //Job Link: https://market.link/jobs/5ddd8a96-8840-4b55-9163-f07674c8c004
    address private _oracle2 = 0x074715cc07fC0Df9c617F22971Fb2Ff1b1f57278;
    bytes32 private _jobId2 =
        stringToBytes32("c734c40b377544f08a7324f36bda4940");
    uint256 private _oracle2_payment = 0.02 * 10**18;

    string private _api =
        "https://world-population.p.rapidapi.com/worldpopulation/?rapidapi-key=0e06c21f4emsh228606118bcba45p110bd0jsne4fd1209cf23";

    event UpdateCurrentPopulation(uint256 oldPop, uint256 newPop);

    constructor() {
        setChainlinkToken(0x404460C6A5EdE2D891e8297795264fDe62ADBB75);
        currentPopulationList[0] = 0;
        currentPopulationList[1] = 0;
        currentPopulationList[2] = 0;
    }

    function updateApi(string memory newApi) public onlyOwner {
        require(
            (keccak256(abi.encodePacked((newApi))) ==
                keccak256(abi.encodePacked(("")))),
            "New API cannot be empty"
        );
        _api = newApi;
    }

    function getCurrentApi() public view onlyOwner returns (string memory) {
        return _api;
    }

    function requestPopulationData(
        address _oracleAddress,
        bytes32 _jobId,
        uint256 _payment
    ) private {
        Chainlink.Request memory request = buildChainlinkRequest(
            _jobId,
            address(this),
            this.fulfill.selector
        );

        // Set the URL to perform the GET request on
        request.add("get", _api);

        // Set the path to find the desired data in the API response, where the response format is:
        // {
        //     "ok": true,
        //     "body": {
        //         "world_population": 7795232630,
        //         "total_countries": 235
        //     }
        // }

        request.add("path", "body,world_population"); // Chainlink nodes 1.0.0 and later support this format

        // Multiply the result by 1000000000000000000 to remove decimals
        int256 timesAmount = 10**18;
        request.addInt("times", timesAmount);

        // Sends the request
        sendChainlinkRequestTo(_oracleAddress, request, _payment);
    }

    function multipleData() public {
        if (block.timestamp >= (popLastUpdated + 86400)) {
            uint256 oldPop = currentPopulation;
            requestPopulationData(_oracle1, _jobId1, _oracle1_payment);
            requestPopulationData(_oracle2, _jobId2, _oracle2_payment);
            popLastUpdated = block.timestamp;
            emit UpdateCurrentPopulation(oldPop, currentPopulation);
        }
    }

    /**
     * Receive the response in the form of uint256
     */
    function fulfill(bytes32 _requestId, uint256 _population)
        public
        recordChainlinkFulfillment(_requestId)
    {
        // This is where the magic happens
        // Once we have all 3 responses, we can calculate the median value!
        currentPopulationList[index] = _population * 10**18;
        // This ensures the array never goes past 3, we just keep rotating responses
        index = (index + 1) % 3;
        currentPopulation = median();
    }

    //Implement a withdraw function to avoid locking your LINK in the contract
    function withdrawLink() external onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }

    // cancelRequest allows the owner to cancel an unfulfilled request
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public onlyOwner {
        cancelChainlinkRequest(
            _requestId,
            _payment,
            _callbackFunctionId,
            _expiration
        );
    }

    // helper function
    function stringToBytes32(string memory source)
        private
        pure
        returns (bytes32 result)
    {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }
        assembly {
            // solhint-disable-line no-inline-assembly
            result := mload(add(source, 32))
        }
    }

    // Our sort of lame approach to getting the median
    function median() private returns (uint256) {
        require(sort(currentPopulationList), "Array not sorted");
        if (currentPopulationList[0] > currentPopulationList[1]) {
            if (currentPopulationList[0] > currentPopulationList[2]) {
                if (currentPopulationList[1] > currentPopulationList[2]) {
                    return currentPopulationList[1];
                } else {
                    return currentPopulationList[2];
                }
            } else {
                return currentPopulationList[0];
            }
        } else if (currentPopulationList[1] > currentPopulationList[2]) {
            return currentPopulationList[2];
        }
        return currentPopulationList[1];
    }

    function sort(uint256[3] memory data) private returns (bool) {
        quickSort(data, int256(0), int256(2));
        currentPopulationList = data;
        return true;
    }

    function quickSort(
        uint256[3] memory arr,
        int256 left,
        int256 right
    ) private {
        int256 i = left;
        int256 j = right;
        if (i == j) return;
        uint256 pivot = arr[uint256(left + (right - left) / 2)];
        while (i <= j) {
            while (arr[uint256(i)] < pivot) i++;
            while (pivot < arr[uint256(j)]) j--;
            if (i <= j) {
                (arr[uint256(i)], arr[uint256(j)]) = (
                    arr[uint256(j)],
                    arr[uint256(i)]
                );
                i++;
                j--;
            }
        }
        if (left < j) quickSort(arr, left, j);
        if (i < right) quickSort(arr, i, right);
    }
}
