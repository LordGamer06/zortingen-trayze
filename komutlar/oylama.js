const Discord = require("discord.js");
exports.run = (client, message, args) => {
  message.delete();
  let question = args.join(" ");
  let user = message.author.username;
  if (!question)
    return message.channel
      .send(
        new Discord.MessageEmbed()
.addField(`**Yazı Yazman Gerek**`,`Assistant`)
.setColor("#5865f2")
    );
    message.react("<:okeee:981900426590957598>"); 
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#5865f2")
        .setTimestamp()
        .setFooter("Oylama Sistemi")
        .addField(`**Oylama**`, `**${question}**`)
    )
    .then(function(message) {
      message.react("<:okeee:981900426590957598>");
      message.react("<:hayr:991371129698652190>");
    });
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oylama"],
  permLevel: 2
};
exports.help = {
  name: "oylama",
  description: "Oylama yapmanızı sağlar.",
  usage: "oylama <oylamaismi>"
};