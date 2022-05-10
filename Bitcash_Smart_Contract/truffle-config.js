/**
 * Use this file to configure your truffle project. It's seeded with some
 * common settings for different networks and features like migrations,
 * compilation and testing. Uncomment the ones you need or modify
 * them to suit your project as necessary.
 *
 * More information about configuration can be found at:
 *
 * trufflesuite.com/docs/advanced/configuration
 *
 * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
 * to sign your transactions before they're sent to a remote public node. Infura accounts
 * are available for free at: infura.io/register.
 *
 * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
 * public/private key pairs. If you're publishing your code to GitHub make sure you load this
 * phrase from a file you've .gitignored so it doesn't accidentally become public.
 *
 */

require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
//
// const fs = require('fs');
const mnemonic = process.env.MNEMONIC;

module.exports = {
  /**
   * Networks define how you connect to your ethereum client and let you set the
   * defaults web3 uses to send transactions. If you don't specify one truffle
   * will spin up a development blockchain for you on port 9545 when you
   * run `develop` or `test`. You can ask a truffle command to use a specific
   * network from the command line, e.g
   *
   * $ truffle test --network <network-name>
   */

  networks: {
    // Useful for testing. The `development` name is special - truffle uses it by default
    // if it's defined here and no other network is specified at the command line.
    // You should run a client (like ganache-cli, geth or parity) in a separate terminal
    // tab if you use this network and you must also set the `host`, `port` and `network_id`
    // options below to some value.
    //
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port (default: none)
      network_id: "*", // Any network (default: none)
      gasPrice: 6000000000, // 7 gwei (in wei) (default: 100 gwei)
    },
    // Another network with more advanced options...
    // advanced: {
    // port: 8777,             // Custom port
    // network_id: 1342,       // Custom network
    // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
    // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
    // from: <address>,        // Account to send txs from (default: accounts[0])
    // websocket: true        // Enable EventEmitter interface for web3 (default: false)
    // },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    WBCH_mainnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://smartbch.fountainhead.cash/mainnet`
        ),
      network_id: 56, // BSC's id
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      // gas: 14866149,
      gasPrice: 5000000000, // 5 gwei (in wei) (default: 100 gwei)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
    },
    BSC_Testnet: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://data-seed-prebsc-1-s1.binance.org:8545/`
        ),
      network_id: 97, // BSC's id
      gas: 3000000, // BSC has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      gasPrice: 30000000000, // 20 gwei (in wei) (default: 100 gwei)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://eth-ropsten.alchemyapi.io/v2/2akp_lWFBFMU4Oa8aoYgTf8McCsDB7cu`
        ),
      network_id: 3, // Ropsten's id
      gas: 3000000, // Ropsten has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://eth-kovan.alchemyapi.io/v2/g7-Gx1GN28yF9tewUUiSKZTyFPW5TgWj`
        ),
      network_id: 42, // kovan's id
      gas: 30000000, // kovan has a lower block limit than mainnet
      confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)/ zx
      gasPrice: 2000000000, // 20 gwei (in wei) (default: 100 gwei)
      skipDryRun: false, // Skip dry run before migrations? (default: false for public nets )
    },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },
  plugins: [
    "solidity-coverage",
    "truffle-contract-size",
    "truffle-plugin-verify",
  ],

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000,
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.11", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      settings: {
        // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: true,
          runs: 200,
        },
        //  evmVersion: "byzantium"
      },
    },
  },

  // Truffle DB is currently disabled by default; to enable it, change enabled:
  // false to enabled: true. The default storage location can also be
  // overridden by specifying the adapter settings, as shown in the commented code below.
  //
  // NOTE: It is not possible to migrate your contracts to truffle DB and you should
  // make a backup of your artifacts to a safe location before enabling this feature.
  //
  // After you backed up your artifacts you can utilize db by running migrate as follows:
  // $ truffle migrate --reset --compile-all
  //
  // db: {
  // enabled: false,
  // host: "127.0.0.1",
  // adapter: {
  //   name: "sqlite",
  //   settings: {
  //     directory: ".db"
  //   }
  // }
  // }
  api_keys: {
    bscscan: process.env.BSCSCAN_API,
  },
};
