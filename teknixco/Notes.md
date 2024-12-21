Step 1: Set up the Project
Initialize the Project: Open your terminal and run the following commands to create a new project directory and initialize it.
```
mkdir teknixco
cd teknixco
npm init -y
```
Install Dependencies: Install the required dependencies, including Hardhat and ethers.js.
```
npm install --save-dev hardhat ethers
```
Set Up Hardhat: After installing the dependencies, run the following command to create a basic Hardhat project.
```
npx hardhat
```
Choose the "Create a basic sample project" option and follow the prompts. This will create a basic structure for your project.

Step 2: Configuration and Setting Up the Network
Modify hardhat.config.js: This is where you’ll define the configuration for your blockchain network. Open hardhat.config.js and modify it to set up a local network for "Teknixco".
```
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.19",  // Set the Solidity version
  networks: {
    hardhat: {
      chainId: 1337,  // Custom chainId for "Teknixco"
    },
    localhost: {
      url: "http://127.0.0.1:8545",  // Local Ethereum node
      accounts: [`0x${process.env.PRIVATE_KEY}`],  // Use environment variables for security
    },
  },
};
```
Install Environment Variables (Optional for Security): It's a good practice to keep your private keys in an environment file. You can use dotenv to load the private key from an .env file.
```
npm install dotenv

```
Create a .env file in the root directory and add your private key:
```
PRIVATE_KEY=your_private_key_here
```
Then, modify your hardhat.config.js to load the environment variables:
```
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  },
};
```

Step 3: Write a Smart Contract
Create a Simple Smart Contract: In the contracts directory, create a new Solidity file Teknixco.sol:
```
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
```

Step 4: Write Deployment Script
Create a Deployment Script: In the scripts folder, create a new deployment script deploy.js:
```
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const Teknixco = await ethers.getContractFactory("Teknixco");
    const teknixco = await Teknixco.deploy();

    console.log("Teknixco contract deployed to:", teknixco.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

Step 5: Running the Local Network
Start the Local Hardhat Network: Run the following command to start the local Hardhat network:
```
npx hardhat node
```
This will start a local Ethereum node at http://127.0.0.1:8545 and provide you with some test accounts.

Deploy the Smart Contract: With the local network running, deploy the smart contract by running:
```
npx hardhat run scripts/deploy.js --network localhost
```
This will deploy the contract to your local Hardhat network and show the address of the deployed contract.


Step 6: Interacting with the Contract
Create a Script to Interact with the Contract: In the scripts folder, create a new file interact.js to interact with the deployed contract:
```
async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Interacting with the contract using:", deployer.address);

    const contractAddress = "your_contract_address_here";  // Replace with the deployed contract address
    const Teknixco = await ethers.getContractFactory("Teknixco");
    const teknixco = Teknixco.attach(contractAddress);

    const balance = await teknixco.balances(deployer.address);
    console.log("Balance:", balance.toString());

    const recipient = "recipient_address_here";  // Replace with a recipient address
    const amount = 100;  // Amount to transfer
    const transferTx = await teknixco.transfer(recipient, amount);
    await transferTx.wait();

    console.log(`Transferred ${amount} to ${recipient}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
```

Run the Interaction Script:
```
npx hardhat run scripts/interact.js --network localhost
```
This script interacts with the deployed contract and transfers tokens from the deployer to a specified recipient.

Step 7: Folder Structure
Here’s the folder structure for your project:
```
/teknixco
├── /contracts
│   └── Teknixco.sol
├── /scripts
│   ├── deploy.js
│   └── interact.js
├── /node_modules
├── .env
├── hardhat.config.js
├── package.json
└── package-lock.json
```
Summary of What We Have Done:
Set up Hardhat with ethers.js.
Created a simple smart contract (Teknixco.sol).
Deployed the contract to a local network using Hardhat.
Interacted with the contract by transferring tokens between accounts.
This should give you a basic working backend for your blockchain network, "Teknixco", running locally. When you're ready, we can add a UI on top of this backend.


To check Balance
npx hardhat console --network localhost
const [deployer] = await ethers.getSigners();
const balance = await deployer.provider.getBalance(deployer.address);
console.log("Balance of deployer:", ethers.formatEther(balance));

Fund the account: If the account has a balance of 0, you'll need to fund it. To do this:
Hardhat comes with a local network that automatically creates some default accounts with pre-funded ETH. If you're using that local network, the accounts should already have sufficient funds. However, if you're working with a custom account or if the default accounts are not sufficient, you can transfer some ETH from another account or faucet.
You can also specify an initial balance for your account when starting the local Hardhat network. For example, you can start a Hardhat node with pre-funded accounts by specifying an initial balance:
npx hardhat node --fork <forked_network_url> --accounts 10 --blocktime 5
