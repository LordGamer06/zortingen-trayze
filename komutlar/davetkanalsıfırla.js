const Discord = require("discord.js");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
  const db = new Database("./Servers/" + message.guild.id, "Settings");
  if (
    !message.member.hasPermission("ADMINISTRATOR") &&
    !message.member.hasPermission("MANAGE_GUILD")
  )
    return message.channel
      .send(
        new Discord.MessageEmbed()
        .setColor('#5865f2')
          .setDescription(
            `Bu Komutu Kullanabilmek İçin **\`Yönetici\`** Veya **\`Sunucuyu Yönet\`** Yetkilerin'den Birine Sahip Olmalısın`
          )
      )
      .then(msg => msg.delete({ timeout: 5000 }));

  let kanal = message.mentions.channels.first();
  if (kanal) {
    var type = ["Channel"];
    db.set(`settings.${type}`);
    message.react("<:okeee:981900426590957598>"); 
    return message.channel
      .send(
        new Discord.MessageEmbed()
        .setColor('#5865f2')
          .setDescription(`Davet Kanalı Başarıyla Sıfırlandı`)
          .setTimestamp()
          .setFooter(`${message.author.tag} Tarafından Kullanıldı!`)
      )
      .then(msg => msg.delete({ timeout: 7500 }));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: "davet-kanal-sıfırla",
  description: "Davetlerin gideceği logs kanalını ayarlarsınız",
  usage: "davet-kanal-sıfırla"
};
