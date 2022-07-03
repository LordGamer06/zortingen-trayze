const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const Database = require("../Helpers/Database");

exports.run = async (client, message, args) => {
  let logger = ayarlar.logyetkili;

  if (
    !message.member.roles.cache.get(logger) &
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.channel.send('Komudu kullanmak için gerekli yetkiye sahip değilsin');

  const db = new Database("./Servers/" + message.guild.id, "Invites");
  var data = db.get(`invites`) || {};

  var list = Object.keys(data)
    .map(_data => {
      return {
        Id: _data,
        Value: (data[_data].total || 0) + (data[_data].bonus || 0)
      };
    })
    .sort((x, y) => y.Value - x.Value);

  var embed = new Discord.MessageEmbed().setColor("#5865f2").addField(
    "En Çok Davet Yapan İlk 10 Kişi",
    `** **${list
      .splice(0, 10)
      .map(
        (item, index) =>
          `\`${index + 1}.\` <@${item.Id}>: \`${item.Value} Davet\``
      )
      .join("\n")}`
  );
  message.channel.send(embed);
  message.react("<:okeee:981900426590957598>");  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["top"],
  permLevel: 0
};
exports.help = {
  name: "top5",
  description: "Sunucuda en çok davet yapmış 10 kişiyi sıralar",
  usage: "top"
};
