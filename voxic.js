const Discord = require('discord.js');
const Database = require("./Helpers/Database");
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const ms = require("ms");
const { Collection,Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const { MessageButton, MessageActionRow } = require('discord-buttons');
require('discord-buttons')(client);
const roldb = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const queue = new Map();

client.ayarlar = {  "prefix": "a!"}

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};



client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});


//--------------------------------------------------- KOMUTLAR ------------------------------------------------------------\\

/////////////////////////////////
client.on("message", message => {
  
  let channel1 = "923970440089714708";
  let aboneRolü = "892716465076183071";
  let yetkiliRol = "915288700659826708";
  let log = "923970440089714708"

  
  if (message.channel.id === channel1) {
    
    var Staffarray = [];
    message.guild.members.cache.forEach(hm => {
      if (hm.roles.cache.has(yetkiliRol)) {
        Staffarray.push(hm.id);
      } else {
        return;
      }
    });

    if (message.author.bot) return;
    if (message.attachments.size < 1) return;


    message.react("<:okeee:981900426590957598>"); 
    message.react("<:hayr:991371129698652190>");

    const onayFilter = (reaction, user) =>
      reaction.emoji.name === "onayla" && Staffarray.includes(user.id);
    
    const retFilter = (reaction, user) =>
      reaction.emoji.name === "reddet" && Staffarray.includes(user.id);
    
    const onayCollector = message.createReactionCollector(onayFilter);
    const retCollector = message.createReactionCollector(retFilter);

    onayCollector.on("collect", (reaction, user) => {
      
     message.reactions.removeAll()
      
      message.member.roles.add(aboneRolü);
         client.channels.cache.get(log).send(`> <:onay:963439043188752394> **${message.author} Adlı Kişiye ${user} Adlı Kişi Tarafından Başarıyla Altyapı Rolü Verildi.** \n> **Efsane Altyapılarımıza Ve Kodlarımıza https://ankacode.xyz Adresinden Ulaşabilirsiniz.**`);
      
    });

    retCollector.on("collect", r => {
      
      message.reactions.removeAll()
      
      client.channels.cache.get(log).send(`> <:red:963439043327193188> **${message.author} Adlı Kişiye Altyapı Rolü Verilemedi. Şartlar Eksik Lütfen <#853166692989141012> Kanalını Tekrar Okuyunuz.**`);
      
    });
  }
});



//--------------------------------------------------- KOMUTLAR ------------------------------------------------------------\\

//--------------------------------------------------------------------------------------------\\



//------------------------------------- AFK Main -------------------------------------//

client.on("message", async message => {
    const parsems = require("parse-ms");
  const db = require("quick.db");

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    let süre = await db.fetch(`afk_süre_${message.author.id}`);
    let zaman = parsems(Date.now() - süre);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.member.setNickname(db.fetch(`afktag_${message.author.id}`));
    const afk_cikis = new Discord.MessageEmbed()
      .setColor("#5865f2")
      .setDescription(
        `<@${message.author.id}>\`${zaman.hours}\` **Saat**  \`${zaman.minutes}\` **Dakika** \`${zaman.seconds}\` **Saniye** , **AFK Modundaydın!**`
      );
    message.channel.send(afk_cikis);
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.fetch(`afk_${kullanıcı.id}`);

  if (sebep) {
    let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
    let zaman = parsems(Date.now() - süre);
    const afk_uyarı = new Discord.MessageEmbed()
      .setColor("#5865f2")
      .setDescription(
        `<@${kullanıcı.id}> Adlı Kullanıcı \`${sebep}\` Sebebiyle; \`${zaman.hours}\` **Saat**  \`${zaman.minutes}\` **Dakika** \`${zaman.seconds}\` **Saniyedir AFK!**`
      );
    message.reply(afk_uyarı);
  }
});

    //------------------------------------- AFK Main -------------------------------------//





