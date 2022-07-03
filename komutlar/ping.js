const Discord = require('discord.js');

exports.run = async(client, message) => {
    const embed = new Discord.MessageEmbed()
    .setColor(`#5865f2`)  
.setDescription(`<a:ara:984453612849754252>|Mesaj Ping **${client.ws.ping}**ms!`,true)

message.channel.send(embed);
message.react("<:okeee:981900426590957598>"); 

}

exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['ms',"ping"],
permLevel: 0
};

exports.help = {
name: 'ping',
description: 'Botun pingini gösterir',
usage: 'ping' };
