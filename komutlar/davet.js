const Discord = require("discord.js");
const Database = require("../Helpers/Database");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  let victim;
  if (message.mentions.users.first()) {
    victim = message.mentions.users.first();
  } else {
    victim = message.author;
  }

  if (!victim)
    return message.channel
      .send(
        new Discord.MessageEmbed()
        .setColor("#5865f2")
          .setDescription(
            `Davetini Görmek İstediğiniz Kişiyi Etiketlemelisiniz!`
          )
          .setTimestamp()
          .setFooter(`${message.author.tag} Tarafından Kullanıldı!`)
      )
      .then(msg => msg.delete({ timeout: 3500 }));
  victim = message.guild.member(victim);
  if (!victim)
    return message.channel
      .send(
        new Discord.MessageEmbed()
        .setColor("#5865f2")
          .setDescription(`Aradığınız Kullanıcı Sunucuda Bulunmamaktadır!`)
          .setTimestamp()
          .setFooter(`${message.author.tag} Tarafından Kullanıldı!`)
      )
      .then(msg => msg.delete({ timeout: 3500 }));

  const db = new Database("./Servers/" + message.guild.id, "Invites");
  var data = db.get(`invites.${victim.id}`) || {
    total: 0,
    fake: 0,
    inviter: null,
    regular: 0,
    bonus: 0,
    leave: 0
  };
  var embed = new Discord.MessageEmbed()
    .setFooter("Assistant Gelişmiş Bot!")
    .setDescription(
      `****${victim} Kişisinin Davet İstatikleri****\n\n**Toplam:** \`${(data.total ||
        0) + (data.bonus || 0)}\` (**Düzenli** \`${data.regular ||
        0}\` **Bonus:** \`${data.bonus || 0}\` **Çıkanlar:** \`${data.leave ||
        0}\` **Sahte Olanlar:** \`${data.fake || 0}\`)`
    )
    .setColor("#5865f2");
  message.channel.send(embed);
  message.react("<:okeee:981900426590957598>"); 
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["invites","davetlerim"],
  permLevel: 0
};
exports.help = {
  name: "invites",
  description: "Etiketlediğiniz kişinin davet bilgilerini görürsünüz",
  usage: "invites <Kullanıcı>"
};