client.on("message", (message) => {

  // İhtimaller
  
  if (message.content !== "a!buton" || message.author.id === client.ayarlar.sahip || message.author.bot) return;
  
  
  // BUTONLAR
  //--------------------------------\\
  
  // V/K
  let Vk = new MessageButton()
    .setStyle('gray') // Rengi ayarlayabilirsiniz.
    .setLabel('💫・Çekiliş') // Adını Değiştirebilirsiniz.
    .setID('V/K');// Elleme Bunu
  
  // D/C
  let Dc = new MessageButton()
    .setStyle('gray') // Rengi ayarlayabilirsiniz.
    .setLabel('➖・ Etkinlik') // Adını Değiştirebilirsiniz.
    .setID('D/C'); // Elleme Bunu
  
  // GARTIC.IO
  let Gartic = new MessageButton()
    .setStyle("gray") // Rengi ayarlayabilirsiniz.
    .setLabel('🌐・Tasarımcı') // Adını Değiştirebilirsiniz.
    .setID('Gartic'); // Elleme Bunu
    // V/K
  let botl = new MessageButton()
    .setStyle('gray') // Rengi ayarlayabilirsiniz.
    .setLabel('🤖・Botlist') // Adını Değiştirebilirsiniz.
    .setID('botl'); // Elleme Bunu
  
  //--------------------------------\\
      const embeddd = new Discord.MessageEmbed() 
      .setDescription(`
<:koruma:963413660930306078>   **Selam, Sunucumuzdaki "BotList & Çekiliş vb." Rolleri Almak İçin Butonlara Tıklamanız Yeterlidir.** 
   
  **__ROLLER__;**
   
> \`>\` @Çekiliş Katılımcısı **Sahip Olmak İçin Butona Tıkla**
> \`>\` @Etkinlik Katılımcısı **Sahip Olmak İçin Butona Tıkla**
> \`>\` @Tasarımcı **Sahip Olmak İçin Butona Tıkla**
> \`>\` @Botlist **Botlist Kanallarını Görmek İçin Butona Tıkla** 
  `)
      
  message.channel.send(embeddd, { 
    buttons: [ Vk, Dc, Gartic, botl]
  });
  });
  
  client.on('clickButton', async function (button) {
    // V/K
      if (button.id === 'V/K') {
          if (button.clicker.member.roles.cache.get("930185436821848064")) {
              await button.clicker.member.roles.remove("930185436821848064")
              await button.reply.send("**Çekiliş Katılımcısı Rolü Üzerinizden Alındı.**", true)
          } else {
              await button.clicker.member.roles.add("930185436821848064")
              await button.reply.send("**Çekiliş Katılımcısı Rolü Üzerinize Verildi.**", true)//VAMPİR KÖYLÜ ROLUNU ÜÇYEREDE GİRİYORSUNUZ BEN DAHA ÖNCE GİRDİĞİM İÇİN YAPMICAM
          }
      }
  
    // D/C
      if (button.id === 'D/C') {
          if (button.clicker.member.roles.cache.get("930185670339756082")) {
              await button.clicker.member.roles.remove("930185670339756082")
              await button.reply.send(`**Etkinlik Katılımcısı Rolü Üzerinizden Alındı.**`, true)
          } else {
              await button.clicker.member.roles.add("930185670339756082")
              await button.reply.send(`**Etkinlik Katılımcısı Rolü Üzerinize Verildi.**`, true)//BURAYADA AYNI ŞEKİDE DOĞRULUKMU CESARETMİ ROLU
          }
  
      }
    // GARTIC
      if (button.id === 'Gartic') {
          if (button.clicker.member.roles.cache.get("930188037672017940")) {
              await button.clicker.member.roles.remove("930188037672017940")
              await button.reply.send(`**Tasarımcı Rolü Üzerinizden Alındı.**`, true)
          } else {
              await button.clicker.member.roles.add("930188037672017940")
              await button.reply.send("**Tasarımcı Rolü Üzerinize Verildi.**", true)//BURAYADA GARTİC İO
            
          }
      }
      if (button.id === 'botl') {
          if (button.clicker.member.roles.cache.get("964484115925712948")) {
              await button.clicker.member.roles.remove("964484115925712948")
              await button.reply.send(`**Botlist Rolü Üzerinizden Alındı.**`, true)
          } else {
              await button.clicker.member.roles.add("964484115925712948")
              await button.reply.send("**Botlist Rolü Üzerinize Verildi.**", true)//BURAYADA GARTİC İO
              }
      }
  });

