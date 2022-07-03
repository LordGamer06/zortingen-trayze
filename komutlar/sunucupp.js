const Discord = require("discord.js");

exports.run = (client, message, params) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
      .setColor("#5865f2")
      .setTimestamp()
      .setFooter("Assistant", client.user.avatarURL())
      .setAuthor(message.author.username, message.author.avatarURL())
      .addField(":warning: Uyarı :warning:","`sunucuresmi` adlı komutu özel mesajlarda kullanamazsın.");
    return message.author.send(ozelmesajuyari);
  }
  if (message.channel.type !== "dm") {
    const sunucubilgi = new Discord.MessageEmbed()
      .setAuthor(message.guild.name)
      .setColor("#5865f2")
      .setImage(message.guild.iconURL({ dynamic: true, format: 'png', size: 1024 }))
      .setTimestamp()
      .setFooter("Assistant", client.user.avatarURL());
    message.channel.send(sunucubilgi);
    message.react("<:okeee:981900426590957598>"); 
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sunucupp", "sunucuresmi"],
  permLevel: 0
};

exports.help = {
  name: "sunucuresmi",
  description: "Sunucu Resminin Linkini Atar.",
  usage: "sunucuresmi"
}; 