//komutlara atın
const Discord = require("discord.js");
const db = require("quick.db");
let prefix = process.env.prefix;
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
 
  let prefix = ayarlar.prefix;
  if (!message.member.hasPermission("MANAGE_GUILD"))
    return message.channel.send(
      `<:okeee:981900426590957598> Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın.`
    );

  let logk = message.mentions.channels.first();
  let logkanal = await db.fetch(`log_${message.guild.id}`);

  if (args[0] === "sıfırla" || args[0] === "kapat") {
    if (!logkanal)
      return message.channel.send(
        new Discord.MessageEmbed()
        .setColor(`#5865f2`)
          .setDescription(`ModLog Kanalı Zaten Ayarlı Degil.`)
      );
    db.delete(`log_${message.guild.id}`);
    message.channel.send(
      new Discord.MessageEmbed()
      .setColor(`#5865f2`)
        .setDescription(
          `<:okeee:981900426590957598> | Mod-log kanalı başarıyla sıfırlandı.`
        )
    );message.react("<:okeee:981900426590957598>"); 
    return;
  }

  if (!logk)
    return message.channel.send(
      new Discord.MessageEmbed()
      .setColor(`#5865f2`)
        .setDescription(
          ` Yanlış Kullanım \n Doğru Kullanım: ${prefix}mod-log #kanal`
        )
    );

  db.set(`log_${message.guild.id}`, logk.id);

  message.channel.send(
    new Discord.MessageEmbed()
    .setColor(`#5865f2`)
      .setDescription(`<:okeee:981900426590957598> Mod-log kanalı başarıyla ${logk} olarak ayarlandı.`)
  );
  message.react("<:okeee:981900426590957598>");
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["mod-log", "modlog", "log-ayarlama"],
  permLevel: 3,
  kategori: "moderasyon"
};

exports.help = {
  name: "mod-log",
  description: "Mod-Log kanalını belirler.",
  usage: "mod-log <#kanal>"
};