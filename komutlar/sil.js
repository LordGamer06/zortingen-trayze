const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
let embed = new Discord.MessageEmbed()
exports.run = function(client, message, args) {
 var embed = new Discord.MessageEmbed()
 .setDescription(`Bu komutu kullanabilmek için **Mesajları Yönet** iznine sahip olmalısın!`)
 .setColor("#5865f2")
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(embed);
  
if(isNaN(args[0])) {
  var errembed = new Discord.MessageEmbed()
    .setColor("#5865f2")
    .addField(`<:hayr:991371129698652190> Yanlış Kullanım!`, `Bir rakam yazmalısın!`)
    .addField(`<:hayr:991371129698652190> Doğru Kullanım:`, `${ayarlar.prefix}sil <temizlenecek mesaj sayısı>`)
return message.channel.send(errembed);
}
let embed4 = new Discord.MessageEmbed()   
.setDescription("<:hayr:991371129698652190> **1** adetten az mesaj silemem!")  
.setColor("#5865f2")  
if (args[0] < 1) return message.reply(embed4)
let embed3 = new Discord.MessageEmbed() 
.setDescription("<:hayr:991371129698652190> **100** adetten fazla mesaj silemem!")  
.setColor("#5865f2")  
if (args[0] > 100) return message.reply(embed3)
 let embed2 = new Discord.MessageEmbed() 
.setDescription("<:hayr:991371129698652190> Hiç mesaj silemedim! _(**14** günden önceki mesajları silemem!)_")
.setColor("#5865f2")  
    message.channel.bulkDelete(args[0]).then(deletedMessages => {
if (deletedMessages.size < 1) return message.reply(embed2);
})
 let embed5 = new Discord.MessageEmbed() 
.setDescription(`<a:ok:920273590107127878> **${args[0]}** adet mesaj başarıyla silindi!`)
.setColor("#5865f2") 
  message.channel.send(embed5)
};

exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: ["sil", "mesaj-sil", "mesajları-sil","clear","temizle"],
  permLevel: `Mesajları yönet yetkisine sahip olmak gerekir.`
};

exports.help = {
  name: 'sil',
  category: 'moderasyon',
  description: 'Belirtilen miktarda mesaj siler.',
  usage: 'sil <miktar>'
};