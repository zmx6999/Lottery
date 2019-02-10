var Lottery = artifacts.require("./Lottery.sol")

module.exports = function(deployer) {
  deployer.deploy(Lottery,'1000000000000000000')
};
