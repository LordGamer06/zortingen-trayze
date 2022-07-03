
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
  if (!message.guild) {
  const mesajsilindi = new Discord.MessageEmbed()
  const ozelmesajuyari = new Discord.MessageEmbed()
  .setColor("#5865f2")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setDescription('Üzgünüm, bunu yapamazsınız!')
  return message.author.sendEmbed(ozelmesajuyari); }    
  if (message.channel.type !== "group") {
        var Durum = message.author.presence.status;
        var Durm = (Durum == "online" ? ("#5865f2") : (Durum == "offline" ? ("#5865f2") : (Durum == "idle" ? ("#5865f2") : (Durum == "dnd" ? ("#5865f2") : ("#5865f2")))))
        var durm = (Durum == "online" ? ("Çevrimiçi") : (Durum == "offline" ? ("Çevrimdışı") : (Durum == "idle" ? ("Boşta") : (Durum == "dnd" ? ("Rahatsız Etmeyin") : ("Bilinmiyor/bulunamadı.")))))
      const kullanicibilgimk = new Discord.MessageEmbed()
      const mesajsilindi = new Discord.MessageEmbed()
      .setThumbnail(message.author.avatarURL)
      .setColor("#5865f2")
      .setTimestamp()
      .addField('Kullanıcı adı;', message.author.username + '#' + message.author.discriminator)
      .addField('ID;', message.author.id)
      .addField('Kayıt tarihi;', message.author.createdAt)
      .addField('Durum;', durm)
      .addField('Şu an oynadığı oyun;', message.author.presence.game ? message.author.presence.game.name : 'Şu an oyun oynamamakta!')
      .setFooter('Assistant ', client.user.avatarURL)
      message.channel.send(mesajsilindi);
      message.react("<:okeee:981900426590957598>"); 
      return message.channel.send(kullanicibilgimk)
      
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kullanıcı', 'kullanıcı-bilgi', 'kbilgi', 'kb', 'kullanıcıbilgi'],
  permLevel: 0
};

exports.help = {
  name: 'kullanıcıbilgi',
  description: 'Komutu kullanan kişi hakkında bilgi verir!',
  usage: 'kullanıcıbilgi'
};