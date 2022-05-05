const Bitcash = artifacts.require("Bitcash.sol");
const IterableMapping = artifacts.require("IterableMapping.sol");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(IterableMapping);
  const iM = await IterableMapping.deployed();
  await deployer.link(IterableMapping, Bitcash);

  await deployer.deploy(Bitcash);
  const bitcash = await Bitcash.deployed();
  let bitcash_owner = await bitcash.owner();
};
