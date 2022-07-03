const Discord = require("discord.js");

exports.run = (client, message) => {
  const embed = new Discord.MessageEmbed()
    .setColor("#5865f2")
    .setAuthor("taksim dayı")
 .setImage("https://cdn.webtekno.com/media/cache/content_detail_v2/article/83841/internet-fenomeni-taksim-dayi-hayatinda-ilk-kez-taksim-e-geldi-1579253407.png")
    .setFooter("taqsim");
  message.channel.send(embed);
  message.react("<:okeee:981900426590957598>"); 
};
exports.conf = {
  aliases: ["dayı", "taksim"]
};
exports.help = {
  name: "taksimdayı"
};      