client.on("message", (message) => {

  // İhtimaller
  
  if (message.content !== "a!reg" || message.author.id === client.ayarlar.sahip || message.author.bot) return;
  
let reg = new MessageButton()
    .setStyle('grey') // Rengi ayarlayabilirsiniz.
    .setEmoji('962719689727946763') // Adını Değiştirebilirsiniz.
    .setID('reg');// Elleme Bunu
    const embed = new Discord.MessageEmbed()  
.setColor(`#5865f2`)
    .setDescription(`**<a:ElSallamaGif:920273601184280588>   Merhaba Hoşgeldin, **

** Sunucumuzdaki Tüm Kanalları Görebilmek İçin Aşağıdaki Butona Tıklayarak Kayıt Olabilirsin.**
 
 **Eğlenceli Ve Güzel Vakit Geçirmenizi Dileriz.**
 
<:ayar:963413662939369507>   - ***Ghost Hunters Yönetimi***`)
    
    
    message.channel.send(embed, { 
    buttons: [ reg ]
  });
  });

  client.on('clickButton', async function (button) {
if (button.id === 'reg') {
          if (button.clicker.member.roles.cache.get("892716452384211005")) {
              await button.clicker.member.roles.remove("964638461787275314")
              await button.reply.send(`**Tekrar Kayıt Olunuz.**`, true)
          } else {
              await button.clicker.member.roles.add("892716452384211005")
              await button.reply.send("**Kayıt Oldunuz**", true)//BURAYADA GARTİC İO
              }
      }
  });


client.on("guildMemberAdd", async member => {
  let csdb = require("quick.db")
  csdb.add(`csgiriş.${member.id}_${member.guild.id}`, 1)
})



client.login(ayarlar.token).then(
  function() {
    console.log("[Token-Log] Token doğru bir şekilde çalışıyor.");
  },
  function(err) {
    console.log("[ERROR] Token'de bir hata oluştu: " + err);
    setInterval(function() {
      process.exit(0);
    }, 20000);
  }
);



client.on('message', async msg => {
  if (msg.content.toLowerCase() === 'sa') {
    await msg.react('<:as:964189599247241237>');
    await msg.react('<:hg:966638265463619625>');
  }
});





client.on("ready" , () => {
    console.log("Buttons Online")
});
const embed31 = new Discord.MessageEmbed() 
.setDescription(`<a:RainbowSonsuzGif:920273606137745469> ***Asistan*** Botu Davet Etmek İçin Butona Tıklayabilirsiniz.`)
.setColor(`#5865f2`)




client.on("message" , (msg) =>{
if(msg.content == "a!davet") {
    let button = new disbut.MessageButton()
    .setStyle('url')
    .setEmoji('<:davet:976841167360643092>')
    .setLabel('Davet')
 .setURL("https://discord.com/api/oauth2/authorize?client_id=915339116332326972&permissions=8&scope=bot%20applications.commands") 
 msg.react("<:okeee:981900426590957598>"); 
 msg.channel.send(embed31, button);
}
});
 const embedke = new Discord.MessageEmbed()
  .setDescription("**Sunucuna Eklendim!**\n\n**<a:dancingbird:976837659068604456> • Prefixlerim : a! ve <@915339116332326972>\n<a:marioo:938403059975991306> • a!yardım yazarak komutlarımı kategorileriyle görebilirsin.**")

client.on("guildCreate", async guild => {
  guild.owner.send("> **Destek Sunucum** https://discord.gg/AKbAEfEAam",embedke);
});

client.on('message', async msg => {
  if(msg.content == `<@915339116332326972>`) return msg.channel.send(`<a:alk:938403057912406056>** • Prefixlerim \`${prefix}\` ve <@915339116332326972>\n<a:iek:938403056859619328> • a!yardım yazarak komutlarıma ulaşabilirsin.**`);
});




