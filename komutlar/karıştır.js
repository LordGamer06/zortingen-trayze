const Discord = require("discord.js");
const funnyWords = require("funny-words");

exports.run = (bot, message) => {
  let args = message.content
    .split(" ")
    .slice(1)
    .join(" ");

  if (!args) return message.reply("Karışım için yazı girmelisin.");
  message.channel.send(funnyWords(args));
  message.react("<:okeee:981900426590957598>"); 
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

module.exports.help = {
  name: "karıştır",
  description: "yazdığınız yazıları karıştırır",
  usage: "karıştır"
};