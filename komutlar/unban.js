const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
 const embed = new Discord.MessageEmbed()
  .setDescription("<:hayr:991371129698652190> Yetkin Yetersiz!")
  .setColor("#5865f2")
   if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(embed); message.react("<:hayr:991371129698652190>");
 const embed2 = new Discord.MessageEmbed()
  .setDescription("<:hayr:991371129698652190>  Ban Kaldıracak ID Giriniz. `a!unban İD <sebep>`")
  .setColor("#5865f2")
  
  let bannedMember = args[0];
  if (!bannedMember)
    return message.channel.send(embed2); message.react("<:hayr:991371129698652190>");

  let bannedReason = args.slice(1).join(" ");
   const embed3 = new Discord.MessageEmbed()
  .setDescription("<:hayr:991371129698652190>  Bir Sebep Yazınız. `a!unban İD <sebep>`")
  .setColor("#5865f2")
  if (!bannedReason)
    return message.channel.send(embed3); message.react("<:hayr:991371129698652190>");
   const embed4 = new Discord.MessageEmbed()
  .setDescription("<:hayr:991371129698652190>  Ban Kaldırma Yetkim Yok.")
  .setColor("#5865f2")
  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.channel.send(embed4); message.react("<:hayr:991371129698652190>");
try {
  const embed5 = new Discord.MessageEmbed()
  .setDescription(`<:okeee:981900426590957598>   ${bannedMember} ID'ye Sahip Kişinin **Banı Kalktı.**`)
  .setColor("#5865f2") 
  message.guild.members.unban(bannedMember, bannedReason);
    message.channel.send(embed5);
    message.react("<:okeee:981900426590957598>"); 
  } catch (e) {
    console.log(e.message);
  }


 

};
module.exports.conf = {
  aliases: []
};
module.exports.help = {
  name: "unban"
}