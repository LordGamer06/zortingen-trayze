const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {

function rasteleSembol(uzunluk, semboller) {
var maske = '';
if (semboller.indexOf('a') > -1) maske += 'abcdefghijklmnopqrstuvwxyz';
if (semboller.indexOf('A') > -1) maske += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
if (semboller.indexOf('0') > -1) maske += '0123456789';
if (semboller.indexOf('#') > -1) maske += '~`!@#$%^&*()_+-={}[]:";\'<>?,./|\\';
var sonuc = '';
for (var i = uzunluk; i > 0; --i) 
{
sonuc += maske[Math.floor(Math.random() * maske.length)];
}
return sonuc;
}


const cse = new Discord.MessageEmbed()
.setTitle("Random Memes")
.setColor("#5865f2")
.setImage("https://ctk-api.herokuapp.com/meme/"+rasteleSembol(3, '0'))
.setFooter("Assistant")
message.channel.send(cse);
message.react("<:okeee:981900426590957598>"); 
}
module.exports.conf = {
aliases: []
}

module.exports.help = {
name: "meme"
}