const { MessageAttachment } = require('discord.js');
client.on("guildMemberAdd", async member => {
  
const cdb = require("croxydb")
let gkanal = await cdb.get('rgiris_'+member.guild.id)
const gözelkanal = member.guild.channels.cache.get(gkanal)
if(!gözelkanal) return
  
let username = member.user.username
if(gözelkanal.type === "text"){
  
          const bg = await Jimp.read("https://cdn.discordapp.com/attachments/596076560293953565/613821209880297502/giris_yapt.png")
            const userimg = await Jimp.read(member.user.avatarURL({format:"png"}))
            var font
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE)
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
            await bg.print(font, 430, 170, member.user.tag)
            await userimg.resize(300, 300)
            await bg.composite(userimg, 50, 20).write("./img/"+ member.id + ".png")
              setTimeout(function () {
                    gözelkanal.send(new MessageAttachment("./img/" + member.id + ".png"))
              }, 1000)
        }
    })


client.on("guildMemberRemove", async member => {
const cdb = require("croxydb")
let gkanal = await cdb.get('rgiris_'+member.guild.id)
const gözelkanal = member.guild.channels.cache.get(gkanal)
if(!gözelkanal) return

let username = member.user.username
if(gözelkanal.type === "text") {   
  
     const bg = await Jimp.read("https://cdn.discordapp.com/attachments/596076560293953565/613821573249499177/cksyapt.png")
     const userimg = await Jimp.read(member.user.avatarURL({format: "png"}))
     var font
            if (member.user.tag.length < 15) font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE)
            else if (member.user.tag.length > 15) font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE)
            else font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE)
            await bg.print(font, 430, 170, member.user.tag)
            await userimg.resize(300, 300)
            await bg.composite(userimg, 50, 20).write("./img/"+ member.id + ".png")
              setTimeout(function () {
                    gözelkanal.send(new MessageAttachment("./img/" + member.id + ".png"))
              }, 1000)
        }
    })    
   
    const Invites = new Collection();

    client.on("ready", () => {
        client.guilds.cache.forEach(guild => {
            guild.fetchInvites().then(_invites => {
                Invites.set(guild.id, _invites);
            }).catch(err => { });
        });
    });
    client.on("inviteCreate", (invite) => {
        var gi = Invites.get(invite.guild.id);
        gi.set(invite.code, invite);
        Invites.set(invite.guild.id, gi);
    });
    client.on("inviteDelete", (invite) => {
        var gi = Invites.get(invite.guild.id);
        gi.delete(invite.code);
        Invites.set(invite.guild.id, gi);
    });
    
    
    client.on("guildCreate", (guild) => {
      guild.fetchInvites().then(invites => {
        Invites.set(guild.id, invites);
      }).catch(e => {})
    });
    
    client.on("guildMemberAdd", (member) => {
        const db = new Database("./Servers/" + member.guild.id, "Invites"), gi = (Invites.get(member.guild.id) || new Collection()).clone(), settings = new Database("./Servers/" + member.guild.id, "Settings").get("settings") || {};
        var guild = member.guild, fake = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3 ? true : false, channel = guild.channels.cache.get(settings.Channel);
        guild.fetchInvites().then(invites => {        var invite = invites.find(_i => gi.has(_i.code) && gi.get(_i.code).uses < _i.uses) || gi.find(_i => !invites.has(_i.code)) || guild.vanityURLCode;
            Invites.set(member.guild.id, invites);
            var content = `${member} is joined the server.`, total = 0, regular = 0, _fake = 0, bonus = 0;
            if(invite == guild.vanityURLCode) content = settings.defaultMessage ? settings.defaultMessage : `-member- is joined the server! But don't know that invitation he came up with. :tada:`;
            else content = settings.welcomeMessage ? settings.welcomeMessage : `The -member-, joined the server using the invitation of the -target-.`;
    
            if (invite.inviter) { 
                db.set(`invites.${member.id}.inviter`, invite.inviter.id); 
                if(fake){
                    total = db.add(`invites.${invite.inviter.id}.total`, 1);
                    _fake = db.add(`invites.${invite.inviter.id}.fake`, 1);
                }
                else{
                    total = db.add(`invites.${invite.inviter.id}.total`, 1);
                    regular = db.add(`invites.${invite.inviter.id}.regular`, 1);
                }
                var im = guild.member(invite.inviter.id);
                bonus = db.get(`invites.${invite.inviter.id}.bonus`) || 0;
                if(im) global.onUpdateInvite(im, guild.id, Number(total + Number(bonus)));
                
            }    
    
            db.set(`invites.${member.id}.isfake`, fake);
        
            if(channel){
                channel.send((`> **<a:hg:981228857606676550>  ${member.user} Adlı Kişi Sunucuya Katıldı. Davet Eden Kişi ${invite.inviter.tag} Toplam ${total + bonus}\ Davete Ulaştı. Tebrikler!**`)                 
        ) } 
      }).catch(); 
    });
    
    client.on("guildMemberRemove", (member) => {
        const db = new Database("./Servers/" + member.guild.id, "Invites"), settings = new Database("./Servers/" + member.guild.id, "Settings").get("settings") || {};
        var total = 0, bonus = 0, regular = 0, fakecount = 0, channel = member.guild.channels.cache.get(settings.Channel), content = settings.leaveMessage ? settings.leaveMessage : `${member} is left the server.`, data = db.get(`invites.${member.id}`);
        if(!data){
            return;
        }
            if(data === null) data = "Bulunamadı"
        if(data.isfake && data.inviter){
            fakecount = db.sub(`invites.${data.inviter}.fake`, 1);
            total = db.sub(`invites.${data.inviter}.total`, 1);
        }
        else if(data.inviter){
            regular = db.sub(`invites.${data.inviter}.regular`, 1);
            total = db.sub(`invites.${data.inviter}.total`, 1);
        }
        if(data.inviter) bonus = db.get(`invites.${data.inviter}.bonus`) || 0;
        
        var im = member.guild.member(data.inviter)
        db.add(`invites.${data.inviter}.leave`, 1);
         if(channel){
            let user = client.users.cache.get(data.inviter)
            channel.send((`> **<a:bb:981228857908674570>  ${member.user.tag} Sunucudan Ayrıldı. Davet Eden Kişi ${user.tag} kişisinin Toplam Daveti ${Number(total) + Number(bonus)}**`))
         }
    });
    
    
    global.onUpdateInvite = (guildMember, guild, total) => {
        if(!guildMember.manageable) return;
        const rewards = new Database("./Servers/" + guild, "Rewards").get("rewards") || [];
        if(rewards.length <= 0) return;
        var taken = rewards.filter(reward => reward.Invite > total && guildMember.roles.cache.has(reward.Id));
        taken.forEach(take => {
            guildMember.roles.remove(take.Id);
        });
        var possible = rewards.filter(reward => reward.Invite <= total && !guildMember.roles.cache.has(reward.Id));
        possible.forEach(pos =>{
            guildMember.roles.add(pos.Id);
        });
    }
   //ModLog Baş
