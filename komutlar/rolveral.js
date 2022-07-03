 const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {
const embed7 = new Discord.MessageEmbed()
.setDescription("Yetersiz Yetki!")
.setColor("#5865f2") 
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.reply(embed7)
const embed3 = new Discord.MessageEmbed() 
.setDescription('Rol al @member @role veya rol ver @member @role Yazmalısın!')
.setColor("#5865f2")
if(!args[0]) return message.reply(embed3)
if(args[0] === "ver"){
let member = message.mentions.members.first()
if(!member){
member = message.guild.members.cache.get(args[1])
}
const role = message.mentions.roles.first() || message.guild.roles.cache.find(m => m.name === args.slice(2).join(" "))
const embed2 = new Discord.MessageEmbed()
.setDescription('Birini Etiketlemen Gerek')
.setColor("#5865f2")
if(!member) return message.reply(embed2)
if(!role) return message.reply()
member.roles.add(role)
const embed = new Discord.MessageEmbed()
.setDescription('Başarı ile Belirtilen Üyeye Belirtilen Rol Verildi!')
.setColor("#5865f2")
message.channel.send(embed);
message.react("<:okeee:981900426590957598>"); 
}
if(args[0] === "al"){
let member = message.mentions.members.first()
if(!member){
member = message.guild.members.cache.get(args[1])
}
const role = message.mentions.roles.first() || message.guild.roles.cache.find(m => m.name === args.slice(2).join(" "))
const embed4 = new Discord.MessageEmbed()
.setDescription('Birini Etiketlemen Gerek')
.setColor("#5865f2")
if(!member) return message.reply(embed4)
const embed5 = new Discord.MessageEmbed()
.setDescription('Bir Rol Etiketlemen veya Ismini Yazman Gerek!')
.setColor("#5865f2")
  if(!role) return message.reply(embed5)
member.roles.remove(role)
const embed6 = new Discord.MessageEmbed()
.setDescription('Başarı İle Belirtilen Üyeden Belirtilen Rol Alındı!')
.setColor("#5865f2")
message.channel.send(embed6);
message.react("<:okeee:981900426590957598>"); 
}
}
module.exports.conf = {
aliases: []
}

module.exports.help = {
name: "rol"
} 