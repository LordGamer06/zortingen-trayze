const Discord = require("discord.js");

exports.run = (client, message, args) => {
  
  if (!message.member.hasPermission("CREATE_INSTANT_INVITE")) return;
  message.channel.createInvite({maxAge: 0}).then(invite => {
    let embed = new Discord.MessageEmbed()
    .setColor('#5865f2')
    .setDescription(`<:discord:963413660791865364> **Bu Sunucunun Davet Linki**: ${invite}`);
    message.channel.send(embed);
    message.react("<:okeee:981900426590957598>"); 
  });
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'sunucudavet',
  description: 'Sunucu Davet Linki Verir.',
  usage: 'sunucudavet'
};