client.on("message", async (msg, member, guild) => {
  let i = await db.fetch(`saas_${msg.guild.id}`);
  if (i === "açık") {
    if (msg.content.toLowerCase() === "sa") {
      msg.reply("**Aleyküm Selam Hoşgeldin.**");
    }
  }
});


client.on("messageDelete", async message => {
  if (message.author.bot || message.channel.type == "dm") return;

  let log = message.guild.channels.cache.get(
    await db.fetch(`log_${message.guild.id}`)
  );

  if (!log) return;

  const embed = new Discord.MessageEmbed()

    .setTitle(message.author.username + " | Mesaj Silindi")

    .addField("Kullanıcı: ", message.author)

    .addField("Kanal: ", message.channel)

    .addField("Mesaj: ", "" + message.content + "");

  log.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  let modlog = await db.fetch(`log_${oldMessage.guild.id}`);

  if (!modlog) return;

  let embed = new Discord.MessageEmbed()

    .setAuthor(oldMessage.author.username, oldMessage.author.avatarURL())

    .addField("**Eylem:**", "Mesaj Düzenleme")

    .addField(
      "**Mesajın sahibi:**",
      `<@${oldMessage.author.id}> === **${oldMessage.author.id}**`
    )

    .addField("**Eski Mesajı:**", `${oldMessage.content}`)

    .addField("**Yeni Mesajı:**", `${newMessage.content}`)

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(
      `Sunucu: ${oldMessage.guild.name} - ${oldMessage.guild.id}`,
      oldMessage.guild.iconURL()
    )

    .setThumbnail(oldMessage.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelCreate", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_CREATE" })
    .then(audit => audit.entries.first());

  let kanal;

  if (channel.type === "text") kanal = `<#${channel.id}>`;

  if (channel.type === "voice") kanal = `\`${channel.name}\``;

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Oluşturma")

    .addField("**Kanalı Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturduğu Kanal:**", `${kanal}`)

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconUR);

  client.channels.cache.get(modlog).send(embed);
});

