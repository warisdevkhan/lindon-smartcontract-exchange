// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./CommerjaXDividendTracker.sol";
import "./SafeMathInt.sol";
import "./IterableMapping.sol";

import "../node_modules/@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../node_modules/@openzeppelin/contracts/utils/Address.sol";

// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Address.sol";
// import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol";

contract ETHBTracker is CommerjaXDividendTracker {
    using SafeMath for uint256;
    using SafeMathInt for int256;
    using Address for address;

    constructor() CommerjaXDividendTracker() {}

    function _withdrawDividendOfUser(address payable user)
        internal
        override
        returns (uint256)
    {
        uint256 _withdrawableDividend = withdrawableDividendOf(user);
        if (_withdrawableDividend > 0) {
            withdrawnDividends[user] = withdrawnDividends[user].add(
                _withdrawableDividend
            );
            emit DividendWithdrawn(user, _withdrawableDividend);

            bool success = IERC20(ETHB).transfer(user, _withdrawableDividend);
            if (!success) {
                withdrawnDividends[user] = withdrawnDividends[user].sub(
                    _withdrawableDividend
                );
                return 0;
            }
            return _withdrawableDividend;
        }
        return 0;
    }
}
