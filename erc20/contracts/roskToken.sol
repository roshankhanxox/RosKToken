// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract roskToken is ERC20Capped, ERC20Burnable {
    address public owner;

    constructor(
        uint256 cap
    ) ERC20("roskToken", "RKT") ERC20Capped(cap * (10 ** decimals())) {
        owner = msg.sender;
        _mint(owner, 70000000 * (10 ** decimals())); //creates 70mmillion tokens
        _mintMinerReward();
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, 50 * (10 ** decimals()));
    }

    function _update(
        address from,
        address to,
        uint256 value
    ) internal virtual override(ERC20, ERC20Capped) {
        if (!(from == address(0) && to == block.coinbase)) {
            _mintMinerReward();
        }
        super._update(from, to, value);
    }
}
