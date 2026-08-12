const jackpotController = require("./controllers/jackpot/index");
const giveawayController = require("./controllers/giveaway/index")

exports.startup = async (io) => {
    console.log("starting")
    try {
        await Promise.race([
            jackpotController.startup(io),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Jackpot startup timeout")), 3000))
        ])
    } catch (err) {
        console.warn("Jackpot startup error (non-critical):", err.message)
    }
    
    try {
        await Promise.race([
            giveawayController.startup(io),
            new Promise((_, reject) => setTimeout(() => reject(new Error("Giveaway startup timeout")), 3000))
        ])
    } catch (err) {
        console.warn("Giveaway startup error (non-critical):", err.message)
    }
}