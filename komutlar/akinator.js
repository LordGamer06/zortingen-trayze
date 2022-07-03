const Discord = require('discord.js');
const { Aki } = require("aki-api");
const akinator = new Set();

exports.run = async (client, message, args) => {
    const embed3169 = new Discord.MessageEmbed() 
    .setDescription(`<:hayr:991371129698652190> ${message.author}, Zaten devam eden bir oyunun bulunuyor.`)
    .setColor("#5865f2")
    if (akinator.has(message.author.id))
        return message.channel.send(embed3169);
        message.react("<:okeee:981900426590957598>"); 

    const answers = [
        "👍🏻",
        "👎🏻",
        "❔",
        "🤔",
        "🙄"
    ]

    const run = async () => {
        const region = 'tr';

        const aki = new Aki({ region });
        await aki.start()
  const embed = new Discord.MessageEmbed() 
  .setDescription(`${aki.question} \n\n${aki.answers.map((x, f) => `${x} | ${answers[f]}`).join("\n")}`)      
  .setColor("#5865f2")
  const msg = await message.channel.send(embed)
        
        await akinator.add(message.author.id);

        await Promise.all([
            ...Object.values(answers)
                .map(r => msg.react(r))
        ])

        const collector = msg.createReactionCollector((r, user) => user.id == message.author.id && Object.values(answers).includes(r.emoji.name));

        collector.on('collect', async r => {
            await aki.step(
                Object.keys(answers)[Object.values(answers).indexOf(r.emoji.name)]
            );

            const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(message.author.id));
            try {
                for (const reaction of userReactions.values()) {
                    await reaction.users.remove(message.author.id);
                }
            } catch (error) {
                console.error('Failed to remove reactions.');
            }

            if (aki.progress > 80) {
                await aki.win()
               const embed = new Discord.MessageEmbed()   
              .setDescription(`${aki.answers[0].name} | ${aki.answers[0].description}`)
              .setImage(`${aki.answers[0].absolute_picture_path}`) 
              msg.edit(embed)
                collector.stop()
                msg.reactions.removeAll().catch(error => console.error('Failed to clear reactions: ', error));
                akinator.delete(message.author.id)
            } else {
             const embed = new Discord.MessageEmbed()  
             .setDescription(`${aki.question} \n\n${aki.answers.map((x, f) => `${x} | ${answers[f]}`).join("\n")}`)
              
              await msg.edit(embed)
            }
        })
    }

    run().catch(console.error);
}
exports.conf = {
    aliases: ["akinatör","aki","akinator"]
};

exports.help = {
    name: "akinator"
};