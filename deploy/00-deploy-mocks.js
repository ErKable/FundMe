const { network } = require("hardhat")
const {
    developmentChain,
    decimals,
    INITIAL_ANSWER,
} = require("../helper-hardhat-congif")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainID = network.config.chainId

    if (developmentChain.includes(network.name)) {
        log("local network detected, deploying mocks")
        await deploy("MockV3Aggregator", {
            contact: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [decimals, INITIAL_ANSWER],
        })
        log("mocks deployed")
        log("----------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
