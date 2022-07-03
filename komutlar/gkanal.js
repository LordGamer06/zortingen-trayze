const Discord = require('discord.js')
const db = require("croxydb")
let embed1 = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription(`<:hayr:991371129698652190> Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);  
exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(embed1);
let embed = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription(`<:okeee:981900426590957598> **Resimli Hoşgeldin - Güle Güle kanalı Ayarlandı.** `);
let embed2 = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription('<:hayr:991371129698652190> Kullanım: `a!resimlihgbb ayarla #kanal`');  
let embed3 = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription('<:okeee:981900426590957598> Sıfırlama Başarılı.');  
let embed4 = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription("<:hayr:991371129698652190> `a!resimlihgbb ayarla #kanal` veya `a!resimlihgbb sıfırla` Yazmalısın!");  




if(args[0] === "ayarla"){
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send(embed2)
    }
    
await db.set('rgiris_'+message.guild.id, channel.id) 
message.channel.send(embed)
message.react("<:okeee:981900426590957598>");  
} else {
  
if(args[0] === "sıfırla"){
message.channel.send(embed3)
await db.delete('rgiris_'+message.guild.id)
  
} else {
   return message.reply(embed4)
}}}    

exports.conf = {
    aliases: []
}


exports.help = {
    name: 'resimlihgbb'
}
    