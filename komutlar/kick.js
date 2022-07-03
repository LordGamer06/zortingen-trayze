const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')

exports.run = async (bot, message, args) => {
var prefix = ayarlar.prefix;            
  let embed8 = new Discord.MessageEmbed()
  .setColor("#5865f2")
  .setDescription(`<:hayr:991371129698652190> Bu komutu kullanabilmek için **Üyeleri At** iznine sahip olmalısın!`)
  
  if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send(embed8);

    let user = message.mentions.users.first() || message.client.users.cache.get(args[0]) || message.client.users.cache.find(m => m.username === args.slice(0).join(" ")) || message.author;
  let reason = args.slice(1).join(' ');
let embed = new Discord.MessageEmbed()
.setColor("#5865f2")
.setDescription(`<:hayr:991371129698652190> Sunucudan atmam için istediğiniz kullanıcıyı etiketlemelisiniz; \**${prefix}kick @kişi *sebep* \**`)
  if (message.mentions.users.size < 1) return message.channel.send(embed);
  let embed7 = new Discord.MessageEmbed()
  .setColor("#5865f2")
  .setDescription('<:hayr:991371129698652190> Birini atmam için herhangi bir kişiyi etiketlemen gerek.')
  
  if (user.id === message.author.id) return message.channel.send(embed7);
 let embed6 = new Discord.MessageEmbed()
 .setColor("#5865f2")
 .setDescription(`<:hayr:991371129698652190> Bu kullanıcının senin rollerinden/rolünden daha yüksek rolleri/rolü var.`)
  
  if (user.position > message.member.roles.highest.position) return message.channel.send(embed6);
                if (!reason) reason = 'Belirtilmemiş.'
    
  
  if (!user) return message.channel.send(embed2)
    let member = message.guild.member(user)
    let embed2 = new Discord.MessageEmbed()
   .setColor("#5865f2")
    .setDescription(`<:hayr:991371129698652190> Etiketlediğin kullanıcıyı sunucuda bulamadım.`)
    
    if (!member) return message.channel.send(embed2)
  let embed5 = new Discord.MessageEmbed() 
  .setColor("#5865f2")
  .setDescription(`<:hayr:991371129698652190> Bu kişiyi sunucudan atamıyorum çünkü \`benden daha yüksek bir role sahip\` ya da \`bana gerekli yetkileri vermedin\`.`)
if (!message.guild.member(user).bannable) return message.channel.send(embed5);

   
  let embed4 = new Discord.MessageEmbed() 
  .setColor("#5865f2")
  .setDescription('<:hayr:991371129698652190> Sunucudaki yetkilileri atamam!')
  if (!message.guild.member(user).bannable) return message.channel.send(embed4);
    message.guild.member(user).kick(reason);

 let embed3 = new Discord.MessageEmbed() 
 .setColor("#5865f2")
 .setDescription(`<:okeee:981900426590957598> <@${user.id}> Adlı kullanıcı sunucudan atıldı! **Sebep**: \`${reason}\``)
  message.channel.send(embed3);
  message.react("<:okeee:981900426590957598>"); 


};

exports.conf = {
  aliases: ['at'],
  permLevel: 0,
  kategori: "Moderatör",
};

exports.help = {
  name: 'kick',
  description: 'Belirttiğiniz kişiyi sunucudan atar.',
  usage: 'kick <@kullanıcı> <sebep>',

};