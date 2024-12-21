require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
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