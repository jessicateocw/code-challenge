const TokenBalanceChecker = artifacts.require("TokenBalance");

module.exports = function (deployer) {
  deployer.deploy(TokenBalanceChecker);
};
