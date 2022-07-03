const disbut = require("discord-buttons")
const Discord = require("discord.js")
exports.run = async (client, message, args) => {
let ayarlar = require('../ayarlar.json')
const db = require("quick.db")
let prefix = ayarlar.prefix || db.fetch(`prefix_${message.guild.id}`)
  if (message.author.bot) return;
        message.channel.send(`Dosya Yükleniyor Lütfen Bekleyin...`).then(async msj => {
            const botPing = (msj.createdTimestamp - message.createdTimestamp);
            msj.delete();
        const b1 = new disbut.MessageMenuOption()
            .setLabel('Ana Menü')
            
            .setValue('1').setEmoji("967064710858022952")
        const b2 = new disbut.MessageMenuOption()
            .setLabel('Kullanıcı Modülü')
            
            .setValue('2').setEmoji("963413660749942794")
        const b3 = new disbut.MessageMenuOption()
            .setLabel('Yetkili Modülü')
            
            .setValue('3').setEmoji("963413660930306078")
        const b4 = new disbut.MessageMenuOption()
            .setLabel(`Ticket Modülü`)
            
            .setEmoji("987358890570166313")
            .setValue("4")
        const b5 = new disbut.MessageMenuOption()
            .setLabel('Müzik Modülü')
            
            .setValue('5').setEmoji("992480867601629214")

        const b10 = new disbut.MessageMenuOption()
            .setLabel('İstatistik Modülü')
            
            .setValue('10').setEmoji("963413660959645796")  
        const b11 = new disbut.MessageMenuOption()
        .setLabel(`Geliştirici Modülü`)
        
        .setEmoji("938403046449377290")
        .setValue("11")
        const sil = new disbut.MessageMenuOption()
        .setLabel(`Menüyü Sil`)
        
        .setEmoji("967064710891597915")
        .setValue("sil")


        const menu = new disbut.MessageMenu()
        .addOptions(b1, b2, b3, b4, b5, b10, b11, sil)
        .setMaxValues(1)
        .setMinValues(1)
        .setID("menu")
        .setPlaceholder('✨ Bir Modül Seçiniz')
        const hakkında = new Discord.MessageEmbed()
        .setAuthor("Assistant Komutlar", client.user.avatarURL())
        .setColor(`#5865f2`)  
        .setThumbnail(`https://cdn.discordapp.com/attachments/951909806011203664/981579708124782642/standard.gif`)
        .setDescription(`\n\n\n<:ayarlar:946715168191156295>  | Ayarlamalı Modüller

        <:member:963413660749942794>  | Kullanıcı Modülü
        
        <:koruma:963413660930306078>  | Yetkili Modülü
        
        <:ticket:987358890570166313>  | Ticket Modülü
        
        <:3959blueundeafened:992480867601629214>    | Müzik Modülü

        <:win:976813928090837002> | İstatistik Modülü

        <:2_:938403046449377290>  | Geliştirici Bilgileri
        
        <:anamenu:967064710858022952>  | Ana Komutlar\n\n<:assistant:986680682858307694> **[[Davet Linki](https://discord.com/api/oauth2/authorize?client_id=915339116332326972&permissions=8&scope=bot%20applications.commands)]** <:discord:963413660791865364> **[[Destek Sunucusu](https://discord.gg/AKbAEfEAam)]** <:star:976813927893696532> **[[Oy Ver](https://top.gg/bot/915339116332326972)]**\n`)
        .setFooter(`Sorgulayan: ${message.author.tag} `,message.author.avatarURL() )

        const embed2 = new Discord.MessageEmbed()
        .setDescription(`**Kullanıcı Sistemi Komutları**\n\n${prefix}müzik : **Müzik Komutları**\n${prefix}haber : **Güncel Haberler**\n${prefix}havadurumu il : **Güncel Hava Durumu**\n${prefix}karıştır yazı : **Yazdığınız Yazının Karışık Hali**\n${prefix}resim-ara isim: **Yazdığınız İsimdeki Resmi Atar**\n${prefix}discrim : **Sizinle Aynı Etikete Sahip Kişiler**\n${prefix}ping : **Bot Gecikme Süresi**\n${prefix}afk : **Afk Moduna Giriş Yaparsınız**\n${prefix}invites : **Davetlerinize Bakarsınız**\n${prefix}avatar : **Kendinizin veya Başkasının Avatarını Atar**\n${prefix}banner : **Kendinizin veya Başkasının Bannerını Atar**\n${prefix}profil : **Kendinizin veya Başkasının Profiline Bakarsınız**\n${prefix}adamol : **Adam Olursunuz**\n${prefix}akinator : **Akinatoru Başlatır**\n${prefix}balıktut : **Balık Tutarsınız**\n${prefix}beşlik : **Etiketlediğiniz Kişiye Beşlik Çakarsınız**\n${prefix}botbilgi : **Botun Bilgilerine Bakarsınız**\n${prefix}sunucudavet : **Sunucunun Sınırsız Davet Linkini Atar**\n${prefix}espri : **Komik Espriler Yapar**\n${prefix}id : **İstediğiniz Kişinin Id Numarasını Atar**\n${prefix}iltifat : **İstediğiniz Kişiye İltifat Eder**\n${prefix}kanalid : **İstediğiniz Kanalın Id Numarasını Atar**\n${prefix}korona : **Türkiye Korona Günlük İstatistiğini Atar**\n${prefix}meme : **Komik Fotoğraflar Atar**\n${prefix}taksim : **Taksim Dayıyı Atar**\n${prefix}tersyazı : **Yazdığınız Yazıyı Ters Şekli İle Yazar**`)

          .setColor(`#5865f2`)  
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            let totalSeconds = (client.uptime / 1000);
            let days = Math.floor(totalSeconds / 86400);
            totalSeconds %= 86400;
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = Math.floor(totalSeconds % 60);

let embed3 = new Discord.MessageEmbed()
            .setDescription(`**Yetkili Sistemi Komutları**\n\n${prefix}ticket : **Ticket Sistemi**\n${prefix}mod-log #kanal : **Log Sistemini Aktif Eder**\n${prefix}slowmode 0-100 : **Yavaşmod Ayarlar**\n${prefix}sunucukur : **Kibar Bir Sunucu Oluşturur**\n${prefix}davet-kanal ayarla #kanal : **İnvite Kanalı Ayarlarsınız**\n${prefix}bansorgu kullanıcı_id : **Banlanan Kişiyi Sorgularsınız**\n${prefix}davet-kanal-sıfırla #kanal : **İnvite Kanalını Sıfırlarsınız**\n${prefix}top : **En Çok Davet Yapmış Kişileri Gösterir**\n${prefix}anket : **Anket Başlatırsınız**\n${prefix}sunucubilgi : **Sunucu Bilgilerini Gönderir**\n${prefix}sil : **İstediğiniz Sayıda Mesajı Silebilirsiniz**\n${prefix}avatar : **Avatarınızı Görebilirsiniz**\n${prefix}id : **İstediğiniz Kişinin Idsini Verir**\n${prefix}ban : **Etiketlediğiniz Kişiyi Sunucudan Yasaklar**\n${prefix}botbilgi : **Bot Bilgilerini Gönderir**\n${prefix}sunucudavet : **Sınırsız Sunucu Davet Linki Atar**\n${prefix}forceban : **İD İle Yasaklar**\n${prefix}id : **İstediğiniz Kişinin ID Numarasını Atar**\n${prefix}kanalid : **Etiketlediğiniz Kanalın ID Numarasını Atar**\n${prefix}kick : **Etiketlediğiniz Kişiyi Sunucudan Atar**\n${prefix}oylama : **Oylama Başlatır**\n${prefix}rol ver @rol / ${prefix}rol al @rol : **Etiketlediğiniz Kişiye Etiketlediğiniz Rolü Verir Alır**\n${prefix}say : **Sunucudaki Kullanıcı Bilgilerini Atar**\n${prefix}sunucubilgi : **Sunucu Bilgilerini Atar**\n${prefix}sunucuresmi : **Sunucu Profil Fotosunu - Gifini Atar**\n${prefix}unban : **Girdiğiniz ID Numaralı Kişinin Yasağını Kaldırır**\n\nBirçoğu Yalnızca Owner Özeldir.`)
            .setFooter(`${ayarlar.botisim}`, client.user.avatarURL())
             .setColor(`#5865f2`) 
            .setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))

let embed4 = new Discord.MessageEmbed()
.setDescription(`**Ticket Sistemi Komutları**\n\n${prefix}ticket : **Ticket Sistemi**\n${prefix}ticket(destek) aç @yetkili_rol #kanal : **Sistemi Aktif Edersiniz**\n${prefix}ticket(destek) kapat : **Sistemi Sıfırlar ve Kapatırsınız**\n\n**Not** Ticket Mesajı Silindiğinde Bot Sunucu Sahibine Mesaj Silindiği İçin Sistem Sıfırlandı Mesajı Atacaktır.`)
.setFooter(`${ayarlar.botisim}`, client.user.avatarURL())
 .setColor(`#5865f2`) 
.setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
.setThumbnail(client.user.displayAvatarURL({dynamic: true}))

let embed5 = new Discord.MessageEmbed()
.setDescription(`**Müzik Sistemi Komutları**\n\na!p : **Şarkıyı Oynatır**\na!duraklat : **Şarkıyı  Duraklatır**\na!ilerleme : **Şarkı İlerlemesi**\na!queue : **Eklenen Müziklerin Listesi**\na!np : **Şu An Oynatılan Şarkı İsmini Atar**\na!döngü : **Döngü Sistemini Açar**\na!filtre : **Şarkıya Filtre Ekler**\na!geri : **Önceki Şarkıyı Oynatır**\na!temizle : **Oynatma Listesini Temizler**\na!devam : **Durdurulan Şarkıyı Devam Ettirir**\na!stop : **Çalmayı Durdurur**\na!ara : **İsmini Girdiğiniz Şarkıyı Arar**\na!ses : **Sesi Ayarlar**`)
.setFooter(`${ayarlar.botisim}`, client.user.avatarURL())
 .setColor(`#5865f2`) 
.setFooter(`${message.author.tag} tarafından istendi.`, message.author.displayAvatarURL({dynamic: true}))
.setThumbnail(client.user.displayAvatarURL({dynamic: true}))


           
            let button = new disbut.MessageButton()
             .setStyle('url')
             .setEmoji('<:davet:976841167360643092>')
             .setLabel('Davet')
          .setURL("https://discord.com/api/oauth2/authorize?client_id=915339116332326972&permissions=8&scope=bot%20applications.commands") ;
          let destek = new disbut.MessageButton()
          .setStyle('url')
          .setEmoji('<<:partner:963413660909305927> ')
          .setLabel('Destek Sunucusu')
       .setURL("https://discord.gg/AKbAEfEAam");
       let button3 = new disbut.MessageButton()
       .setStyle('url')
       .setEmoji('<:davet:976841167360643092>')
       .setLabel('Davet')
    .setURL("https://discord.com/api/oauth2/authorize?client_id=915339116332326972&permissions=8&scope=bot%20applications.commands")  ;
          

let ping1 = new Date().getTime() - message.createdTimestamp
let ping2 = client.ws.ping
            let user = client.users.cache.get("889928756154748948");
            if(user.presence.status === "online"){
               let aktif = "Şu anda online! Mesaj atabilirsin!"
               let emoj = "🟢"
            } else if (user.presence.status === "dnd"){
              let  rahatsızetmeyin = "Lütfen rahatsız etmeyin."
              let emoj = "🔴"
            } else if(user.presence.status === "offline"){
              let  çevrimdışı = "Şu anda çevrimdışı. Mesajınızı bırakabilirsiniz."
              let  emoj = "⚫"
            } else if(user.presence.status === "idle"){
              let  boşta = "Boşta"
              let  emoj = "🟡"
            }
            let embed10 = new Discord.MessageEmbed()
            .setAuthor(`Bot İstatistikleri`, client.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Assistant İstatistikler`)
            .setThumbnail(client.user.displayAvatarURL({dynmaic: true}))
            .addFields(
                
              
                {name: "<:11:938403049326661635>  Gecikme süreleri", value:`>>> Mesaj Gecikmesi: \`${ping1}\` **ms** \nBot Gecikmesi: \`${ping2}\` **ms**`, inline: true},

                {name: "<:davet:976841167360643092> Sunucu Sayısı ve Kullanıcı Miktarı", value:`>>> Bot Şuan \`${client.guilds.cache.size}\` **Sunucuda** \n${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} **kullanıcıyı** izliyor`, inline: false},
{name: "<:star:976813927893696532> Botun sahibi", value:`>>> ${user}`,inline: true},
                )
            .setImage("https://cdn.discordapp.com/attachments/951909806011203664/992418137247076432/unknown.png")
            .setFooter(`${message.author.tag} tarafından istendi!`, message.author.displayAvatarURL({dynmaic: true}))
            .setTimestamp()

            let embed11 = new Discord.MessageEmbed()
            .setAuthor(`Geliştirici Bilgileri`, client.user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL({dynamic: true}))
            .addFields(
                {name: `>>> Bot Geliştiricisi:`, value:`<:2_:938403046449377290> ${user}`, inline: false},
                {name: ">>> Durum:", value:`${user.presence.status}`, inline: false},
                {name: "> Linkler", value: "[Botu Ekle!](https://discord.com/api/oauth2/authorize?client_id=915339116332326972&permissions=8&scope=bot%20applications.commands) | [Botu Oyla!](https://top.gg/bot/915339116332326972) | [Web Sitesi](http://www.assistantbot.tk/) | [Destek Sunucusu](https://discord.gg/AKbAEfEAam)"}
            )
            .setFooter(`Assistant`, user.displayAvatarURL({dynamic: true}))
            .setTimestamp()

            message.react("<:okeee:981900426590957598>"); 
        let msg = await message.channel.send({ embed: hakkında, component: menu });
        


        const filter = (menu) => menu.clicker.user.id === message.author.id; 
        const collector = message.createMenuCollector(filter, { time: 120000 });
        client.on("clickMenu", menu => {
            if(menu.clicker.id !== message.author.id) return;
            menu.reply.defer();
            if (menu.values[0] === '1') {
                msg.edit({
                    embed: hakkında,
                })
            }
            if (menu.values[0] === '2') {
                msg.edit({
                    embed: embed2,
                })
            }
            if (menu.values[0] === '3') {
                msg.edit({
                    embed: embed3,
                })
            }
            if(menu.values[0] === "4"){
                msg.edit({
                    embed: embed4,
                })
            }
            if(menu.values[0] === "5"){
                msg.edit({
                    embed: embed5,
                })
           
     
            }
            if(menu.values[0] === '10'){
                msg.edit({
                    embed: embed10,button,destek
                })
            }
            if(menu.values[0] === '11'){
                msg.edit({
                    embed: embed11,destek,button
                })
            }
            if(menu.values[0] === 'sil'){
                msg.delete({
                    embed: hakkında,button,embed2,embed3,embed4,embed5,embed10,button,embed11
                })
            }
        })
        })
}
exports.conf = {aliases: []}
exports.help = {
    name: "yardım",
    description: "",
    usage: ""}