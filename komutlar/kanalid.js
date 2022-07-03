const Discord = require("discord.js")

exports.run = async (client, message, args) => {
    if (!message.guild) {
    const ozelmesajuyari = new Discord.MessageEmbed()
    .setColor("#5865f2")
    .setTimestamp()
    .setAuthor(message.author.username, message.author.avatarURL)
    .addField('<:hayr:991371129698652190>  **Komutları Özel Mesajlarda Kullanılamaz!**')
    return message.author.send(ozelmesajuyari); }
  let kanal = message.mentions.channels.first()
if (!kanal) return message.channel.send("<:hayr:991371129698652190>  **Yanlış Argüman**\nDoğru kullanım : **a!kanal-id #kanal**")
const embed = new Discord.MessageEmbed()
.setColor("#5865f2") 
.setDescription(`<:okeee:981900426590957598> Kanal İD: **${kanal.id}** `)
  message.channel.send(embed);
  message.react("<:okeee:981900426590957598>"); 

}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kanalid',
  description: '',
  usage: 'kanalid <kanal>'
}; 