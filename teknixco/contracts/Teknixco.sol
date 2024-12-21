// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Teknixco {
    string public name = "Teknixco";
    uint public totalSupply = 1000000;

    mapping(address => uint) public balances;

    constructor() {
        balances[msg.sender] = totalSupply;
    }

    function transfer(address recipient, uint amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[recipient] += amount;
        return true;
    }
}