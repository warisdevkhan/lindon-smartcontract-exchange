require("dotenv").config();
const Web3 = require("web3");
const contract = require("truffle-contract");
const CommerjaX = require("./contracts/artifacts/CommerjaX.json");
const PopulationTracker = require("./contracts/artifacts/PopulationTracker.json");

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(
    new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
  );
}

const commerjax = CommerjaX.at(process.env.COMMERJAX);
const populationTracker = PopulationTracker.at(process.env.POPULATION_TRACKER);
