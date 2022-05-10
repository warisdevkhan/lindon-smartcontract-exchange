require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "bsc",
  networks: {
    hardhat: {},
    bsc: {
      url:
        "https://api-eu1.tatum.io/v3/blockchain/node/BSC/" +
        process.env.TATUM_MAINNET_API,
      accounts: [
        "818c8edfc870a8931acd8153eaefc5025d807edca416b189de5d4074908d2d2c",
      ],
    },
  },

  solidity: {
    version: "0.8.11",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  etherscan: {
    apiKey: {
      bsc: "IJYG2D37S8WF2BECAAT3QQS1Q7X9H4JPXF",
    },
  },
};
