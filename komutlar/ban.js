const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  .setDescription("<:hayr:991371129698652190> **Başarısız!** Ban yetkiniz yok.")
  .setColor("#5865f2")
    if (!message.member.permissions.has("BAN_MEMBERS"))
    return message
      .channel.send(embed)
      .catch((err) => {});
      const embed2 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Ban Yetkim Yok.")
      .setColor("#5865f2")
   if (!message.guild.me.permissions.has("BAN_MEMBERS"))
    return message
      .channel.send(embed2)
      .catch((err) => {});
      const embed3 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Kullanıcı Belirtiniz.")
      .setColor("#5865f2")
      const embed4 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Sunucu Sahibini Banlayamazsınız.")
      .setColor("#5865f2")

      const embed5 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Kendinizi Banlayamazsınız.")
      .setColor("#5865f2")
      const embed6 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Beni Banlayamazsınız.")
      .setColor("#5865f2")
      const embed7 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Kullanıcının Rolü Senden Yüksek.")
      .setColor("#5865f2")
      const embed8 = new Discord.MessageEmbed()
      .setDescription("<:hayr:991371129698652190> **Başarısız!** Kullanıcının rolü benim rolümden yüksek.")
      .setColor("#5865f2")






  let sebep = args.slice(1).join(" ") || "Belirtilmemiş";

  let member;
  let member1 = message.mentions.members.first();
  let member2 = message.guild.members.cache.get(args[0]);
  if (member1) {
    member = member1.id;
  }
  if (member2) {
    member = member2.id;
  }
  if (!member1 && !member2) {
    member = args[0];
  }

  
  
  
  
  if (!member)
    return message
      .channel.send(embed3)
      .catch((err) => {});

  let kullanıcı = message.guild.members.cache.get(member);

  if (kullanıcı) {

    if (message.guild.owner.id === member)
      return message
        .channel.send(embed4)
        .catch((err) => {});
    if (message.author.id === member)
      return message
        .channel.send(embed5)
        .catch((err) => {});
    if (client.user.id === member)
      return message
        .channel.send(embed6)
        .catch((err) => {});

    if (message.guild.owner.id !== message.author.id) {
      if (kullanıcı.roles.highest.position >= message.member.roles.highest.position)
        return message
          .channel.send(embed7)
          .catch((err) => {});
    }

    if (kullanıcı.roles.highest.position >= message.guild.me.roles.highest.position)
      return message
        .channel.send(embed8)
        .catch((err) => {});
  }

  message.guild.members
    .ban(member, {
      
      reason: `<a:pewpew:975697268265074708> Banlandı: ${message.author.tag} Reason: ` + sebep || "Belirtilmemiş",
    })
    .then(() => {
      message.react("<:okeee:981900426590957598>"); 
      message.channel.send({
        content: `<:okeee:981900426590957598> **Başarılı!** Kullanıcı başarıyla sunucudan banlandı! <a:pewpew:975697268265074708>`
      });
    })
    .catch((e) => {
      message
        .channel.send({
          content: `<:hayr:991371129698652190> **Başarısız!** Kullanıcıyı sunucudan banlarken hata aldım. \n**Hata:** \`\`\`${e.name + ": " + e.message}\`\`\``,
        })
        .catch((err) => {});
    });

};
module.exports.conf = {
  aliases: []
};

module.exports.help = {
  name: "ban"
};