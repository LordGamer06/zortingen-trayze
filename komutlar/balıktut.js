const Discord = require("discord.js")

exports.run = (client, message, args) => {
  message.react("<:okeee:981900426590957598>"); 
  message.channel.send("Oltayı Salladın Bakalım Birşey Geliyormu..").then(message => {
    var espriler = [
      "> Sazan Tuttun! :fish:",
      "> Köpek Balığı Tuttun İyi Para Eder Sat Sat :D",
      "> Uskumru Tuttun! :fish:",
      "> Mezgit Tuttun! Havyarıda Var hee ;) :fish:",
      "> Japon Balığı Tuttun Yemeyi Düşünmüyorsun Herhalde?",
      "> Hamsi Tuttun! :fish:",
      "> Levrek Tuttun! :fish:",
      "> Hiçbirşey Tutamadın Maalesef! :wastebasket:",
      "> Alabalık Tuttun! :fish:",
      "> Maalesef Balık Oltadan Kaçtı! :wastebasket:",
      "> İstavrit Tuttun! :fish:",
      "> Gümüş Balığı Tuttun! :wastebasket:",
      "> Çukra Tuttun!:fish:",
      "> Balon Balığı Tuttun, İğneye Dikkat!",
      "> Yılan Balığı Tuttun, Allah Çarpıldık!"
    ];
    var espri = espriler[Math.floor(Math.random() * espriler.length)]
    setTimeout(() => {
    message.edit(`${espri}`)
    }, 3000)
  })
}

exports.conf = {
  aliases: ["balık-yakala", "balıkyakala", "tut-balık", "balık-tut"]
}

exports.help = {
  name: "balıktut"
}