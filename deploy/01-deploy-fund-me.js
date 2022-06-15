//questo file sara il primo che cerchera hardhat quando viene chiamato il comando deploy
//vanno numerati i file perche cosi capisce in che ordine chiamarli

const { networks } = require("../hardhat.config")
const { network } = require("hardhat")
const { verify } = require("../utils/verify")
// function deployFunc() {
//     console.log("Hi")
// }
const { networkConfig, developmentChain } = require("../helper-hardhat-congif")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    //const ethUsdPriceFeedAddress = networkConfig[chainID]["ethUsdPriceFeed"]

    let ethUsdPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    //when going for localhost or hardhat network we want to use a mock
    //mock = minimal copy of a contract for local testing
    const args = [ethUsdPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args, //put priceFeedAddress
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    if (
        !developmentChain.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, args)
    }

    log("-----------------------------")
}

module.exports.tags = ["all", "fundme"]
