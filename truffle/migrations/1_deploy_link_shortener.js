const Shortener = artifacts.require("Shortener");

module.exports = function (deployer, network) {
    console.log(network);
    deployer.deploy(Shortener);
};
