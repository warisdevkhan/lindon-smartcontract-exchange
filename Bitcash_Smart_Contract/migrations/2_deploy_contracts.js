const Bitcash = artifacts.require("Bitcash.sol");
const WBCHTracker = artifacts.require("WBCHTracker.sol");
const LAWTracker = artifacts.require("LAWTracker.sol");
const MISTTracker = artifacts.require("MISTTracker.sol");
const IterableMapping = artifacts.require("IterableMapping.sol");
const IERC20 = artifacts.require("IERC20.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(IterableMapping, { from: accounts[0] });
  const iM = await IterableMapping.deployed();
  await deployer.link(IterableMapping, Bitcash);

  await deployer.deploy(Bitcash, { from: accounts[0] });
  const bitcash = await Bitcash.deployed();

  let owner = await bitcash.owner();

  let realOwner = "0xb838C083Ca902551aBa752170D906b72cF904578";

  // await bitcash.transfer(realOwner, await bitcash.balanceOf(owner));
  // await bitcash.excludeMultipleAccountsFromFee([realOwner], true);
  // await bitcash.excludeMultipleAccountsFromFee([owner], false);
  // await bitcash.transferOwnership(realOwner);

  console.log(
    "LAWTracker Address        : " +
      (await bitcash.dividendTrackerLAW.call()).address
  );
  console.log(
    "MISTTracker Address        : " +
      (await bitcash.dividendTrackerMIST.call()).address
  );
  console.log(
    "WBCHTracker Address        : " +
      (await bitcash.dividendTrackerWBCH.call()).address
  );
  console.log("Bitcash Address        : " + (await bitcash.address));
  console.log("IterableMapping Address        : " + (await iM.address));
  console.log(
    "XCA$H-WBCH LP Address  : " + (await bitcash.uniswapV2Pair.call())
  );
};
