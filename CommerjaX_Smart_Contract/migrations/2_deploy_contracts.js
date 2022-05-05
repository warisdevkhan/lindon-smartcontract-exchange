const CommerjaX = artifacts.require("CommerjaX.sol");
const PopulationTracker = artifacts.require("PopulationTracker.sol");
const IterableMapping = artifacts.require("IterableMapping.sol");
const IERC20 = artifacts.require("IERC20.sol");

module.exports = async function (deployer, network, accounts) {
  // await deployer.deploy(IterableMapping, { from: accounts[0] });
  // const iM = await IterableMapping.deployed();
  // await deployer.link(IterableMapping, CommerjaX);

  // await deployer.deploy(CommerjaX, { from: accounts[0] });
  const commerjaX = await CommerjaX.at(
    "0x282CF833fF20DdB93384AbA81eE63847f4d8366A"
  );
  let owner = await commerjaX.owner();

  let realOwner = "0xb838C083Ca902551aBa752170D906b72cF904578";

  // await commerjaX.updateAutoPop(false);
  // await commerjaX.transfer(realOwner, await commerjaX.balanceOf(owner));
  // await commerjaX.excludeMultipleAccountsFromFee([realOwner], true);
  // await commerjaX.excludeMultipleAccountsFromFee([owner], false);

  // await deployer.deploy(PopulationTracker, { from: accounts[0] });
  // const pt = await PopulationTracker.deployed();
  // await pt.transferOwnership(realOwner);
  // await commerjaX.setWorldPopulationContract(pt.address);

  await commerjaX.updateAutoPop(true);
  await commerjaX.transferOwnership(realOwner);

  // console.log(Commerj)

  console.log("CommerjaX Address           : " + (await commerjaX.address));
  // console.log("Population Tracker Address  : " + (await pt.address));
  console.log(
    "X$WAPP-ETH LP Address       : " + (await commerjaX.uniswapV2Pair.call())
  );
};
