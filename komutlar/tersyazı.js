const discord = require('discord.js')
const ayarlar = require("../ayarlar.json");
var prefix = ayarlar.prefix
exports.run = async (client, message, args) => {
const Discord = require("discord.js");
  if (args.length < 1) {
   const embed = new Discord.MessageEmbed()
   .setDescription(`Doğru kullanım ${prefix}ters <yazı>`)
   .setColor("#5865f2")
    return message.reply(embed)
  }

    const embed2 = new Discord.MessageEmbed()
  .setDescription(args.join(' ').split('').reverse().join(''))
  .setColor("#5865f2")
  await message.channel.send(embed2);
  message.react("<:okeee:981900426590957598>"); 

};

exports.conf = {
  aliases: [ 'ters',"tersyaz","tersyazı","ters-yazı" ]
};

exports.help = {
  name: 'tersyaz'
};    