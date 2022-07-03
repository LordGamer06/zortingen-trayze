const Discord = require("discord.js"); //Dcs Ekibi
let embed1 = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription("<:red:963439043327193188>  Yetersiz Yetki!"); 
let embed2 = new Discord.MessageEmbed()
.setColor('#5865f2')
.setDescription("<:red:963439043327193188>  Doğru ID Girmelisiniz!"); 



exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.reply(embed1);
  let dcs_user = args[0];
  if (isNaN(dcs_user)) return message.reply(embed2);
  await message.guild.members.ban(dcs_user);
  const embed = new Discord.MessageEmbed()
  .setColor('#5865f2')
  .setDescription(`<:okeee:981900426590957598> \`${dcs_user}\` Sunucudan Banlandı!`) 
  message.react("<:okeee:981900426590957598>"); 
  return message.reply(embed);
  
}; //Dcs Ekibi
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["idban"]
};

exports.help = {
  name: "forceban",
  description: "ID ile Sunucudan Birisini Banlar!",
  usage: "forceban <kullanıcı-id>"
};