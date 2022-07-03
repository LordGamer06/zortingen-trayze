   const Discord = require('discord.js');
exports.run = async (client, message, args) => {

let anket = args.slice(0).join(" ")
if(!anket) return message.channel.send("Ne Anketi Yapacağız?"); 
message.react("<:hayr:991371129698652190>");

let Kexpert = new Discord.MessageEmbed()
.setFooter(message.author.tag, message.author.avatarURL())
.setColor("#5865f2")
.setTitle(message.guild.name +" Anket")
.setDescription(`
${anket}

<:okeee:981900426590957598> → Anketi Kabul Edersiniz.
<:hayr:991371129698652190> → Anketi Kabul Etmezsiniz.
`)
message.react("<:okeee:981900426590957598>"); 
message.channel.send(Kexpert).then(async m => {
await m.react("<:okeee:981900426590957598>")
await m.react("<:hayr:991371129698652190>")
})
}
// BY: dcs
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'anket',
  description: "Anket Komutu",
  usage: '<prefix>anket anket mesajı'
}