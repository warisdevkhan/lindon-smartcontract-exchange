// const PopulationTracker = artifacts.require("PopulationTracker.sol");
// const IERC20 = artifacts.require("IERC20.sol");
// const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// const axios = require("axios");

// const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// contract("PopulationTracker Unit Test", (accounts) => {
//   let populationTracker;
//   let owner;
//   let LINKContract;
//   let apiData;

//   beforeEach(async () => {
//     populationTracker = await PopulationTracker.new();

//     LINKContract = new IERC20("0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06");
//     // const populationTracker = new web3.eth.Contract(
//     //   "../build/contracts/PopulationTracker.json",
//     //   0xAA8138B200A7Cb01FBa3710D7bbF931F9f40AF36
//     // );
//     owner = await populationTracker.owner();
//   });

//   it("Test Oracle Data", async () => {
//     const options = {
//       method: "GET",
//       url: "https://world-population.p.rapidapi.com/worldpopulation",
//       headers: {
//         "X-RapidAPI-Host": "world-population.p.rapidapi.com",
//         "X-RapidAPI-Key": "0e06c21f4emsh228606118bcba45p110bd0jsne4fd1209cf23",
//       },
//     };

//     LINKContract.transfer(
//       populationTracker.address,
//       web3.utils.toWei("0.111", "ether"),
//       { from: accounts[0] }
//     );

//     // await populationTracker.multipleData();
//     apiData = await axios.request(options);
//     let worldPopulationCount = apiData.data.body.world_population;

//     await sleep(100000);

//     let populationDataFromContract =
//       await populationTracker.currentPopulation.call();

//     console.log("Contract: " + populationDataFromContract);
//     console.log("API: " + worldPopulationCount);

//     assert(populationDataFromContract == worldPopulationCount);
//   });
// });
