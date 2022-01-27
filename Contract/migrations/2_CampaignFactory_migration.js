const Migrations = artifacts.require("CampaignFactory");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
