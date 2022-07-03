const Discord = require("discord.js");
const db = require("quick.db")
const bot = new Discord.Client();
const a = require("../ayarlar.json");

exports.run = async (client, message, args) => {
var kullanıcı = message.author;
  var sebep = args.slice(0).join("  ");
if(!sebep) return message.channel.send(new Discord.MessageEmbed()
.setTitle(`Uyarı`)
.setColor("#5865f2")
.setDescription(`<:hayr:991371129698652190> **AFK Moduna Geçmek İçin Bir Sebep Belirtmelisin!** `))
  let dcs15 = new Discord.MessageEmbed()
    .setTitle(`Uyarı! `)
    .setTimestamp()
    .setFooter(client.user.username)
    .setThumbnail(message.author.avatarURL)
   .setDescription(`**AFK Moduna Girmek İçin Onay Veriyor Musun ?**`)
    .setColor("#5865f2");

  message.channel.send(dcs15).then(sunucu => {
    sunucu.react("<:okeee:981900426590957598>").then(() => sunucu.react("<:hayr:991371129698652190>"));

    let yesFilter = (reaction, user) =>
      reaction.emoji.name === "onay" && user.id === message.author.id;
    let noFilter = (reaction, user) =>
      reaction.emoji.name === "red" && user.id === message.author.id;

    let yes = sunucu.createReactionCollector(yesFilter, { time: 0 });
    let no = sunucu.createReactionCollector(noFilter, { time: 0 });

    yes.on("collect", r => {
      message.member.setNickname(`[AFK] ${message.member.displayName}`)
      db.set(`afktag_${message.author.id}`, message.member.displayName)
      let dcs16 = new Discord.MessageEmbed()
        .setTitle(`**<:onay:963439043188752394> İşlem Başarılı!**`)
        .setDescription(`**AFK Moduna Girdiniz!**`)
        .setColor("#5865f2")
        .setThumbnail(client.user.avatarURL)
        .setTimestamp()
        .setThumbnail(message.guild.iconURL)
        .setFooter(message.guild.name);
      message.channel.send(dcs16).then(x => {
      message.react("<:okeee:981900426590957598>"); 
      });
      
    });
    db.set(`afk_${kullanıcı.id}`, sebep);
    db.set(`afk_süre_${kullanıcı.id}`, Date.now());
    no.on("collect", r => {
    db.delete(`afk_${kullanıcı.id}`, sebep);
    db.delete(`afk_süre_${kullanıcı.id}`, Date.now());
      message.channel.send(`**İptal Edildi!**`); message.react("<:hayr:991371129698652190>");
    });
  });
    };
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
    name: "afk",
  };