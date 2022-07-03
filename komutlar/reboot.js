const Discord = require('discord.js');
const bot = new Discord.Client();
const ayarlar = require("../ayarlar.json")

module.exports.run = async (bot, message, args) => { 
   
  var embed2 = new Discord.MessageEmbed()   
      .setTitle('Merhaba, ' + message.member.user.username)
      .setDescription('sadece sahibim bu komutu  kullanabilir! Yani `Lunech#9298 ')
      .setColor(`#5865f2`)
  

  if(message.author.id !== "889928756154748948") return message.channel.sendEmbed(embed2)
     
  //Cortex botun reboot sistemi hadi h.o
  var embed = new Discord.MessageEmbed()   
      .setTitle('**Merhaba Sahibim Lunech,**')
      .setDescription('Beni yeniden başlatmak  istediğine eminsen aşağıdaki **TİK** işaretine, bir kere dokunur musun?')
      .setColor(`#5865f2`)
message.channel.send(embed).then(async function (sentEmbed) {
			const emojiArray = ["✅"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 30000
			});
reactions.on("end", () => message.delete().then(mr => sentEmbed.delete()).then(m => message.delete()).then(m2 => message.author.send("Yeniden Başlatma İşlemi iptal ettim! "))) 
    reactions.on("collect", async function (reaction) {
				if (reaction.emoji.name === "✅") {
  try {
    message.delete().then(mr => sentEmbed.delete()).then(wb => { 
 console.log(`BOT: Bot yeniden başlatılıyor...`);
    process.exit(0);
    })
  } catch (err) {
  // Pudochu
    message.channel.send(`**Hata:** \n\`\`\`js\n${err}\n\`\`\``);
  
};

        }
    })
})

};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['reboot', 'Reboot', 'yenidenbaşlat', 'yenile', 'rebot', 'rebooot', 'reboott', 'treboot'],
  permLevel: 0
};

module.exports.help = {
  name: 'reboot',
  description: 'Sistemi yeniden başlatır',
  usage: 'reboot'
};