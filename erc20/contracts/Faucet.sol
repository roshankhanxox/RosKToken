// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

interface IERC20 {
    function transfer(address to,uint256 amount) external returns(bool);
    function balanceOf(address account) external view returns(uint256);
    event Transfer(address indexed from,address indexed to,uint256 value);

}

contract Faucet {
    address payable owner;
    IERC20 public token;

    uint256 public withdrawalAmount = 50 * (10 ** 18);
    uint256 public lockTime = 1 minutes;

    event Deposit(address indexed from, uint256 indexed amount);

    mapping(address => uint256) nextAccessTime;

    constructor(address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner,"not the owner");
        _;
    }

    function requestTokens() public{
        require(msg.sender != address(0),"Request must not originate from a zero account");
        require(token.balanceOf(address(this)) >= withdrawalAmount,"Insufficient balance in faucet for withdrawal");
        require(block.timestamp >= nextAccessTime[msg.sender],"Insufficient time elapsed since last withdrawal - try again later");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;

        token.transfer(msg.sender, withdrawalAmount);
    }

    receive() external payable { 
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns(uint256 balance) {
        balance = token.balanceOf(address(this));
        return balance;
    }

    function setWithdrawalAmount(uint256 amount) public onlyOwner{
        withdrawalAmount = amount * (10**18);
    }

    function setLockTime(uint256 amount) public onlyOwner{
        lockTime = amount * 1 minutes;
    }

    function withdrawal() external onlyOwner{
        token.transfer(msg.sender, token.balanceOf(address(this)));
        
    }
}