client.on("channelDelete", async channel => {
  let modlog = await db.fetch(`log_${channel.guild.id}`);

  if (!modlog) return;

  const entry = await channel.guild
    .fetchAuditLogs({ type: "CHANNEL_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Kanal Silme")

    .addField("**Kanalı Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Kanal:**", `\`${channel.name}\``)

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(
      `Sunucu: ${channel.guild.name} - ${channel.guild.id}`,
      channel.guild.iconURL()
    )

    .setThumbnail(channel.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleCreate", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Oluşturma")

    .addField("**Rolü Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan Rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor(`#5865f2`)

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("roleDelete", async role => {
  let modlog = await db.fetch(`log_${role.guild.id}`);

  if (!modlog) return;

  const entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Rol Silme")

    .addField("**Rolü Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Rol:**", `\`${role.name}\` **=** \`${role.id}\``)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${role.guild.name} - ${role.guild.id}`,
      role.guild.iconURL
    )

    .setColor(`#5865f2`)

    .setThumbnail(role.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiCreate", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Oluşturma")

    .addField("**Emojiyi Oluşturan Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Oluşturulan Emoji:**", `${emoji} - İsmi: \`${emoji.name}\``)

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiDelete", async emoji => {
  let modlog = await db.fetch(`log_${emoji.guild.id}`);

  if (!modlog) return;

  const entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_DELETE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Silme")

    .addField("**Emojiyi Silen Kişi:**", `<@${entry.executor.id}>`)

    .addField("**Silinen Emoji:**", `${emoji}`)

    .setTimestamp()

    .setFooter(
      `Sunucu: ${emoji.guild.name} - ${emoji.guild.id}`,
      emoji.guild.iconURL
    )

    .setColor(`#5865f2`)

    .setThumbnail(emoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let modlog = await db.fetch(`log_${oldEmoji.guild.id}`);

  if (!modlog) return;

  const entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Emoji Güncelleme")

    .addField("**Emojiyi Güncelleyen Kişi:**", `<@${entry.executor.id}>`)

    .addField(
      "**Güncellenmeden Önceki Emoji:**",
      `${oldEmoji} - İsmi: \`${oldEmoji.name}\``
    )

    .addField(
      "**Güncellendikten Sonraki Emoji:**",
      `${newEmoji} - İsmi: \`${newEmoji.name}\``
    )

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(
      `Sunucu: ${oldEmoji.guild.name} - ${oldEmoji.guild.id}`,
      oldEmoji.guild.iconURL
    )

    .setThumbnail(oldEmoji.guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanAdd", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasaklama")

    .addField("**Kullanıcıyı Yasaklayan Yetkili:**", `<@${entry.executor.id}>`)

    .addField("**Yasaklanan Kullanıcı:**", `**${user.tag}** - ${user.id}`)

    .addField("**Yasaklanma Sebebi:**", `${entry.reason}`)

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});

client.on("guildBanRemove", async (guild, user) => {
  let modlog = await db.fetch(`log_${guild.id}`);

  if (!modlog) return;

  const entry = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then(audit => audit.entries.first());

  let embed = new Discord.MessageEmbed()

    .setAuthor(entry.executor.username, entry.executor.avatarURL())

    .addField("**Eylem:**", "Yasak Kaldırma")

    .addField("**Yasağı Kaldıran Yetkili:**", `<@${entry.executor.id}>`)

    .addField(
      "**Yasağı Kaldırılan Kullanıcı:**",
      `**${user.tag}** - ${user.id}`
    )

    .setTimestamp()

    .setColor(`#5865f2`)

    .setFooter(`Sunucu: ${guild.name} - ${guild.id}`, guild.iconURL)

    .setThumbnail(guild.iconURL);

  client.channels.cache.get(modlog).send(embed);
});
// ModLog Son

client.on('ready', () => {
  console.log("hazırım!")
 client.user.setPresence({
    activity: {
      name: `Update`,
      type: "COMPETING"
    },
    status: "idle"
  });
  });