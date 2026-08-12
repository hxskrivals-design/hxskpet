const jwt_secret = "your-secret-key-123";
const coinflipwebh = ""; // Add your webhook URL here
const taxedItemsWebh = ""; // Add your webhook URL here
const botlogs = ""; // Add your webhook URL here
const giveawaywebh = ""; // Add your webhook URL here
const tippedlogs = ""; // Add your webhook URL here
const discordlogs = ""; // Add your webhook URL here
const jackpotwebh = ""; // Add your webhook URL here
const taxer = null; // userid
const bottoken = "YOUR_BOT_TOKEN_HERE";
const clientid = "YOUR_CLIENT_ID_HERE";
const clientsecret = "YOUR_CLIENT_SECRET_HERE";
const uri = "http://localhost:5173/discord/linked";
const taxes = 0.12;  
const xp = 0.00500;
const crypto = {
  bitcoin:  {
    walletid: "btc-",
    transferkey: "girl_JUSTNO"
  }
}



module.exports = {
  jwt_secret,
  coinflipwebh,
  taxedItemsWebh,
  botlogs,
  giveawaywebh,
  taxer,
  bottoken,
  clientid,
  clientsecret,
  uri,
  taxes,
  crypto,
  tippedlogs,
  discordlogs,
  jackpotwebh,
  xp
};