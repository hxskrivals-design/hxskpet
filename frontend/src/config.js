const isDev = import.meta.env.DEV;

export const api = isDev 
  ? "http://localhost:3000"
  : "https://api.hxskpet.com";

export const frontendUrl = isDev
  ? "http://localhost:5173"
  : "https://hxskpet.com";

export const uri =
  `https://discord.com/oauth2/authorize?client_id=YOUR_CLIENT_ID_HERE&response_type=code&redirect_uri=${encodeURIComponent(frontendUrl)}/discord/linked&scope=identify`;

export const alert = {
  show: true,
  title: "🎉 JACKPOT, THE NEW GAME MODE IS NOW RELEASED! 🎉",
  message:
    "our new gamemode, jackpot has just released! enjoy the big winnings, play it ",
  link: "/jackpot",
};
