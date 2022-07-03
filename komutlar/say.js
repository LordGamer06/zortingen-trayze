const Discord = require("discord.js");

module.exports.run = async (client, message, args,) => {

  const voiceChannels = message.guild.channels.cache.filter(c => c.type === "voice");
  let count = 0;

  for (const [id, voiceChannel] of voiceChannels)
    count += voiceChannel.members.size;
  const embed = new Discord.MessageEmbed()
    .setColor("#5865f2")
    .setAuthor(`${message.guild.name}`, `${message.author.displayAvatarURL()}`)
    .setDescription(
     `**Ses kanallarında \`${count}\` kişi bulunmaktadır!**
     \n**Sunucuda \`${message.guild.memberCount}\` kişi bulunmaktadır!**
     \n**Sunucudaki Online (İnsan)Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'online').size}\`
     \n**Sunucudaki DND (İnsan)Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'dnd').size}\`
     \n**Sunucudaki Idle (İnsan)Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'idle').size}\`
     \n**Sunucudaki Offline Sayısı:** \`${message.guild.members.cache.filter(x => x.user.presence.status === 'offline').size}\`
     \n**Sunucudaki Bot Sayısı:** \`${message.guild.members.cache.filter(m => m.user.bot).size}\``) 

    .setThumbnail(message.guild.iconURL())
    .setFooter(client.user.username,client.user.avatarURL())
    .setTimestamp();

  message.channel.send(embed);
  message.react("<:okeee:981900426590957598>"); 
};
exports.conf = {
  aliases: ["total", "toplamüye", "toplamkişi", "totalmember"]
};
exports.help = {
  name: "say"
};