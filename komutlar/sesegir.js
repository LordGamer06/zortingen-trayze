const Discord = require("discord.js");
 const embed = new Discord.MessageEmbed()
 .setDescription("<:hayr:991371129698652190>  Bu Komutu sadece Adminler kullanabilir.")
 .setColor("#5865f2")
exports.run = async (client, message, args) => {
  if(message.author.id !== "889928756154748948") return message.channel.send(embed);
  message.react("<:okeee:981900426590957598>"); 
  client.channels.cache.get(args[0]).join()
}
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'sesegir',
  description: 'Botu belirttiğiniz ses kanalına sokarsınız',
  usage: 'sesegir'
}; 