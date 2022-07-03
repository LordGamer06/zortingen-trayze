const Discord = require('discord.js');
const client = new Discord.Client();
const moment = require('moment');
const { version } = require("discord.js");
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');

var ayarlar = require('../ayarlar.json');
const disbut = require('discord-buttons')
   let button = new disbut.MessageButton()
    .setStyle('url')
    .setEmoji('<:davet:976841167360643092>')
    .setLabel('Davet')
 .setURL("https://discord.com/api/oauth2/authorize?client_id=915339116332326972&permissions=8&scope=bot%20applications.commands") 
   


exports.run = (bot, message, args) => {
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");
        const embedStats = new Discord.MessageEmbed()
            .setAuthor(bot.user.username + " | İstatistikler", bot.user.avatarURL)
            .setColor("#5865f2")
            .addField("❯ <:ram:976813927981797436> Bellek Kullanımı", `${(process.memoryUsage().heapUsed / 32768 / 32768).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`)
            .addField("❯ Versiyonlar", stripIndents`
            » Discord.js: v13
            » Node.js: 17.x
            `)
            .addField("❯ <:anakart:976813927499444265> CPU", `\`\`\`yaml\nAMD FX(tm)-6300 Six-Core Processor          \`\`\``)
            .addField("❯ <:cpu:976814354458624010> CPU Kullanımı", `%${percent.toFixed(8)}`)
            .addField("❯ <:win:976813928090837002> İşletim Sistemi", `Windows 11 | x64 Bit`) 
            .addField("❯ <:star:976813927893696532> Yapımcı", `<@889928756154748948>`) 
        message.channel.send(embedStats, button)
        message.react("<:okeee:981900426590957598>"); 
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['botbilgi',"istatistik","bot-bilgi"],
    permLevel: 0
  };
  
  exports.help = {
    name: 'istatistik',
    category: "bot",
    description: 'Botun istatistiklerini gösterir.',
    usage: 'a!botbilgi'
  };
 {

}