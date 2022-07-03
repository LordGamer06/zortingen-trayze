const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => { 

let aboneyetkili = '915288700659826708'   //yetkili rolü id bilal ab

  if(!message.member.roles.cache.has(aboneyetkili)) 
  return message.channel.send('**Bu Komudu Sadece Yetkililer Kullanabilir.**')
  let uye = message.mentions.members.first()
  let etiket = args[1]
  if (!uye) return message.channel.send('**Lütfen bir kişi etiketleyiniz.**')
  
      setTimeout(function(){
  uye.roles.add(abonerolü)
  },500)
  
  let abonerolü = '892716452384211005'  // abone rolü id bilal ab
  
  let ceixsa = new Discord.MessageEmbed() 
  .setDescription(`**<:okeee:981900426590957598> <@!892716452384211005> Rolü Başarıyla Etiketlediğin Kişiye Verildi.**`) 
message.channel.send(ceixsa)

};

exports.conf = {               
  enabled: true,
  guildOnly: true,
    aliases: ['a','Abone'],
  permLevel: 0
}
exports.help = {
  name: 'abone',
  description: "abone rolü verir",
  usage: 'a!a' 
}
