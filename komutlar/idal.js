const Discord = require('discord.js');
exports.run = async (client, message, args) => {
  
let kişi = message.mentions.members.first() || message.author
const embed = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription(`<:okeee:981900426590957598> **${kişi}** adlı kişinin ID numarası: **${kişi.id}**`)
message.channel.send(embed);
message.react("<:okeee:981900426590957598>"); 
}

exports.conf = {
  aliases: ["Id", "ıd", "ID"]
}

exports.help = {
  name: "id"
}