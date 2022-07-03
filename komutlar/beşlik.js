const Discord = require("discord.js");

exports.run = function(client, message, args) {

const kisi = message.mentions.users.first();

if (!kisi) return message.reply("<:hayr:991371129698652190> Beşlik Çakacağınız Kişiyi Etiketlemelisiniz.");

const Embed = new Discord.MessageEmbed()
    .setColor(`#5865f2`)
    .setDescription(
      `${kisi} ` + `ve **${message.author.username}** Beşlik Çaktı.`
    )
    .setImage(
      "https://cdn.discordapp.com/attachments/747769679984066582/748956281930383520/tenor_3.gif"
    )
    .setFooter(client.user.username + " Sundu", client.user.avatarURL)
    message.react("<:okeee:981900426590957598>"); 
 return message.channel.send(Embed);
 
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["beşlikçak"],
  permLevel: 0
};
exports.help = {
  name: "beşlik",
  description: "Etiketlediğiniz Kişiyle Beşlik Çakarsınız",
  usage: ""
};