// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";

/**
 * @title Token
 * @dev API interface for interacting with the CommerjaX Token contract
 */
interface Token {
    function transfer(address _to, uint256 _value) external returns (bool);

    function balanceOf(address _owner) external returns (uint256 balance);
}

/**
 * @title CommerjaX_ICO
 * @dev API interface for interacting with the CommerjaX Token contract
 */
contract CommerjaX_ICO is Ownable {
    using SafeMath for uint256;
    using Address for address;
    Token token;

    uint256 public constant RATE = 3000; // Number of tokens per Ether
    uint256 public constant CAP = 5350; // Cap in Ether
    uint256 public constant START = 1519862400; // Mar 26, 2018 @ 12:00 EST
    uint256 public constant DAYS = 45; // 45 Day

    uint256 public constant initialTokens = 6000000 * 10**18; // Initial number of tokens available
    bool public initialized = false;
    uint256 public raisedAmount = 0;

    address private _owner;

    /**
     * BoughtTokens
     * @dev Log tokens bought onto the blockchain
     */
    event BoughtTokens(address indexed to, uint256 value);

    /**
     * whenSaleIsActive
     * @dev ensures that the contract is still active
     **/
    modifier whenSaleIsActive() {
        // Check if sale is active
        assert(isActive());
        _;
    }

    /**
     * CommerjaXICO
     * @dev CommerjaXICO constructor
     **/
    constructor(address _tokenAddr) {
        require(
            _tokenAddr != address(0),
            "Token address cannot be a zero address"
        );
        token = Token(_tokenAddr);
        _owner = owner();
    }

    /**
     * initialize
     * @dev Initialize the contract
     **/
    function initialize() public onlyOwner {
        require(initialized == false); // Can only be initialized once
        require(tokensAvailable() == initialTokens); // Must have enough tokens allocated
        initialized = true;
    }

    /**
     * isActive
     * @dev Determins if the contract is still active
     **/
    function isActive() public view returns (bool) {
        return (initialized == true &&
            block.timestamp >= START && // Must be after the START date
            block.timestamp <= START.add(DAYS * 1 days) && // Must be before the end date
            goalReached() == false); // Goal must not already be reached
    }

    /**
     * goalReached
     * @dev Function to determin is goal has been reached
     **/
    function goalReached() public view returns (bool) {
        return (raisedAmount >= CAP * 1 ether);
    }

    /**
     * @dev Fallback function if ether is sent to address insted of buyTokens function
     **/
    fallback() external payable {
        buyTokens();
    }

    /**
     * buyTokens
     * @dev function that sells available tokens
     **/
    function buyTokens() public payable whenSaleIsActive {
        uint256 weiAmount = msg.value; // Calculate tokens to sell
        uint256 tokens = weiAmount.mul(RATE);

        emit BoughtTokens(msg.sender, tokens); // log event onto the blockchain
        raisedAmount = raisedAmount.add(msg.value); // Increment raised amount
        token.transfer(msg.sender, tokens); // Send tokens to buyer

        payable(_owner).transfer(msg.value); // Send money to _owner
    }

    /**
     * tokensAvailable
     * @dev returns the number of tokens allocated to this contract
     **/
    function tokensAvailable() public returns (uint256) {
        return token.balanceOf(address(this));
    }

    /**
     * destroy
     * @notice Terminate contract and refund to _owner
     **/
    function destroy() public onlyOwner {
        // Transfer tokens back to _owner
        uint256 balance = token.balanceOf(address(this));
        assert(balance > 0);
        token.transfer(_owner, balance);
        // There should be no ether in the contract but just in case
        selfdestruct(payable(_owner));
    }
}
