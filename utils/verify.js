const { run } = require("hardhat")

const verify = async (contractAddress, args) => {
    console.log("veryfing contract...")
    try {
        //run prende 2 parametri 1) sottofunzione (si possono vedere anche dal gitHub) 2) i parametri attuali del contratto
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
module.exports = { verify }
