const premiumconfig = require("./premiumconfig.json")
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');
const client = new Discord.Client();
const client2 = new Discord.Client();
const hero = client;
const bot = client;
const pretty = require("pretty-ms");
const ms = require('ms');
const db = require('quick.db')
const prefix = premiumconfig.prefix;
const Canvas = require("canvas");
let coins = require("./coins.json");
let tokens = require("./tokens.json");
//const emojis = '566320808121729088'
const devs = ["523836549390139392", "599540891191083018", "516307527806484490"]; //test
const support = hero.guilds.get("555746338873147413");  
const elogg = client.channels.get("567384847371468811");
const getAccountStats = require("twitter-scrape-account-stats").getAccountStats;
const rep = require("./rep.json")
const movie = require('node-movie');
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";
//const premium = ["566974414164459530", "574928675284451339", "527875960230379540"];

// 527875960230379540 ذا لاسبوعين من تاريخ 24/5 ل تاريخ 8/6

/*let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy premium")
      
     if(!premium.includes(message.author.id)) return message.channel.send(embed); else     يوضع في اول الكود  
*/

const sID = "585019342299594767";
client.on("guildCreate", g => {
  if(!g.id === sID) {
    g.leave();
  }});

client.on('ready', function() {
     
   // const statuslist = [
     // `.help | ${client.guilds.size} Servers`,
     // `.help | ${client.channels.size} Channels`,
     // `.help | ${client.users.size} Users`
   // ];
  //  const random = Math.floor(Math.random() * statuslist.length);/

    try {
       client.user.setPresence({
        game: {
          name: `${premiumconfig.statusname}`,
          type: premiumconfig.statustype,
          url: "https://www.twitch.tv/murtajaziad"
          //url: 'https://www.twitch.tv/spokloo'
        },
        status: premiumconfig.status
      });
    } catch (error) {
      console.error(error);
    }
 
});

const adminprefix = prefix;
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!premiumconfig.premiumUser.includes(message.author.id)) return;
     
  if (message.content.startsWith(adminprefix + 'setp')) {
    if(!argresult) return;
  client.user.setGame(argresult);
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'setw')) {
     if(!argresult) return;
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'setl')) {
     if(!argresult) return;
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  } else    
    if (message.content.startsWith(adminprefix + 'setname')) {
       if(!argresult) return;
  client.user.setUsername(argresult).then
      message.channel.sendMessage(`**${argresult}** : Done :>`)
  return message.reply("**You Can't Change Your Name ,Only After Two Hours :>**");
  } else
    if (message.content.startsWith(adminprefix + 'setavatar')) {
       if(!argresult) return;
  client.user.setAvatar(argresult);
    message.channel.sendMessage(`**${argresult}** : تم تغير صورة البوت`);
        } else    
  if (message.content.startsWith(adminprefix + 'sets')) {
     if(!argresult) return;
    client.user.setGame(argresult, "https://www.twitch.tv/murtajaziad");
      message.channel.sendMessage(`**:white_check_mark:   ${argresult}**`)
  }
   
 
  });

//client.on('message', message => {
 // if(message.include(prefix)) return;

client.on('message', msg => {
  if(msg.content === `${prefix}hideall`) {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        //SEND_MESSAGES: false,
        READ_MESSAGES: false
      })
    })
    msg.channel.send('تم اخفاء الرومات من الاعضاء')
  }
})

client.on('message', msg => {
  if(msg.content === `${prefix}showall`) {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        //SEND_MESSAGES: true,
        READ_MESSAGES: true
      })
    })
    msg.channel.send('تم اظهار الرومات من الاعضاء')
  }
})

  client.on('message', msg => {
  let message = msg;
  if(msg.content === `${prefix}deleteall`) {
    let embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`You Don't have \`OwnerShip\``);
       if (!msg.guild.owner.id.includes(msg.author.id)) return message.channel.send(embed1)//
        
    msg.guild.channels.forEach(c => {
      c.delete()
      })
    msg.guild.roles.forEach(c => {
      c.delete()
      })
    
    msg.channel.send("Done")
  }
})  

client.on('message',async message => {
if(message.content == `${prefix}unbanll`) {
if(message.author.bot || message.channel.type == "dm" || !message.member.hasPermission("BAN_MEMBERS")) return;
message.guild.fetchBans().then(ba => {
ba.forEach(ns => {
message.guild.unban(ns);
})
}).then(() => {
let embed = new Discord.RichEmbed()
 .setDescription("Unbanned")
  message.channel.send(embed);
})
}
});

client.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    client.commands.set(props.help.name, props);
  });
});client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
}
 jsfile.forEach((f) => {
    let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  client.commands.set(props.help.name, props);
  });
}); 

client.on("message", message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = premiumconfig.prefix;


  //checks if message contains a command and runs it
  let commandfile = client.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
})







client.on('message', dark => {
       let servers = client.guilds.size;
       var users = client.users.size;
       var channels = client.channels.size;
       var name = client.user.username;
       let pretty = require('pretty-ms');
       let cpu = require('cpu');
       let stackos = require('stackos').info;
       var owners = ["HeemPlayz#9955 `[Owner]`\nZ/ Dl / SPLA#8303 `[Co-Owner & Dev]`"]
    let command = dark.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)
	if (dark.content === `${prefix}bot` || dark.content === `${prefix}stats`) {
  
      var night = new Discord.RichEmbed()
       
       .setColor('#36393e')
      
       .setDescription(`** → ℹ Bot Information**
**\`\`\`js
Bot Name : ${name}
Bot Ping : ${Date.now() - dark.createdTimestamp} MS 
Uptime : ${pretty(client.uptime, { verbose: true })}\`\`\`**`)
      
       .addField('→ General Info :' , `⇏ __**Servers**__ : ${servers} \n⇏ __**Users**__ : ${users} \n⇏ __**Channels**__ : ${channels}` , true)

       .addField('→ Deving Info :' , `⇏ __**Node**__ :${process.version} \n⇏ __**CPU**__ : ${Math.round((process.cpuUsage().user + process.cpuUsage().system) / 2048)} MB ( ${cpu.num()} % ) \n⇏ __**Platform**__ : ${stackos.os} ( ${stackos.arch} Bit ) \n⇏ __**Procsser**__ : ${(stackos.cpus.model).split("(R)")[1]} ( ${stackos.cpus.cores} Cores ) \n⇏ __**Discord Version**__ : ${require('./package.json').dependencies["discord.js"].replace('^', '') + ' v'} \n⇏ __**Ram Usage**__ : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB ` , true)
      
       .addField('→ Bot Devs :' , `${owners}`)
        .setFooter('Requested By : ' + dark.author.username ,dark.author.displayAvatarURL)
      .setTimestamp()
      dark.channel.send(night)
    }
});



client.on('ready',  () => {

  
  

  console.log('~ Bot On !  ');
    console.log(`Logged in as * [ " ${client.user.username} " ] servers! [ " ${client.guilds.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] Users! [ " ${client.users.size} " ]`);
    console.log(`Logged in as * [ " ${client.user.username} " ] channels! [ " ${client.channels.size} " ]`);
   console.log(``)
  let link = bot.generateInvite();
	console.log(link);
  });



///////////////24HOUR                START
const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.ejs');
});



/*
client.on('message', async message => {
  
                if(message.content.includes('discord.gg')){ 
                    if(message.member.hasPermission("MANAGE_GUILD")) return;
            if(!message.channel.guild) return;
            message.delete()
              var command = message.content.split(" ")[0];
        let muterole = message.guild.roles.find(`name`, "Muted");
        if(!muterole){
          try{
            muterole = await message.guild.createRole({
              name: "Muted",
              color: "#9c9c9c",
              permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          }catch(e){
            console.log(e.stack);
          }
        }
               if(!message.channel.guild) return message.reply('** This command only for servers**');
         message.member.addRole(muterole);
        const embed500 = new Discord.RichEmbed()
          .setTitle("✽ Server Invite")
                .addField(`**✽ You're Muted **` , `**Reason » Sending \`discord.gg\` links
**`)
                .setColor('#000000').setColor('#36393e')
                .setThumbnail(`${message.author.avatarURL}`)
                .setAuthor(message.author.username, message.author.avatarURL)
            .setFooter(`Server » ${message.guild.name} `)
         message.channel.send(embed500)
         message.author.send('**اذا قمت بارسال الرابط عن طريق الخطأ ,, تواصل مع ادارة السيرفر**');
    
                  
                  
                  
                  }
    })
*/


client.on('message',async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(!message.content.startsWith(prefix)) return;
    let cmd = message.content.split(" ")[0].substring(prefix.length);
    let args = message.content.split(" ");
    if(cmd === 'hypixel') {
      
        if(!args[1]) return message.reply("please specify a player name.")
        let HypixelAPI  = require("hypixel-api");
        let client = new HypixelAPI ("4856cc0d-031c-4b27-9d49-2edb7679853b");
        let i = new Discord.RichEmbed();
        i.setColor("#36393e");
        let o = await message.channel.send(`**✽ Getting data, Please wait...**`);
        client.getPlayer('name', args[1])

        .then(async player => {
          let stats = player.player.achievements;
          let overall = player;
          const getDays = (createdAt) => {
            let date = Date.now() - createdAt;
            // return `${Math.round(date / 1000 / 60 / 60 / 24)} Days ago`;
            return pretty(date);
          };
          i.setDescription(`**❯ The player \`${overall.player.displayname}\`'s data**`);
          i.setThumbnail(`https://minotar.net/helm/${args[1]}`);
          i.addField('✽ SkyWars Kills', `» Kills Team: \`${stats["skywars_kills_team"]}\`\n» Kills Solo:
    \`${stats["skywars_kills_solo"]}\`\n» Kills Mega: \`${stats["skywars_kills_mega"]}\``, true);
          i.addField('✽ SkyWars Wins', `» Wins Team: \`${stats["skywars_wins_team"]}\`\n» Wins Solo: \`${stats["skywars_wins_solo"]}\`\n» Wins Mega: \`${stats["skywars_wins_mega"]}\``, true);
          i.addField('✽ BedWars Stats', `» Broken Beads: \`${stats["bedwars_beds"] || 0}\`\n» BedWars Wins: \`${stats["bedwars_wins"] || 0}\`\n» BedWars Level: \`${stats["bedwars_level"]}\``, true);
          i.addField('✽ Other Stats', `» Recent Game: \`${overall.player.mostRecentGameType || "None"}\`\n» First Joined: \`${getDays(overall.player.firstLogin)}\`\n» Last Joined: \`${getDays(overall.player.lastLogin)}\``, true);
          i.setFooter('Hypixel Stats | Z Bot ', 'https://hypixel.net/styles/hypixel-uix/xenforo/og-icon.png');
          await message.channel.send(i);
          await o.delete().catch(e => {});
        })
        .catch(async e => {
          console.log(e.stack);
          await o.delete().catch(e => {});
          return message.channel.send(`**I cant find player with name: \`${args[1]}\`**`);
        });
       }
    });

var word;
 
/*client.on("message", async function(msg) {
  let em1 = client.guilds.get("540192448568229908").emojis.find(r => r.name === "07");
    if (msg.author.bot) return undefined;
    if (msg.channel.type !== "text") return undefined;
    else {
        var args = msg.content.toLowerCase().split(" ");
        if (args[0].slice(prefix.length) === ".clear") {
            if (isNaN(args[1]) && args[1]) return msg.channel.send("**من فضلك , قم باستخدام ارقام**");
            if (!msg.guild.member(client.user)) return msg.channel.send(':information_source: | **انا لا املك الصلاحيات الكافيه**');
            if (!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send(":information_source: | **لا تملك الصلاحيات الكافيه**");
            else {
                if (args[1] || !args[1]) {
                    await msg.channel.fetchMessages().then(async msgs => {
                        var word;
                        if (msgs.size-1 >= 1) word = "messages";
                        if (msgs.size-1 <= 1) word = "message";
                        if(msgs.size-1 <= 0) return msg.channel.send(`${em1} | **لا يوجد رسائل للمسح**`).then(msg => msg.delete(5000));
                        if (!args[1]) {
                            if (msgs.size-1 < 100) {
                                await msg.channel.bulkDelete(msgs.size);
                                await msg.channel.send(`**\`\`\` عدد الرسائل التي تم مسحها : ${msgs.size-=1} ${word}\`\`\`**`).then(msg => msg.delete(5000));
                            }
                            else if (msgs.size-1 >= 100) {
                                await msg.delete();
                                await msg.channel.bulkDelete(msgs.size);
                                await msg.channel.send(`**\`\`\` عدد الرسائل التي تم مسحها : ${msgs.size-=1} ${word}\`\`\`**`).then(msg => msg.delete(5000));
                            
                        }
                        else if (args[1] && args[1] < 100) {
                            if (msgs.size-1 < 100 && args[1] < 100 && args[1] > 0) {
                                await msg.channel.bulkDelete(parseInt(args[1])+1);
                                await msg.channel.send(`I've deleted ${parseInt(args[1]).toFixed()} ${word}..`).then(msg => msg.delete(5000));
                            }
                            else if (msgs.size-1 >= 100 && args[1] == 100) {
                                await msg.delete();
                                await msg.channel.bulkDelete(msgs.size);
                                await msg.channel.send(`**\`\`\` عدد الرسائل التي تم مسحها : ${msgs.size-=1} ${word}\`\`\`**`).then(msg => msg.delete(5000));
                            }
                            else {
                                return msg.channel.send(`${em1} | **الارقام خطاء**`);
                            }
                        }
                          }})
                }
            }
        }
    }
});
*/




  
 
  
client.on('message', message => {

  let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(prefix.length)
	if (message.channel.type !== 'text') return;
if (message.content === `${prefix}server` || message.content === `${prefix}guild`) {
  
	//let emoji = {
       // online: `${client.guilds.find(r => r.id === '578692613541199908').emojis.find(e => e.name === 'online')}`,
       // dnd: `${client.guilds.find(r => r.id === '578692613541199908').emojis.find(e => e.name === 'dnd')}`,
       // idle: `${client.guilds.find(r => r.id === '578692613541199908').emojis.find(e => e.name === 'Idle')}`,
       // offline: `${client.guilds.find(r => r.id === '578692613541199908').emojis.find(e => e.name === 'ofline')}`,
       // discord: `${client.guilds.find(r => r.id === '578692613541199908').emojis.find(e => e.name === 'Discord')}`,
       // bot: `${client.guilds.find(r => r.id === '481876096766181377').emojis.find(e => e.name === 'bot')}`
 // }
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`**You Don't Have Enough Permissions**.`).then(msg => msg.delete(3000));
    message.guild.fetchBans().then(bans => {
      var bansSize = bans.size;
      
      var server = new Discord.RichEmbed()
     
      .setDescription (`• **Some Info About __${message.guild.name}__**
**\`\`\`js
Server ID : (${message.guild.id})
AFK Room : (${message.guild.afkChannel || "I Can't Find It"})\`\`\`** `)
      .addField(`• **__Server Owner__**`, `**↝** [ **${message.guild.owner}** ]`) 
      .addField(`• **__Server Type__**`, `**↝** [ ** ${message.guild.region}** ]`, true)
      .addField(`• **__Server Created At__**`, `**↝ **[ **${moment(message.guild.createdAt).format("LL")}** ]`, true)
      .addField(`• **__Roles Amount__**`, `**↝** [ **${message.guild.roles.size}** ]`, true)
      .addField(`• **__Channels__**`, `**↝ \`#\` ${message.guild.channels.filter(a => a.type === 'text').size} - \`🎤\` ${message.guild.channels.filter(a => a.type === 'voice').size}**`, true)
      .addField(`• **__Bans Amount__**`, `**↝** [ **${bansSize}** ]`, true)
      .addField(`• **__Last Member__**`, `**↝** [ **${Array.from(message.channel.guild.members.values()).sort((a, b) => b.joinedAt - a.joinedAt).map(m => `<@!${m.id}>`).splice(0, 1)}** ]`, true)
      .addField(`• **__Members__**`, `**↝ Online \`${message.guild.members.filter(r => r.presence.status === 'online').size}\` | Idle \`${message.guild.members.filter(r => r.presence.status === 'idle').size}\` | Bot \`${message.guild.members.filter(r => r.user.bot).size}\`\n↝ DND \`${message.guild.members.filter(r => r.presence.status === 'dnd').size}\` | Offline \`${message.guild.members.filter(r => r.presence.status === 'offline').size}\` | All \`${message.guild.memberCount}\`**`, true)
        .setFooter('Requested By : ' + message.author.username,message.author.displayAvatarURL)
      .setTimestamp()
      .setColor('#36393e')
      .setThumbnail(message.guild.iconURL)
      message.channel.send(server)

    })
}
  
});


client.on('message', message => {
    if (message.content.toLowerCase().startsWith(prefix + "top-servers")) {
      
      
      let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy `Premium`")
      
      //if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
        if(!devs.includes(message.author.id)) return; else
        var top = client.guilds.sort((a, b) => a.memberCount - b.memberCount).array().reverse()
     let tl = "";
      for (let i=1;i<=20;i++) {
          if (!top[i]) continue;
         tl += i+" - "+top[i].name+" : "+top[i].memberCount+"\n"
      }
      message.channel.send(tl)
    }
});

/*client.on('message',async message => {
let em1 = client.guilds.get(emojis).emojis.find(r => r.name === "02");


  
       if (message.content.startsWith(prefix + "bot")) {
        
       message.channel.send(`**:e_mail: | Bot Help Commands** :

**${em1} | \`\`.stats\`\` : لعرض معلومات البوت
${em1} | \`\`.invite\`\` : لارسال رابط دعوه البوت
${em1} | \`\`.support\`\` : لارسال رابط سيرفر السبورت
${em1} | \`\`${prefix}top-servers\`\` : لاظهار اعلي سيرفرات التي يوجد فيه البوت
${em1} | \`\`${prefix}ping\`\` : لعرض سرعة اتصال البوت
**`)
   }

});
 

client.on('message',async message => {

let em2 = client.guilds.get(emojis).emojis.find(r => r.name === "07");
 //   let em4 = client.guilds.get("540192448568229908").emojis.find(r => r.name === "mc");
let em1 = client.guilds.get(emojis).emojis.find(r => r.name === "06");
    let em5 = client.guilds.get(emojis).emojis.find(r => r.name === "02");
let em3 = client.guilds.get(emojis).emojis.find(r => r.name === "03");
  let em6 = client.guilds.get(emojis).emojis.find(r => r.name === "10");
  let em7 = client.guilds.get(emojis).emojis.find(r => r.name === "05");
  let em8 = client.guilds.get(emojis).emojis.find(r => r.name === "02");
  let em9 = client.guilds.get(emojis).emojis.find(r => r.name === "11");
  let em10 = client.guilds.get(emojis).emojis.find(r => r.name === "04");
  
       if (message.content.startsWith(prefix + "help")) {
        
       message.channel.send(`**:e_mail: | Help Commands** :

**${em3} | \`\`.public\`\` : الاوامر العامة
${em1} | \`\`.staff\`\` : الاوامر الادارية
${em6} | \`\`.tickets\`\` : اوامر التذاكر
${em7} | \`\`.music\`\` : اوامر الاغاني
${em8} | \`\`.games\`\`: اوامر الالعاب
${em10} | \`\`.bot\`\` : الاوامر الخاصة بمعلومات البوت**`)

   }

});




client.on('message',async message => {
let em2 = client.guilds.get(emojis).emojis.find(r => r.name === "02");
//let em1 = client.guilds.get("540192448568229908").emojis.find(r => r.name === "hyp");
//    let em3 = client.guilds.get("540192448568229908").emojis.find(r => r.name === "mc");


  
       if (message.content.startsWith(prefix + "public")) {
        
       message.channel.send(`**:e_mail: | Public Help Commands** :

**${em2} | \`\`${prefix}avatar\`\` : لاظهار صوره حسابك
${em2} | \`\`${prefix}links\`\` : لمعرفة عدد دعواتك
${em2} | \`\`.google\`\` : لعرض معلومات من الجوجل
${em2} | \`\`.translate\`\` : لعرض ترجمه
${em2} | \`\`.weather\`\` : لعرض الطقس
${em2} | \`\`.hastebin\`\` : لكتابت شي في موقع
${em2} | \`\`.ascii\`\` : لكتابه الكلام مزخرف
${em2} | \`\`.icon\`\` : اظهار صورة السيرفر
${em2} | \`\`.hypixel\`\` : عرض احصائياتك بهايبكسل
${em2} | \`\`.skin\`\` : عرض سكنك
${em2} | \`\`.wiki\`\` : عرض مقال في ويكيبيديا
${em2} | \`\`.npm\`\` : عرض معلومات عن بكج معين
${em2} | \`\`.createinvite <uses> <age m/s/h/d>\`\` : انشاء رابط دعوة باعداداتك
${em2} | \`\`.user\`\` : عرض معلومات حسابك
**`)


   }

});


 

client.on('message',async message => {
let em1 = client.guilds.get(emojis).emojis.find(r => r.name === "11");


  
       if (message.content.startsWith(prefix + "log")) {
        
       message.channel.send(`**:e_mail: | Log Help Commands** :

**${em1} | \`\`.setlog\`\` : تحديد روم اللوق
${em1} | \`\`.logtoggle\`\` : تفعيل وايقاف تفعيل اللوق

**
`)


   }
  else if (message.content === prefix + "wlc") {
        
       message.channel.send(`**:e_mail: | Welcome Help Commands** :

**${em1} | \`\`.setwlc\`\` : تحديد روم الترحيب
${em1} | \`\`.wlctoggle\`\` : تفعيل وايقاف تفعيل الترحيب

**
`)


   }
  

});
 

client.on('message',async message => {

//let em7 = client.guilds.get("562375046220480512").emojis.find(r => r.name === "partner");
let em1 = client.guilds.get(emojis).emojis.find(r => r.name === "11");
  
       if (message.content.startsWith(prefix + "staff")) {
        
       message.channel.send(`**:e_mail: | Staff Help Commands** :

**:hammer: | \`\`${prefix}ban\`\` : إعطاء حظر
:scales: | \`\`${prefix}kick\`\` : إعطاء طرد
:zipper_mouth: | \`\`${prefix}mute\`\` : اعطاء ميوت كتابي
:smiley: | \`\`${prefix}unmute\`\` : لفك الميوت الكتابي
:tools: | \`\`${prefix}server\`\` : معلومات عن السيرفر
${em1} | \`\`.topic\`\` : لكتابة عنوان للروم
${em1} | \`\`.autorole\`\` : اوامر الاوتورول
${em1} | \`\`.wlc\`\` : اوامر الترحيب
${em1} | \`\`.log\`\` : اوامر اللوق
**`)


   }

}); //Hi

client.on('message',async message => {

let ticketsem = "📧";

  
       if (message.content.startsWith(prefix + "tickets")) {
        
       message.channel.send(`**:e_mail: | Tickets Help Commands** :

**${ticketsem} | \`\`${prefix}new\`\` : لفتح تذكرة
${ticketsem} | \`\`${prefix}close\`\` : لإغلاق تذكرة
${ticketsem} | \`\`${prefix}forceclose\`\` : غلق التذكرة فورا
${ticketsem} | \`\`${prefix}setcategory\`\` : Tickets تعيين كاتيجوري معين لفتح التذاكر  | اذا ما ظبطن معك سوي كاتيجوري باسم    
${ticketsem} | \`\`${prefix}setrole\`\` : تعيين رتبة معينة للادارة الذين يمكنهم رؤية التذاكر
${ticketsem} | \`\`${prefix}add\`\` : اضافة شخص للتذكرة
${ticketsem} | \`\`${prefix}remove\`\` : طرد شخص من التذكرة
${ticketsem} | \`\`${prefix}rename\`\` : تغيير اسم التذكرة
**`)


   }

}); 

client.on('message',async message => {

let ticketsem = "💿";

  
       if (message.content.startsWith(prefix + "music")) {
        
       message.channel.send(`**:e_mail: | Music Help Commands** :

**${ticketsem} | \`\`${prefix}play | ${prefix}p | ${prefix}search | ${prefix}ply \`\` : تشغيل اغنية
${ticketsem} | \`\`${prefix}stop | ${prefix}sto | ${prefix}st\`\` : توقيف الاغاني ومحي ال بلاي ليست
${ticketsem} | \`\`${prefix}skip | ${prefix}sk | ${prefix}s | ${prefix}ski\`\` : الانتقال الى الاغنية التالية
${ticketsem} | \`\`${prefix}leave | ${prefix}l | ${prefix}disconnect\`\` : الخروج من الروم الصوتية 
${ticketsem} | \`\`${prefix}volume | ${prefix}vol | ${prefix}v\`\` : تغيير الصوت
${ticketsem} | \`\`${prefix}queue | ${prefix}q | ${prefix}qu | ${prefix}que\`\` : عرض صف الاغاني
${ticketsem} | \`\`${prefix}pause | ${prefix}pa | ${prefix}pau | ${prefix}paus\`\` : وقف الاغنية مؤقتا
${ticketsem} | \`\`${prefix}resume | ${prefix}r | ${prefix}continue | ${prefix}res\`\` : تكملة الاغنية
${ticketsem} | \`\`${prefix}repeat | ${prefix}rpt\`\` : تكرار الاغنية الحالية
${ticketsem} | \`\`${prefix}loop | ${prefix}lo\`\` : تكرار قائمة الاغاني
**`)


   }

}); 

client.on('message',async message => {

let ticketsem = "🏅";

  
       if (message.content.startsWith(prefix + "games")) {
        
       message.channel.send(`**:e_mail: | Games Help Commands** :

**${ticketsem} | \`\`${prefix}رياضيات\`\`
${ticketsem} | \`\`${prefix}لغز\`\`
${ticketsem} | \`\`${prefix}علم\`\`
${ticketsem} | \`\`${prefix}فكك\`\` 
${ticketsem} | \`\`${prefix}اسرع\`\`
${ticketsem} | \`\`${prefix}ايموجي\`\`

**`)


   }

}); 
*/
/* let ar = JSON.parse(fs.readFileSync(`./ar.json`, `utf8`))
client.on('guildMemberAdd', member => {
  
if(!ar[member.guild.id]) ar[member.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(ar[member.guild.id].onoff === 'Off') return;
member.addRole(member.guild.roles.find(`name`, ar[member.guild.id].role)).catch(console.error)
})
client.on('message', message => {
 // let em1 = client.guilds.get("540192448568229908").emojis.find(r => r.name === "08");
  let em1 = client.guilds.get("540192448568229908").emojis.find(r => r.name === "11");

if(!message.guild) return
if(!ar[message.guild.id]) ar[message.guild.id] = {
onoff: 'Off',
role: 'Member'
}
if(message.content.startsWith(prefix + `autorole`)) {
let perms = message.member.hasPermission(`MANAGE_ROLES`)
if(!perms) return message.reply(`:information_source: | **لا تملك الصلاحيات الكافيه**`)
let args = message.content.split(" ").slice(1)
if(!args.join(" ")) return message.channel.send(`${prefix}autorole set [ROLE NAME] \n .autorole toggle \n .info-autorole`)
let state = args[0]
if(!state.trim().toLowerCase() == 'toggle' || !state.trim().toLowerCase() == 'setrole') return message.reply(`Please type a right state, ${prefix}modlogs toggle/setrole [ROLE NAME]`)
if(state.trim().toLowerCase() == 'toggle') {
if(ar[message.guild.id].onoff === 'Off') return [message.channel.send(`${em1} | **تم تفعيل الاوتو رول**`), ar[message.guild.id].onoff = 'On']
if(ar[message.guild.id].onoff === 'On') return [message.channel.send(`${em1} | **تم الغاء التفعيل الاوتو رول**`), ar[message.guild.id].onoff = 'Off']
}
if(state.trim().toLowerCase() == 'set') {
let newRole = message.content.split(" ").slice(2).join(" ")
if(!newRole) return message.channel.semd(`${prefix}autorole set [ROLE NAME]`)
if(!message.guild.roles.find(`name`,newRole)) return message.channel.send(`:white_check_mark: | **تم**`)
ar[message.guild.id].role = newRole
message.channel.send(`**تم تحويل الرتبه الي : ${newRole}.**`)
}
  }
if(message.content === prefix + 'info-autorole') {
let perms = message.member.hasPermission(`MANAGE_GUILD`)
if(!perms) return message.reply(`:information_source: | **لا تملك الصلاحيات الكافيه**`)
var embed = new Discord.RichEmbed()
.addField(`Autorole : :sparkles:  `, `
State : __${ar[message.guild.id].onoff}__
Role : __${ar[message.guild.id].role}__`)
.setColor(`BLUE`)
message.channel.send({embed})
}
fs.writeFile("./SkyBot-Premium.json", JSON.stringify(ar), (err) => {
if (err) console.error(err)
});
}) */
 

 


const reportjson = JSON.parse(fs.readFileSync('./report.json' , 'utf8'));
 
client.on('message', message => {
           if (!message.channel.guild) return;
  
  let embed = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please provide a room name`);
  
  let embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Couldn't find this room, double check it`);
  
  let embed2 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`This command is only for servers`);
  
  let embed3 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`You Don't have \`MANAGE_GUILD\` permission`);
 
    let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setreport")) {
      
        if(!message.channel.guild) return message.channel.send(embed2)
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(embed3)
if(!room) return message.channel.send(embed)
if(!findroom) return message.channel.send(embed1)
let embed = new Discord.RichEmbed()
.setTitle('**Report command has been setuped**')
.setColor(embedSuccess)
.addField('Channel:', `${findroom}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
reportjson[message.guild.id] = {
channel: room,
}
fs.writeFile("./report.json", JSON.stringify(reportjson), (err) => {
if (err) console.error(err)
})
client.on('message', message => {
 
    if(message.content.startsWith(`${prefix}report`)) {
      
      
      let embed = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please mention a user`);
  
  let embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Couldn't find this room, double check it`);
  
  let embed2 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`This command is only for servers`);
  
  let embed3 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Make sure to write a reason`);
      
      let embed4 = new Discord.RichEmbed()
  .setColor(embedSuccess)
  .setDescription(`Your report has been sent`);
      
        let  user  =  message.mentions.users.first();
      if(!message.channel.guild) return message.channel.send(embed2)
    let reason = message.content.split(" ").slice(2);
      if(!user)  return  message.channel.send(embed)
      if(!reason) return message.channel.send(embed3)
    let findchannel = (message.guild.channels.find('name', `${reportjson[message.guild.id].channel}`))
    if(!findchannel) return message.channel.send(embed1)
      message.channel.send(embed4)
    let sugembed = new Discord.RichEmbed()
    .setTitle('New Report !')
    .addField('Report By:', `${message.author}`)
    .addField('Reported User:', `${user}`)
    .addField('Report Reason:', `${reason}`)
    .setFooter(client.user.username)
    findchannel.send({embed : sugembed})
        .then(function (message) {
          message.react('✅')
          message.react('❌')
        })
        .catch(err => {
            message.reply(`**انا لا اجد الروم**`)
            console.error(err);
        });
        }
      }
)}
})

const sug = JSON.parse(fs.readFileSync('./sug.json' , 'utf8'));
 
client.on('message', message => {
           if (!message.channel.guild) return;
   //wait wait do not do anything let me kk
    
    if(message.content.startsWith(prefix + "setsug")) {
      
      let args = message.content.split(" ").slice(1)
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':information_source: | **لا تملك الصلاحيات الكافيه**' );
            let room = args[0]
if(!room) return message.reply('**اكتب اسم الروم**')
      if(!message.guild.channels.find('name', args[0])) return message.reply('**لا يمكنني اجاد الروم**')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Suggest Code Has Been Setup**')
.addField('Channel:', room)
.addField('Requested By:', `${message.author}`)
.addField('Time now: ', `${moment(message.createdAt).format('D/MM/YYYY h:mm')}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
sug[message.guild.id] = {
channel: room,
}
fs.writeFile("./sug.json", JSON.stringify(sug), (err) => {
if (err) console.error(err)
})
   client.on('message', message => {
 
 
    
      })
    }else{
      if(message.content.startsWith(prefix+`suggest`)) {
        
      if(message.channel.type == "dm") return message.reply('**This Command Only For Servers**');
      let suggest = message.content.split(" ").slice(1).join(' ');
      if(!suggest) return message.reply(`**اكتب اقتراحك**`)
    let findchannel = (message.guild.channels.find('name', `${sug[message.guild.id].channel}`))
    if(!findchannel) return message.channel.send(`**انا لم اجد الروم**`)
    message.channel.send(`**تم ارسال اقتراحك**`)
    let sugembed = new Discord.RichEmbed()
    .setTitle('New Suggest !')
    .addField('Suggest By:', `${message.author}`)
    .addField('Suggest:', `${suggest}`)
    .setFooter(client.user.username)
    findchannel.sendEmbed(sugembed)
        .then(function (message) {
          message.react('✅')
          message.react('❌')
        })
        .catch(err => {
            message.reply(`**انا لا اجد الروم**`)
            console.error(err);
        });
        }
    }
})





client.on('message', message => {
  //ar prefix = ".";
  if (message.author.omar) return;
  
  let embed = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription("This commands is only for servers!");
  
  let embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`You Don't have \`KICK_MEMBERS\` permission`);
  
  let embed2 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`I Don't have \`KICK_MEMBERS\` permission`);
  
  let embed3 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Make sure to mention a user next time!`);
  
  let embed4 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Make sure to put my role above mentioned user role`);
  
  
  
  
  if (!message.content.startsWith(prefix)) return;
  var command = message.content.split(" ")[0];
  command = command.slice(prefix.length);
  var args = message.content.split(" ").slice(1);
  if (command == "kick") {
    
   if(!message.channel.guild) return message.channel.send(embed)
   const guild = message.guild;
  if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send(embed1)
  if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send(embed2)
  var user = message.mentions.users.first();
    if(user === message.author) return message.channel.send('**من جدك؟**')
  var reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.channel.send(embed3)
    if(message.guild.member(user).hasPermission("KICK_MEMBERS")) return message.channel.send(`${user} has \`KICK_MEMBERS\` permission so he can't be kicked`)
  message.channel.send(`**:white_check_mark: ${user.tag} اخذ كيك من سيرفر بواسطه : <@${message.author.id}> ! :airplane:** `)
  message.guild.member(user).kick({
    reason: reason
  })
  guild.owner.send(`سيرفر : ${guild.name}
**تم طرد** :${user.tag}  
**بواسطة** : <@${message.author.id}>`).then(()=>{
message.guild.member(user).kick();
  })
}
});
/* client.on('message', message => {
    if (message.content.startsWith("$" + 'dbc' )){
    if(!message.channel.guild) return;
    let args = message.content.split(' ').slice(1).join(' ')
      client.users.forEach(m =>{
      m.sendMessage(args)
      });
      }
    });*/
client.on('message', async message =>{
   // let em1 = client.guilds.get(emojis).emojis.find(r => r.name === "08");
const ms = require("ms");
  
  let embed = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription("Please specify a reason.");
  
  let embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`You Don't have \`MANAGE_ROLES\` permission`);
  
  let embed2 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`I Don't have \`MANAGE_ROLES\` permission`);
  
  let embed3 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Make sure to mention a user next time!`);
  
  let embed4 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Make sure to put my role above mentioned user role`);
  
  let embed5 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`I can not mute this user because this user have **MANAGE_ROLES** permission.`);
  
  let embed6 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Specify a time`);
  
  let embed7 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`This user is not muted.`);
  
  

  
   

var command = message.content.split(" ")[0];
command = command.slice(prefix.length);
var args = message.content.split(" ").slice(1);
    if(command == "mute") {
      
      if (message.author.omar) return;
if (!message.content.startsWith(prefix)) return;
if(message.channel.type == "dm") return;
      if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(embed2).then(msg => msg.delete(6000))
       if(!message.guild.member(message.author).hasPermission("MANAGE_ROLES")) return message.channel.send(embed1)
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.channel.send(embed3).then(m => m.delete(5000));
      if(tomute.hasPermission("MANAGE_ROLES")) return message.channel.send(embed5)
    let muterole = message.guild.roles.find(`name`, "Muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            CONNECT: false,
            SPEAK: false,
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.channel.send(embed6)
            let reasonargs = message.content.split(" ").slice(3)
    let reason = reasonargs.join(" ");
      if(!reason) return message.reply(embed);
      let embed8 = new Discord.RichEmbed()
  .setColor(embedSuccess)
  .setTitle(`UnMuted Member`)
      .addField('User: ', `${tomute.user.username}#${tomute.user.discriminator}`, true)
      .addField('Muted By: ', `${message.author.username}#${message.author.discriminator}`, true)
      .addField('Muted Time: ', `${args[1]}`, true)
      .addField('UnmuteReason: ', `Time is Over`, true)
      .addField('Reason: ', reason, true)
      .addField('Time Now: ', `${moment(message.createdAt).format('D/MM/YYYY h:mm')}`)
      .setFooter(client.user.username,client.user.avatarURL);
  
  let embed9 = new Discord.RichEmbed()
  .setColor(embedSuccess)
  .setTitle(`Muted User`)
  .setDescription(`User: <@${tomute.id}> ID(${tomute.id})\nMutedby: ${message.author.username}#${message.author.discriminator} ID(${message.author.id})\nReason: ${reason}\nDuration: ${ms(ms(mutetime))}\nTime now: ${moment(message.createdAt).format('D/MM/YYYY h:mm')}`, message.guild.name)
  
  
 
    await(tomute.addRole(muterole.id));
    message.channel.send(embed9);
    setTimeout(function(){
      if(!message.guild.member(tomute).roles.find('name', 'Muted')) return undefined;
            tomute.removeRole(muterole.id);
      message.channel.send(embed8);
    }, ms(mutetime));
 
 
 
  }
if(command === `unmute`) {
  
  if (message.author.omar) return;
if (!message.content.startsWith(prefix)) return;
if(!message.channel.guild) return message.channel.send(embed).then(m => m.delete(5000));
if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.reply(embed2).then(msg => msg.delete(6000))
    if(!message.guild.member(message.author).hasPermissions("MANAGE_ROLES")) return message.channel.send(embed1)

 
  let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!toMute) return message.channel.send(embed3);
 
  let role = message.guild.roles.find (r => r.name === "Muted");
 
  if(!role || !toMute.roles.has(role.id)) return message.channel.send(embed7)
  
  let embed8 = new Discord.RichEmbed()
  .setColor(embedSuccess)
  .setDescription(`<@${toMute.id}> unmuted`);
 
  await toMute.removeRole(role)
  message.channel.sendMessage(embed8);
 
  return;
 
  }
 
});



 
client.on('message', message => {
  var embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please specify a reason`);
  var embed2 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`I cant ban this user because this use have **BAN_MEMBERS** Permission.`);
  var embed3 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please specify a user`);
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "ban") {
    
               if(!message.channel.guild) return;
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return;
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return;
  var user = message.mentions.members.first();
  let reason = message.content.split(" ").slice(2).join(" ");
  if (message.mentions.users.size < 1) return message.channel.send(embed3);
  if(!reason) return message.reply (embed1);
  let userr = message.author;
  if(user.id == message.guild.owner.id) return message.channel.send('**من جدك؟**').then(message => {message.guild.owner.send(`${userr.username} ID (${userr.id}) tried to ban you from **${message.guild.name}**`)});
  if(message.guild.member(user).hasPermission("BAN_MEMBERS")) return message.channel.send(embed2);

  message.guild.member(user).ban(7, user);

  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User: **",  '**[ ' + `<@${user.id}>` + ' ]**')
  .addField("**Banned By:**", '**[ ' + `${message.author.username}` + ' ]**')
  .addField("**Reason:**", '**[ ' + `${reason}` + ' ]**')
  .addField("**Time Now: ", `**[ ${moment(message.createdAt).format('D/MM/YYYY h:mm')} ]**`)
  message.channel.send({
    embed : banembed
  })
}
});



client.on('message', message => {
  var embed1 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please specify a user`);
  var embed2 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please specify a reason`);
  var embed3 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`Please specify a time`);
  var embed4 = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription(`I cant ban this user because this user have **BAN_MEMBERS** Permission.`);
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(prefix.length);

  let args = message.content.split(" ").slice(1);

  if (command == "tempban") {
    
               if(!message.channel.guild) return;
  if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return;
  if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return;
   var user = message.mentions.users.first();
  let reason = message.content.split(" ").slice(3).join(" ");
  let bantime = args[1];
  if (message.mentions.users.size < 1) return message.channel.send(embed1);
    if(!bantime) return message.channel.send(embed3)
  if(!reason) return message.channel.send(embed2);
  let userr = message.author;
  if(user.id == message.guild.owner.id) return message.channel.send('**من جدك؟**').then(message => {message.guild.owner.send(`${userr.username} ID (${userr.id}) tried to ban you from **${message.guild.name}**`)});
  if(message.guild.member(user).hasPermission("BAN_MEMBERS")) return message.channel.send(embed4);

  message.guild.member(user).ban(7, user, {
    reason: reason,
  });

  const banembed = new Discord.RichEmbed()
  .setAuthor(`BANNED!`, user.displayAvatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .addField("**User: **",  '**[ ' + `<@${user.id}>` + ' ]**')
  .addField("**Banned By: **", '**[ ' + `${message.author.username}` + ' ]**')
  .addField("**Reason: **", '**[ ' + `${reason}` + ' ]**')
  .addField("**Banned time: **", bantime, true)
  .addField("**Time Now: **", `**[ ${moment(message.createdAt).format('D/MM/YYYY h:mm')} ]**`, true)
  message.channel.send({
    embed : banembed
  })
    setTimeout(function(){
            message.channel.send('**'+user.username+' has been unbanned for: Banned Time Is Over.**')
      message.guild.unban(user)
    }, ms(bantime))
    
}
});
 
 
client.on('message', message => {
        var  user = message.mentions.users.first() || message.author;
  let args = message.content.split(" ").slice(1)
    if (message.content === `${prefix}avatar`){
      
      var embed1 = new Discord.RichEmbed()
      .setTitle(`Avatar Link`)
      .setURL(user.avatarURL)
      .setImage(user.avatarURL)
	  if(user.avatarURL == null) {
		  message.channel.send('**Couldn\'t find the avatar of member **``'+user.username+'#'+user.discriminator+'``')
	  }else{
		  message.channel.send(embed1);
	  }
    }
     
});
 






/*

client.on('message', message => {
  //let em1 = client.guilds.get("569987960989155340").emojis.find(r => r.name === "partner");
  
	if(message.content === ".support")
    message.channel.send(`🎧 | **Support Server Link : [https://discord.gg/YfuEFJp] :link:**  `)
});
    
client.on('message', message => {
 // let em1 = client.guilds.get("569987960989155340").emojis.find(r => r.name === "partner");
   

	if(message.content === ".invite" || message.content === ".inv"){
		if(message.author.bot) return undefined;

    message.channel.send(`🎧 | **Bot Invite** : \nhttps://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
	}
});

*/




/*const welcome = JSON.parse(fs.readFileSync('./welcomer.json' , 'utf8')); 
client.on('message', message => {
  
    if(message.content.startsWith(prefix + "dmtoggle")) {
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!welcome[message.guild.id]) welcome[message.guild.id] = {
          dm: 'Off'
        }
          if(welcome[message.guild.id].dm === 'Off') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐍__ !**`), welcome[message.guild.id].dm = 'On']
          if(welcome[message.guild.id].dm === 'On') return [message.channel.send(`**The Welcome Dm Is __𝐎𝐅𝐅__ !**`), welcome[message.guild.id].dm = 'Off']
          fs.writeFile("./welcome.json", JSON.stringify(welcome), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            })
          }
          
        })

client.on('message', async message => {
    let messageArray = message.content.split(" ");
   if(message.content.startsWith(prefix + "setdmmsg")) {
             
    let filter = m => m.author.id === message.author.id;
    let thisMessage;
    let thisFalse;

    if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send('You don\'t have permission').then(msg => {
       msg.delete(4500);
       message.delete(4500);
    });
    
    message.channel.send(':pencil: **| من فضلك اكتب الرساله الان... :pencil2: **').then(msg => {

        message.channel.awaitMessages(filter, {
          max: 1,
          time: 90000,
          errors: ['time']
        })
  
                .then(collected => {
                    collected.first().delete();
                    msg.edit('✅ **| تم الاعداد بنجاح...  **').then(msg => {
        
                      message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 90000,
                        errors: ['time']
                      })
                      let embed = new Discord.RichEmbed()
                      .setTitle('**Done The Dm Msg Code Has Been Setup**')
                      .addField('Message:', `${thisMessage}`)
                      .setThumbnail(message.author.avatarURL)
                      .setFooter(`${client.user.username}`)
                     message.channel.sendEmbed(embed)
    welcome[message.guild.id] = {
        msg: thisMessage,
        onoff: 'On'
    }
    fs.writeFile("./welcomer.json", JSON.stringify(welcome), (err) => {
    if (err) console.error(err)
  })
   } 
            )
        })
    })
}
    })             

client.on("guildMemberAdd", member => {
                    if(!welcome[member.guild.id]) welcome[member.guild.id] = {
                  dm: 'Off'
                }
        if(welcome[member.guild.id].dm === 'Off') return;
  
  
  member.createDM().then(function (channel) {
  return channel.send(`welcome[message.guild.id].msg`) 
}).catch(console.error)
})

*/

const wlcjson = JSON.parse(fs.readFileSync('./wlc.json' , 'utf8'));
//Perfect log Code
client.on('message', message => {
let room = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + "setwlc")){ 
      
if (message.author.bot) return;
      if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
var findedroom = message.guild.channels.find('name', `${room}`);
    let embed = new Discord.RichEmbed()
.setTitle('**Done The Welcome Code Has Been Setup**')
.addField('Channel:', `${findedroom}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
wlcjson[message.guild.id] = {
channel: room,
onoff: 'On'
}
fs.writeFile("./wlc.json", JSON.stringify(wlcjson), (err) => {
if (err) console.error(err)
})
    }
})


client.on('message', message => {
  
    if(message.content.startsWith(prefix + "wlctoggle")) {
      
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!wlcjson[message.guild.id]) wlcjson[message.guild.id] = {
            onoff: 'Off',
        }
          if(wlcjson[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Welcome Is __𝐎𝐍__ !**`), wlcjson[message.guild.id].onoff = 'On']
          if(wlcjson[message.guild.id].onoff === 'On') return [message.channel.send(`**The Welcome Is __𝐎𝐅𝐅__ !**`), wlcjson[message.guild.id].onoff = 'Off']
          fs.writeFile("./wlc.json", JSON.stringify(wlcjson), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
         });
           })
          }
          
})

client.on('guildMemberAdd', member => {
    if(!wlcjson[member.guild.id]) wlcjson[member.guild.id] = {
        onoff: 'Off',
    }
if(wlcjson[member.guild.id].onoff === 'Off') return;
    const channel = member.guild.channels.find('name', `${wlcjson[member.guild.id].channel}`);
  
    const millis = new Date().getTime() - member.user.createdAt.getTime();
    const now = new Date();
    const createdAt = millis / 1000 / 60 / 60 / 24;
 moment.locale('ar-ly');
         var h = member.user;



  
    const embed = new Discord.RichEmbed()
    
    .setColor("black")
   .setThumbnail(h.avatarURL)
        .setAuthor(h.username,h.avatarURL)
        .addField(': The date of your account',`${moment(member.user.createdAt).format('D/M/YYYY h:mm a')} **\n** \`${moment(member.user.createdAt).fromNow()}\``,true)
         .setFooter(`${h.tag}`,"https://images-ext-2.discordapp.net/external/JpyzxW2wMRG2874gSTdNTpC_q9AHl8x8V4SMmtRtlVk/https/orcid.org/sites/default/files/files/ID_symbol_B-W_128x128.gif")
    .setAuthor(member.user.tag, member.user.avatarURL);
    channel.sendEmbed(embed);

           fs.writeFile("./wlc.json", JSON.stringify(wlcjson), (err) => {
            if (err) console.error(err)
            .catch(err => {
             console.error(err);
         })})
});


/*
const logjson = JSON.parse(fs.readFileSync('./logj.json' , 'utf8'));
//Perfect log Code
client.on('message', message => {
  let room = message.content.split(" ").slice(1);
    let findroom = message.guild.channels.find('name', `${room}`)
    if(message.content.startsWith(prefix + "setlog")){ 
        
if (message.author.bot) return;
      if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Log Code Has Been Setup**')
.addField('Channel:', `${findroom}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
logjson[message.guild.id] = {
channel: room, 
onoff: 'On'
}
fs.writeFile("./logj.json", JSON.stringify(wlcjson), (err) => {
if (err) console.error(err)
})
    }
})


client.on('message', message => {
  
    if(message.content.startsWith(prefix + "logtoggle")) {
      
        if(!message.channel.guild) return message.reply('**This Command Only For Servers**');
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
        if(!logjson[message.guild.id]) logjson[message.guild.id] = {
            onoff: 'Off',
        }
          if(logjson[message.guild.id].onoff === 'Off') return [message.channel.send(`**The Log Is __𝐎𝐍__ !**`), logjson[message.guild.id].onoff = 'On']
          if(logjson[message.guild.id].onoff === 'On') return [message.channel.send(`**The Log Is __𝐎𝐅𝐅__ !**`), logjson[message.guild.id].onoff = 'Off']
          fs.writeFile("./logj.json", JSON.stringify(logjson), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
         });
           })
          }
          
})
 const log = logjson;
 
client.on('messageDelete', message => {
 
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[message.guild.id]) log[message.guild.id] = {
          onoff: 'Off'
        }
    if(log[message.guild.id].onoff === 'Off') return;
    var logChannel = message.guild.channels.find(c => c.name === `${log[message.guild.id].channel}`);
    if(!logChannel) return;
 
    let messageDelete = new Discord.RichEmbed()
    .setTitle('**[MESSAGE DELETE]**')
    .setColor('RED')
    .setThumbnail(message.author.avatarURL)
    .setDescription(`**\n**:wastebasket: Successfully \`\`DELETE\`\` **MESSAGE** In ${message.channel}\n\n**Channel:** \`\`${message.channel.name}\`\` (ID: ${message.channel.id})\n**Message ID:** ${message.id}\n**Sent By:** <@${message.author.id}> (ID: ${message.author.id})\n**Message:**\n\`\`\`${message}\`\`\``)
    .setTimestamp()
    .setFooter(message.guild.name, message.guild.iconURL)
 
    logChannel.send(messageDelete);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
 
    if(oldMessage.author.bot) return;
    if(!oldMessage.channel.type === 'dm') return;
    if(!oldMessage.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldMessage.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return;
                        if(!log[oldMessage.guild.id]) log[oldMessage.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMessage.guild.id].onoff === 'Off') return;
    var logChannel = oldMessage.guild.channels.find(c => c.name === `${log[oldMessage.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldMessage.content.startsWith('https://')) return;
 
    let messageUpdate = new Discord.RichEmbed()
    .setTitle('**[MESSAGE EDIT]**')
    .setThumbnail(oldMessage.author.avatarURL)
    .setColor('BLUE')
    .setDescription(`**\n**:wrench: Successfully \`\`EDIT\`\` **MESSAGE** In ${oldMessage.channel}\n\n**Channel:** \`\`${oldMessage.channel.name}\`\` (ID: ${oldMessage.channel.id})\n**Message ID:** ${oldMessage.id}\n**Sent By:** <@${oldMessage.author.id}> (ID: ${oldMessage.author.id})\n\n**Old Message:**\`\`\`${oldMessage}\`\`\`\n**New Message:**\`\`\`${newMessage}\`\`\``)
    .setTimestamp()
    .setFooter(oldMessage.guild.name, oldMessage.guild.iconURL)
 
    logChannel.send(messageUpdate);
});
 
 
client.on('roleCreate', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleCreate = new Discord.RichEmbed()
        .setTitle('**[ROLE CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleCreate);
    })
});
client.on('roleDelete', role => {
 
    if(!role.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!role.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[role.guild.id]) log[role.guild.id] = {
          onoff: 'Off'
        }
    if(log[role.guild.id].onoff === 'Off') return;
    var logChannel = role.guild.channels.find(c => c.name === `${log[role.guild.id].channel}`);
    if(!logChannel) return;
 
    role.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let roleDelete = new Discord.RichEmbed()
        .setTitle('**[ROLE DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` Role.\n\n**Role Name:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(role.guild.name, role.guild.iconURL)
 
        logChannel.send(roleDelete);
    })
});
client.on('roleUpdate', (oldRole, newRole) => {
 
    if(!oldRole.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldRole.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[oldRole.guild.id]) log[oldRole.guild.id] = {
          onoff: 'Off'
            }
    if(log[oldRole.guild.id].onoff === 'Off') return;
    var logChannel = oldRole.guild.channels.find(c => c.name === `${log[oldRole.guild.id].channel}`);
    if(!logChannel) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldRole.name !== newRole.name) {
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateName = new Discord.RichEmbed()
            .setTitle('**[ROLE NAME UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Role Name.\n\n**Old Name:** \`\`${oldRole.name}\`\`\n**New Name:** \`\`${newRole.name}\`\`\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateName);
        }
        if(oldRole.hexColor !== newRole.hexColor) {
            if(oldRole.hexColor === '#000000') {
                var oldColor = '`Default`';
            }else {
                var oldColor = oldRole.hexColor;
            }
            if(newRole.hexColor === '#000000') {
                var newColor = '`Default`';
            }else {
                var newColor = newRole.hexColor;
            }
            if(log[oldRole.guild.id].onoff === 'Off') return;
            let roleUpdateColor = new Discord.RichEmbed()
            .setTitle('**[ROLE COLOR UPDATE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` **${oldRole.name}** Role Color.\n\n**Old Color:** ${oldColor}\n**New Color:** ${newColor}\n**Role ID:** ${oldRole.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldRole.guild.name, oldRole.guild.iconURL)
 
            logChannel.send(roleUpdateColor);
        }
    })
});
 
 
client.on('channelCreate', channel => {
 
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelCreate = new Discord.RichEmbed()
        .setTitle('**[CHANNEL CREATE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`CREATE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('GREEN')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelCreate);
    })
});
client.on('channelDelete', channel => {
    if(!channel.guild) return;
    if(!channel.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!channel.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[channel.guild.id]) log[channel.guild.id] = {
          onoff: 'Off'
        }
    if(log[channel.guild.id].onoff === 'Off') return;
    var logChannel = channel.guild.channels.find(c => c.name === `${log[channel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(channel.type === 'text') {
        var roomType = 'Text';
    }else
    if(channel.type === 'voice') {
        var roomType = 'Voice';
    }else
    if(channel.type === 'category') {
        var roomType = 'Category';
    }
 
    channel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        let channelDelete = new Discord.RichEmbed()
        .setTitle('**[CHANNEL DELETE]**')
        .setThumbnail(userAvatar)
        .setDescription(`**\n**:white_check_mark: Successfully \`\`DELETE\`\` **${roomType}** channel.\n\n**Channel Name:** \`\`${channel.name}\`\` (ID: ${channel.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setColor('RED')
        .setTimestamp()
        .setFooter(channel.guild.name, channel.guild.iconURL)
 
        logChannel.send(channelDelete);
    })
});
client.on('channelUpdate', (oldChannel, newChannel) => {
    if(!oldChannel.guild) return;
            if(!log[oldChannel.guild.id]) log[oldChannel.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldChannel.guild.id].onoff === 'Off') return;
    var logChannel = oldChannel.guild.channels.find(c => c.name === `${log[oldChannel.guild.id].channel}`);
    if(!logChannel) return;
 
    if(oldChannel.type === 'text') {
        var channelType = 'Text';
    }else
    if(oldChannel.type === 'voice') {
        var channelType = 'Voice';
    }else
    if(oldChannel.type === 'category') {
        var channelType = 'Category';
    }
 
    oldChannel.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldChannel.name !== newChannel.name) {
            let newName = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Name\n\n**Old Name:** \`\`${oldChannel.name}\`\`\n**New Name:** \`\`${newChannel.name}\`\`\n**Channel ID:** ${oldChannel.id}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newName);
        }
        if(oldChannel.topic !== newChannel.topic) {
            if(log[oldChannel.guild.id].onoff === 'Off') return;
            let newTopic = new Discord.RichEmbed()
            .setTitle('**[CHANNEL EDIT]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:wrench: Successfully Edited **${channelType}** Channel Topic\n\n**Old Topic:**\n\`\`\`${oldChannel.topic || 'NULL'}\`\`\`\n**New Topic:**\n\`\`\`${newChannel.topic || 'NULL'}\`\`\`\n**Channel:** ${oldChannel} (ID: ${oldChannel.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldChannel.guild.name, oldChannel.guild.iconURL)
 
            logChannel.send(newTopic);
        }
    })
});
 
 
client.on('guildBanAdd', (guild, user) => {
 
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
    var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let banInfo = new Discord.RichEmbed()
        .setTitle('**[BANNED]**')
        .setThumbnail(userAvatar)
        .setColor('DARK_RED')
        .setDescription(`**\n**:airplane: Successfully \`\`BANNED\`\` **${user.username}** From the server!\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(banInfo);
    })
});
client.on('guildBanRemove', (guild, user) => {
    if(!guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
            if(!log[guild.guild.id]) log[guild.guild.id] = {
          onoff: 'Off'
        }
    if(log[guild.guild.id].onoff === 'Off') return;
    var logChannel = guild.channels.find(c => c.name === `${log[guild.guild.id].channel}`);
    if(!logChannel) return;
 
    guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(userID === client.user.id) return;
 
        let unBanInfo = new Discord.RichEmbed()
        .setTitle('**[UNBANNED]**')
        .setThumbnail(userAvatar)
        .setColor('GREEN')
        .setDescription(`**\n**:unlock: Successfully \`\`UNBANNED\`\` **${user.username}** From the server\n\n**User:** <@${user.id}> (ID: ${user.id})\n**By:** <@${userID}> (ID: ${userID})`)
        .setTimestamp()
        .setFooter(guild.name, guild.iconURL)
 
        logChannel.send(unBanInfo);
    })
});
client.on('guildUpdate', (oldGuild, newGuild) => {
 
    if(!oldGuild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!oldGuild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
                if(!log[oldGuild.guild.id]) log[oldGuild.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldGuild.guild.id].onoff === 'Off') return;
    var logChannel = oldGuild.channels.find(c => c.name === `${log[oldGuild.guild.id].channel}`);
    if(!logChannel) return;
 
    oldGuild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(oldGuild.name !== newGuild.name) {
            let guildName = new Discord.RichEmbed()
            .setTitle('**[CHANGE GUILD NAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild name.\n\n**Old Name:** \`\`${oldGuild.name}\`\`\n**New Name:** \`\`${newGuild.name}\`\`\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(newGuild.name, oldGuild.iconURL)
 
            logChannel.send(guildName)
        }
        if(oldGuild.region !== newGuild.region) {
            if(log[newGuild.regon.guild.id].onoff === 'Off') return;
            let guildRegion = new Discord.RichEmbed()
            .setTitle('**[CHANGE GUILD REGION]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` The guild region.\n\n**Old Region:** ${oldGuild.region}\n**New Region:** ${newGuild.region}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL)
 
            logChannel.send(guildRegion);
        }
        if(oldGuild.verificationLevel !== newGuild.verificationLevel) {
            if(oldGuild.verificationLevel === 0) {
                var oldVerLvl = 'Very Easy';
            }else
            if(oldGuild.verificationLevel === 1) {
                var oldVerLvl = 'Easy';
            }else
            if(oldGuild.verificationLevel === 2) {
                var oldVerLvl = 'Medium';
            }else
            if(oldGuild.verificationLevel === 3) {
                var oldVerLvl = 'Hard';
            }else
            if(oldGuild.verificationLevel === 4) {
                var oldVerLvl = 'Very Hard';
            }
 
            if(newGuild.verificationLevel === 0) {
                var newVerLvl = 'Very Easy';
            }else
            if(newGuild.verificationLevel === 1) {
                var newVerLvl = 'Easy';
            }else
            if(newGuild.verificationLevel === 2) {
                var newVerLvl = 'Medium';
            }else
            if(newGuild.verificationLevel === 3) {
                var newVerLvl = 'Hard';
            }else
            if(newGuild.verificationLevel === 4) {
                var newVerLvl = 'Very Hard';
            }
            if(log[newGuild.region.guild.id].onoff === 'Off') return;
            let verLog = new Discord.RichEmbed()
            .setTitle('**[GUILD VERIFICATION LEVEL CHANGE]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`EDITED\`\` Guild Verification level.\n\n**Old Verification Level:** ${oldVerLvl}\n**New Verification Level:** ${newVerLvl}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldGuild.name, oldGuild.iconURL)
 
            logChannel.send(verLog);
        }
    })
});
client.on('guildMemberUpdate', (oldMember, newMember) => {
    if(!oldMember.guild) return;
                if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
    if(log[oldMember.guild.id].onoff === 'Off') return;
    var logChannel = oldMember.guild.channels.find(c => c.name === `${log[oldMember, newMember.guild.id].channel}`);
    if(!logChannel) return;
 
    oldMember.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL;
        var userTag = logs.entries.first().executor.tag;
 
        if(oldMember.nickname !== newMember.nickname) {
            if(oldMember.nickname === null) {
                var oldNM = '`اسمه الاصلي`';
            }else {
                var oldNM = oldMember.nickname;
            }
            if(newMember.nickname === null) {
                var newNM = '`اسمه الاصلي`';
            }else {
                var newNM = newMember.nickname;
            }
 
            let updateNickname = new Discord.RichEmbed()
            .setTitle('**[UPDATE MEMBER NICKNAME]**')
            .setThumbnail(userAvatar)
            .setColor('BLUE')
            .setDescription(`**\n**:spy: Successfully \`\`CHANGE\`\` Member Nickname.\n\n**User:** ${oldMember} (ID: ${oldMember.id})\n**Old Nickname:** ${oldMember.nickname}\n**New Nickname:** ${newNM}\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
            logChannel.send(updateNickname);
        }
        if(oldMember.roles.size < newMember.roles.size) {
            let role = newMember.roles.filter(r => !oldMember.roles.has(r.id)).first();
                            if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember.guild.id].onoff === 'Off') return;
            let roleAdded = new Discord.RichEmbed()
            .setTitle('**[ADDED ROLE TO MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('GREEN')
            .setDescription(`**\n**:white_check_mark: Successfully \`\`ADDED\`\` Role to **${oldMember.user.username}**\n\n**User:** <@${oldMember.id}> (ID: ${oldMember.user.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleAdded);
        }
        if(oldMember.roles.size > newMember.roles.size) {
            let role = oldMember.roles.filter(r => !newMember.roles.has(r.id)).first();
                            if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
            if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
            let roleRemoved = new Discord.RichEmbed()
            .setTitle('**[REMOVED ROLE FROM MEMBER]**')
            .setThumbnail(oldMember.guild.iconURL)
            .setColor('RED')
            .setDescription(`**\n**:negative_squared_cross_mark: Successfully \`\`REMOVED\`\` Role from **${oldMember.user.username}**\n\n**User:** <@${oldMember.user.id}> (ID: ${oldMember.id})\n**Role:** \`\`${role.name}\`\` (ID: ${role.id})\n**By:** <@${userID}> (ID: ${userID})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(roleRemoved);
        }
    })
    if(oldMember.guild.owner.id !== newMember.guild.owner.id) {
                    if(!log[oldMember.guild.id]) log[oldMember.guild.id] = {
          onoff: 'Off'
        }
        if(log[oldMember, newMember.guild.id].onoff === 'Off') return;
        let newOwner = new Discord.RichEmbed()
        .setTitle('**[UPDATE GUILD OWNER]**')
        .setThumbnail(oldMember.guild.iconURL)
        .setColor('GREEN')
        .setDescription(`**\n**:white_check_mark: Successfully \`\`TRANSFER\`\` The Owner Ship.\n\n**Old Owner:** <@${oldMember.user.id}> (ID: ${oldMember.user.id})\n**New Owner:** <@${newMember.user.id}> (ID: ${newMember.user.id})`)
        .setTimestamp()
        .setFooter(oldMember.guild.name, oldMember.guild.iconURL)
 
        logChannel.send(newOwner);
    }
});
 
 
client.on('voiceStateUpdate', (voiceOld, voiceNew) => {
 
    if(!voiceOld.guild.member(client.user).hasPermission('EMBED_LINKS')) return;
    if(!voiceOld.guild.member(client.user).hasPermission('VIEW_AUDIT_LOG')) return;
                    if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
    if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
    var logChannel = voiceOld.guild.channels.find(c => c.name === `${log[voiceOld, voiceNew.guild.id].channel}`);
    if(!logChannel) return;
 
    voiceOld.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userTag = logs.entries.first().executor.tag;
        var userAvatar = logs.entries.first().executor.avatarURL;
 
        if(voiceOld.serverMute === false && voiceNew.serverMute === true) {
            let serverMutev = new Discord.RichEmbed()
            .setTitle('**[VOICE MUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/pWQaw076OHwVIFZyeFoLXvweo0T_fDz6U5C9RBlw_fQ/https/cdn.pg.sa/UosmjqDNgS.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverMutev);
        }
        if(voiceOld.serverMute === true && voiceNew.serverMute === false) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverUnmutev = new Discord.RichEmbed()
            .setTitle('**[VOICE UNMUTE]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/u2JNOTOc1IVJGEb1uCKRdQHXIj5-r8aHa3tSap6SjqM/https/cdn.pg.sa/Iy4t8H4T7n.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUnmutev);
        }
        if(voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverDeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE DEAF]**')
            .setThumbnail('https://images-ext-1.discordapp.net/external/7ENt2ldbD-3L3wRoDBhKHb9FfImkjFxYR6DbLYRjhjA/https/cdn.pg.sa/auWd5b95AV.png')
            .setColor('RED')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverDeafv);
        }
        if(voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
                            if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
            if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
            let serverUndeafv = new Discord.RichEmbed()
            .setTitle('**[VOICE UNDEAF]**')
            .setThumbnail('https://images-ext-2.discordapp.net/external/s_abcfAlNdxl3uYVXnA2evSKBTpU6Ou3oimkejx3fiQ/https/cdn.pg.sa/i7fC8qnbRF.png')
            .setColor('GREEN')
            .setDescription(`**User:** ${voiceOld} (ID: ${voiceOld.id})\n**By:** <@${userID}> (ID: ${userID})\n**Channel:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannel.id})`)
            .setTimestamp()
            .setFooter(userTag, userAvatar)
 
            logChannel.send(serverUndeafv);
        }
    })
   
    if(voiceOld.voiceChannelID !== voiceNew.voiceChannelID && voiceNew.voiceChannel && voiceOld.voiceChannel != null) {
                        if(!log[voiceOld.guild.id]) log[voiceOld.guild.id] = {
          onoff: 'Off'
        }
        if(log[voiceOld, voiceOld.guild.id].onoff === 'Off') return;
        let voiceLeave = new Discord.RichEmbed()
        .setTitle('**[CHANGED VOICE ROOM]**')
        .setColor('GREEN')
        .setThumbnail(voiceOld.user.avatarURL)
        .setDescription(`**\n**:repeat: Successfully \`\`CHANGED\`\` The Voice Channel.\n\n**From:** \`\`${voiceOld.voiceChannel.name}\`\` (ID: ${voiceOld.voiceChannelID})\n**To:** \`\`${voiceNew.voiceChannel.name}\`\` (ID: ${voiceNew.voiceChannelID})\n**User:** ${voiceOld} (ID: ${voiceOld.id})`)
        .setTimestamp()
        .setFooter(voiceOld.user.tag, voiceOld.user.avatarURL)
 
        logChannel.send(voiceLeave);
    }
});
*/

client.on("message", message => {
    //var prefix = "."
    if (!message.content.startsWith(prefix)) return;
      let command = message.content.split(" ")[0];
      command = command.slice(prefix.length);
        if(command === "skin") {
                const args = message.content.split(" ").slice(1).join(" ")
        if (!args) return message.channel.send("**اكتب اسم السكن الي تبيه**");
        const image = new Discord.Attachment(`https://minotar.net/armor/body/${args}`, "skin.png");
    message.channel.send(image)
        }
    });

 




client.on("guildCreate",  guild => {
  let guildCreateChannel = client.channels.get("599556857555714048"); 
  
  
    
    let joinEmbed = new Discord.RichEmbed()
      .setThumbnail(guild.iconURL) // هنا هيديك صورة السيرفر
      .setAuthor(`${client.user.tag} Joined A Server ✅`)
    .setColor(embedSuccess)
      .setDescription(`**
 Server name: \`${guild.name}\`
 Server id: \`${guild.id}\`
 Server owner: ${guild.owner}
 Members Count: \`${guild.memberCount}\`
 Servers Counter : \`${client.guilds.size}\`**`)
      
    guildCreateChannel.send(joinEmbed);

}); //Toxic Codes

client.on("guildDelete",  guild => {
  let guildCreateDelete = client.channels.get("599556857555714048"); //ايدي الروم الي يكتب فية انو خر
  
  let leaveEmbed = new Discord.RichEmbed()
    .setThumbnail(guild.iconURL)
  .setAuthor(`${client.user.tag} left A Server :x:`)
  .setColor(embedFail)
  .setDescription(`**
 Server name: \`${guild.name}\`
 Server id: \`${guild.id}\`
 Server owner: ${guild.owner}
 Members Count: \`${guild.memberCount}\`
 Servers Counter : \`${client.guilds.size}\`**`)
  guildCreateDelete.send(leaveEmbed); //Toxic Codes
});





client.on('message', message => {
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
  
  let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy premium")
      
   //  if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
 if (message.member.hasPermission("MOVE_MEMBERS")) {//hi
 if (message.mentions.users.size === 0) {
   var embdo = new Discord.RichEmbed()
   .setColor(embedFail)
   .setDescription("عليك ان تمنشن شخص");
 return message.channel.send(embdo)
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
     var usermentioned = message.mentions.members.first().id;
var embed1 = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor(embedSuccess)
 .setDescription(`لقد قمت بسحب <@${usermentioned}> الى الروم الصوتي الخاص بك✅ `)
var embed2 = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor(embedColor)
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed1))
message.guild.members.get(usermentioned).send(embed2)
} else {
message.channel.send(" `يجب ان يكون هذه العضو في روم صوتي`")
}
} else {
 message.channel.send("**``يجب ان تكون في روم صوتي لكي تقوم بسحب العضو إليك``**")
}
} else {
message.react(":x:")
 }}});

//
//
//
//coins code
/*client.on('message', message => {
 if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let coinAmt = Math.floor(Math.random() * 12) + 1;
  let baseAmt = Math.floor(Math.random() * 12) + 1;
  console.log(`${coinAmt} ; ${baseAmt}`);

  if(message.author.bot) return;
  if(coinAmt === baseAmt){
    coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(baseAmt)
    };
  fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
    if (err) console.log(err)
  });
  
  }      
});

client.on('message', message => {
         if(message.content.startsWith(prefix + "cadd")) { 
           
  let args1 = message.content.split(" ").slice(1)
  if (args1 < 1) return message.reply("Write a number");
  if(!devs.includes(message.author.id)) return; else {
   coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(args1)
    };  
  }
           
          

message.channel.send(`You added __${args1}__ MCoins and now you have __${coins[message.author.id].coins}__**.**`)
     }  
})

client.on('message', message => {
         if(message.content.startsWith(prefix + "cremove")) { 
           
  let args1 = message.content.split(" ").slice(1)
  if (args1 < 1) return message.reply("Write a number");
  if(!devs.includes(message.author.id)) return; else
   coins[message.author.id] = {
      coins: coins[message.author.id].coins - parseInt(args1)
    };  

message.channel.send(`You removed __${args1}__ Coins and now you have __${coins[message.author.id].coins}__**.**`)
     }  
})

client.on('message', message => {
         if(message.content.startsWith(prefix + "cset")) { 
           
  let args1 = message.content.split(" ").slice(1)
  if (args1 < 1) return message.reply("Write a number");
  if(!devs.includes(message.author.id)) return; else
   coins[message.author.id] = {
      coins: coins[message.author.id].coins = parseInt(args1)
    };  

message.channel.send(`You set you MCoins to __${coins[message.author.id].coins}__**.**`)
     }  
})





client.on('message', message => {
 if(!tokens[message.author.id]){
    tokens[message.author.id] = {
      tokens: 0
    };
  }

  if(message.author.bot) return;
  
  let coinAmt = Math.floor(Math.random() * 90) + 30;
  let baseAmt = Math.floor(Math.random() * 90) + 30;
  console.log(`${coinAmt} ;; ${baseAmt}`);

  if(message.author.bot) return;
  if(coinAmt === baseAmt){
    tokens[message.author.id] = {
      tokens: tokens[message.author.id].tokens + parseInt(1)
    };
    
    let embed = new Discord.RichEmbed()
    
    .setColor("#22BF41")
    .setDescription(`You Found a \`Token\`
You now have \`${tokens[message.author.id].tokens}\` Tokens`)
    .setFooter(`Founded By: ${message.author.tag}`)
    
    message.channel.send(embed).then(msg => msg.delete(6000));
    
  fs.writeFile("./tokens.json", JSON.stringify(tokens), (err) => {
    if (err) console.log(err)
  });
  
  }      
}); */
client.on('message', async message => {
  
  if(message.author.bot) return undefined;
  if(message.channel.type == "dm") return undefined;
  
    if(message.content.startsWith(prefix + "user")){
		if(message.author.bot || message.channel.type == "dm") return undefined;
		let mnt = message.mentions.users.first();
        let user = mnt || message.author;
        let game;
        let avatar;
        let bott;
        if (user.presence.game !== null) {
            game = `${user.presence.game.name}`;
            } else {
            game = "NO GAME.";
            }
          if(user.avatarURL !== null){
            avatar = `Yes`
          }else{
            avatar = "No Avatar"
          }
          if(user.bot){
            bott = "Yes"
          }else{
            bott = "No"
          }
		let userEmbed = new Discord.RichEmbed()
		.setColor("RANDOM")
		.setThumbnail(user.avatarURL)
        .setAuthor(`${user.username}`)
        .addField('**Name : **', `[ ${user.tag} ]`, true)
        .addField('**Tag : **', `[ ${user.discriminator} ]`, true)
        .addField('**CreatedAt : **', `[ ${moment(user.createdAt).format('D/MM/YYYY h:mm a')} ]`, true)
        .addField('**Joined At : **', `[ ${moment(user.joinedAt).format('D/MM/YYYY h:mm a')} ]`, true)
        .addField('**ID : **', `[ ${user.id} ]`, true)
        .addField('**Playing : **', `[ ${game} ]`, true)
        .addField('**Avatar :**', `[ ${avatar} ]`, true)
        .addField('**Is a bot : **', `[ ${bott} ]`, true)
		.setFooter(message.client.user.username,message.client.user.avatarURL);
		message.channel.send(userEmbed).catch(console.error);
		
	}
    
})
/*
client.on('message', message => {
         if(message.content.startsWith(prefix + "tadd")) {
           
  let args1 = message.content.split(" ").slice(1)
  if (args1 < 1) return message.reply("Write a number");
 if(isNaN(args1[0])) return message.reply("This is not a number");
  if(!devs.includes(message.author.id)) return; else
   tokens[message.author.id] = {
      tokens: tokens[message.author.id].tokens + parseInt(args1)
    };  

message.channel.send(`You added __${args1}__ Tokens and now you have __${tokens[message.author.id].tokens}__**.**`)
     }  
})

client.on('message', message => {
         if(message.content.startsWith(prefix + "tremove")) { 
           
  let args1 = message.content.split(" ").slice(1)
  if (args1 < 1) return message.reply("Write a number");
 if(isNaN(args1[0])) return message.reply("This is not a number");
  if(!devs.includes(message.author.id)) return; else
   tokens[message.author.id] = {
      tokens: tokens[message.author.id].tokens - parseInt(args1)
    };  

message.channel.send(`You removed __${args1}__ Tokens and now you have __${tokens[message.author.id].tokens}__**.**`)
     }  
})

client.on('message', message => {
         if(message.content.startsWith(prefix + "tset")) { 
           
  let args1 = message.content.split(" ").slice(1)
  if (args1 < 1) return message.reply("Write a number");
 if(isNaN(args1[0])) return message.reply("This is not a number");
  if(!devs.includes(message.author.id)) return; else
   tokens[message.author.id] = {
      tokens: tokens[message.author.id].tokens = parseInt(args1)
    };  

message.channel.send(`You set you Tokens to __${tokens[message.author.id].tokens}__**.**`)
     }  
})
*/





//
//
//
//ticket code

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}




const setc = require("./setc.json")
const setrole = require("./setrole.json")
let tchannels  = [];
let current    = 0;
/*client.on("message", message => {
  let args = message.content.split(" ");
  if(message.content === prefix + 'mtickets')
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`${emojis.wrong}, **أنت لست من ادارة السيرفر لتنفيذ هذا الأمر.**`);
		if(args[1] && args[1].toLowerCase() === "enable") {
			mtickets = true;
			message.channel.send(`:white_check_mark:, **تم تفعيل التكتات , الاَن يمكن لأعضاء السيرفر استخدام امر انشاء التكت**`);
		} else if(args[1] && args[1].toLowerCase() === "disable") {
			mtickets = false;
			message.channel.send(`:white_check_mark:, **تم اغلاق نظام التكتات , الاَن لا يمكن لأي عضو استخدام هذا الأمر**`);
		} else if(!args[1]) {
			if(mtickets === true) {
			mtickets = false;
			message.channel.send(`:white_check_mark:, **تم اغلاق نظام التكتات , الاَن لا يمكن لأي عضو استخدام هذا الأمر**`);
			} else if(mtickets === false) {
			mtickets = true;
			message.channel.send(`:white_check_mark:, **تم تفعيل التكتات , الاَن يمكن لأعضاء السيرفر استخدام امر انشاء التكت**`);
			}
		}
})
*/

client.on("message", async message => {
   
	
  if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	if(message.content.toLowerCase().startsWith(prefix + `setcategory`)){
    
	if(!setc[message.guild.id]) setc[message.guild.id] = {
    category: "Tickets"
}

		const category = setc[message.guild.id].category
		let newcategory = message.content.split(' ').slice(1).join(' ');
		let thiscategory = message.guild.categories.find('name', newcategory);
                let fltrc = message.guild.channels.filter(m => m.name === newcategory).type !== 'category';
 if(!setrole[message.guild.id]) setrole[message.guild.id] = {
    role: "Support Team"
}
    const role = setrole[message.guild.id].role
    const srole = setrole[message.guild.id].role
    let thisrole = message.member.roles.find("name", srole);
	 const d11x1xx = new Discord.RichEmbed()
     .setDescription(`:x: You do not have permission for that command! If you believe this is a mistake please add the role called \`\`${srole}\`\` to yourself.`)  
     .setColor(embedFail);
	if(!thisrole) return message.channel.send(d11x1xx);
     const NOTX1 = new Discord.RichEmbed()
     .setDescription(`:x: Usage: \`\`${prefix}setcategory <name>\`\``)  
     .setColor(embedFail);
	if(!newcategory) return message.channel.send(NOTX1);
		  const CANT = new Discord.RichEmbed()
     .setDescription(`:x: I can't find this category \`\`${newcategory}\`\``)  
     .setColor(embedFail);
		if(!thiscategory) return message.channel.send(CANT);
	const filtr = new Discord.RichEmbed()
     .setDescription(`:x: This not a category \`\`${newcategory}\`\``)  
     .setColor(embedFail);
		if(fltrc) return message.channel.send(filtr);
	  setc[message.guild.id].category = newcategory	
		  const D1 = new Discord.RichEmbed()
     .setDescription(`:white_check_mark: The tickets category has been set to \`\`${newcategory}\`\``)  
     .setColor(embedSuccess);
	message.channel.send(D1);
		
	}
});


client.on("message", async message => {
		 
  if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	if(message.content.toLowerCase().startsWith(prefix + `setrole`)){
    
	if(!setrole[message.guild.id]) setrole[message.guild.id] = {
    role: "Support Team"
}

		const role = setrole[message.guild.id].role
		let newrole = message.content.split(' ').slice(1).join(' ');
		let thisrole = message.guild.roles.find('name', newrole);
		let permission = message.guild.member(message.author).hasPermissions('ADMINISTRATOR');
		 const d11x1x42x = new Discord.RichEmbed()
     .setDescription(`:x: You do not have permission for that command! If you believe this is a mistake please add a high role has \`\`ADMINISTRATOR\`\` permission to yourself.`)  
     .setColor(embedFail);
     if(!permission) return message.channel.send(d11x1x42x);
     const NOTX1 = new Discord.RichEmbed()
     .setDescription(`:x: Usage: \`\`${prefix}setrole <name>\`\``)  
     .setColor(embedFail);
	if(!newrole) return message.channel.send(NOTX1);
		  const CANT = new Discord.RichEmbed()
     .setDescription(`:x: I can't find this role \`\`${newrole}\`\``)  
     .setColor(embedFail);
		if(!thisrole) return message.channel.send(CANT);
	  setrole[message.guild.id].role = newrole	
		  const D1 = new Discord.RichEmbed()
     .setDescription(`:white_check_mark: The tickets role has been set to \`\`${newrole}\`\``)  
     .setColor(embedSuccess);
	message.channel.send(D1);
		
	}
});

client.on("message", async message => {
	 
  if (!message.content.startsWith(prefix) || message.author.bot) return;
if(message.content.toLowerCase().startsWith(prefix + `new`)) {
  if(!setc[message.guild.id]) setc[message.guild.id] = {
    category: "Tickets"
}

    const category = setc[message.guild.id].category
    const scategory = setc[message.guild.id].category
   let thiscategory = message.guild.channels.find('name', scategory);
 if(!setrole[message.guild.id]) setrole[message.guild.id] = {
    role: "Support Team"
}
    const role = setrole[message.guild.id].role
    const srole = setrole[message.guild.id].role
   let thisrole = message.guild.roles.find('name', srole);
   let subject = message.content.split(' ').slice(1).join(' '); 
  var numbers = [1, 2, 3, 4];
   //let ticketnumber = message.author.username
   current++;
	if(!subject[0]){
            
			     const rerole = new Discord.RichEmbed()
     .setDescription(`:x: Please first make a role called exactly \`\`${srole}\`\` | Or do \`\`.setrole rolename\`\``)  
     .setColor(embedFail);		    
        if (!thisrole) return message.channel.send(rerole);
	          const already = new Discord.RichEmbed()
     .setDescription(":x: You can only have \`\`1\`\` ticket in this server! you already have \`\`1\`\`")  
     .setColor("22BF41");
        message.guild.createChannel(`ticket-${current}`, "text").then(ticketx => {
		ticketx.setParent(thiscategory);
            let role = message.guild.roles.find("name", srole);
            let role2 = message.guild.roles.find("name", "@everyone");
            ticketx.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });   
            ticketx.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            ticketx.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true

            }); 
	
		
	    const d1 = new Discord.RichEmbed()
     .setDescription(`:white_check_mark: Your ticket has been created <#${ticketx.id}>`)  
     .setColor(embedSuccess)
            message.channel.send(d1);
            const nonedear = new Discord.RichEmbed()
     .setDescription(`Dear ${message.author}, \n\nThank you for reaching out to our support team!\n\nWe will get back to you as soon as possible\n\n`) 
     .addField('Subject' , `No subject has been given`)
     .setColor(embedColor)
     .setFooter(`${client.user.username}` , client.user.avatarURL)
     .setTimestamp();
            ticketx.send({embed: nonedear });
        }).catch(console.error);

	}
	

  
 if(subject[0]){
            
 const rerole = new Discord.RichEmbed()
     .setDescription(`:x: Please first make a role called exactly \`\`${srole}\`\``)  
     .setColor(embedFail);		    
        if (!thisrole) return message.channel.send(rerole);
	          const already = new Discord.RichEmbed()
     .setDescription(":x: You can only have \`\`1\`\` ticket in this server! you already have \`\`1\`\`")  
     .setColor("22BF41");
        message.guild.createChannel(`ticket-${current}`, "text").then(ticketx => {
	       ticketx.setParent(thiscategory);
            let role = message.guild.roles.find("name", srole);
            let role2 = message.guild.roles.find("name", "@everyone");
            ticketx.overwritePermissions(role, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true
            });   
            ticketx.overwritePermissions(role2, {
                SEND_MESSAGES: false,
                READ_MESSAGES: false
            });
            ticketx.overwritePermissions(message.author, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true

            }); 
		
	    const d1 = new Discord.RichEmbed()
     .setDescription(`:white_check_mark: Your ticket has been created <#${ticketx.id}>`)  
     .setColor(embedSuccess)
            message.channel.send(d1);
            const nonedear = new Discord.RichEmbed()
     .setDescription(`Dear ${message.author}, \n\nThank you for reaching out to our support team!\n\nWe will get back to you as soon as possible\n\n`) 
     .addField('Subject' , subject)
     .setColor(embedColor)
     .setFooter(`${client.user.username}` , client.user.avatarURL)
     .setTimestamp();
            ticketx.send({embed: nonedear });
        }).catch(console.error);

	  }  
}

if(message.content.toLowerCase().startsWith(prefix + `close`)) {	

	 const d11x1xx = new Discord.RichEmbed()
     .setDescription(":x: You do not have permission for that command! If you believe this is a mistake please add the role called \`\`● Élite » Team\`\` to yourself.")  
     .setColor(embedFail);
	
		 const d11x1xxNOT = new Discord.RichEmbed()
     .setDescription(":x: You only can run this command in a ticket channel!")  
     .setColor(embedFail);
	if (!message.channel.name.startsWith("ticket-")) return message.channel.send(d11x1xxNOT);
	 const yes = new Discord.RichEmbed()
     .setDescription(`:x: Are you sure you want close this ticket? The messages will be gone\nsend \`\`${prefix}close\`\` again to close the ticket.\nYour request will be voided in 20 seconds.`)  
     .setColor(embedColor);

    message.channel.send(yes)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '.close', {
        max: 1,
        time: 20000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        }) 
       .catch(() => {
	      const yesw = new Discord.RichEmbed()
     .setDescription(`:x: Ticket close timed out, the ticket was not closed.`)  
     .setColor(embedFail);
          m.edit(yesw).then(m2 => {
             m2.delete();
          }, 7000);
        });
    });
  }
  
});
                        
client.on('message', message => {
  if (message.content.toLowerCase().startsWith(prefix + `add`)) { 
    

    let noperm = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription(":x: ليس لديك الصلاحيات الكافية");
    
    var perm = message.guild.member(message.author).hasPermissions('MANAGE_ROLES');
    if(!perm) return message.channel.send(noperm)
    if (!message.channel.name.startsWith(`ticket-`)) {
    const embed4 = new Discord.RichEmbed()
    .setColor(embedFail)
    .addField(`${client.user.username}`, `You can't use the this outside of a ticket channel.`)
    message.channel.send({ embed: embed4 });
    return
    }
    const nothere = new Discord.RichEmbed() 
    .setColor(embedFail)
    .addField(`${client.user.username}`, 'Please Mention a User Or Bot');
    
    let addedmember = message.mentions.members.first();
    if (!addedmember) return message.channel.send(nothere)
 
    message.channel.overwritePermissions(addedmember, { SEND_MESSAGES : true, VIEW_CHANNEL : true});
    const embed5 = new Discord.RichEmbed()
    .setColor(embedSuccess)
    .addField(`${client.user.username}`, '**' + addedmember + `** has been added to the ticket. Remove with [${prefix}remove]().`)
    message.channel.send({ embed: embed5 });

  }

  if (message.content.toLowerCase().startsWith(prefix + `remove`)) {
    

    let noperm = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription(":x: ليس لديك الصلاحيات الكافية");
    
    var perm = message.guild.member(message.author).hasPermissions('MANAGE_ROLES');
    if(!perm) return message.channel.send(noperm)
    if (!message.channel.name.startsWith(`ticket-`)) {
    const embed6 = new Discord.RichEmbed()
    .setColor(embedFail)
    .addField(`${client.user.username}`, `You can't use the this outside of a ticket channel.`)
    message.channel.send({ embed: embed6 });
    return
    }
    const nothere = new Discord.RichEmbed() 
    .setColor(embedFail)
    .addField(`${client.user.username}`, 'Please Mention a User Or Bot');
    let removedmember = message.mentions.members.first();
    if (!removedmember) return message.channel.send(nothere)
 
    message.channel.overwritePermissions(removedmember, { SEND_MESSAGES : false, VIEW_CHANNEL : false});
    const embed7 = new Discord.RichEmbed()
    .setColor(embedSuccess)
    .addField(`${client.user.username}`, '**' + removedmember + '** has been removed from the ticket.')
    message.channel.send({ embed: embed7 });
  }
  
  if (message.content.toLowerCase().startsWith(prefix + `forceclose`)) {

    let noperm = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription(":x: ليس لديك الصلاحيات الكافية");
    
    var perm = message.guild.member(message.author).hasPermissions('MANAGE_ROLES');
    if(!perm) return message.channel.send(noperm)
    
    if (!message.channel.name.startsWith(`ticket-`)) {
    const embed8 = new Discord.RichEmbed()
    .setColor(embedFail)
    .addField(`${client.user.username}`, `You can't use the this outside of a ticket channel.`)
    message.channel.send({ embed: embed8 });
    return
    }   
      else message.channel.delete()
    }
  
      if (message.content.toLowerCase().startsWith(prefix + `rename`)) {
        
        let noperm = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription(":x: ليس لديك الصلاحيات الكافية");
    
    var perm = message.guild.member(message.author).hasPermissions('MANAGE_ROLES');
    if(!perm) return message.channel.send(noperm)
        var args = message.content.split(' ');
        if(!args[1]) return message.channel.send('**ااكتب اسم الروم الجديد**')
    if (!message.channel.name.startsWith(`ticket-`)) {
     
    const embed8 = new Discord.RichEmbed()
    .setColor(embedFail)
    .addField(`${client.user.username}`, `You can't use the this outside of a ticket channel.`)
    message.channel.send({ embed: embed8 });
    return
    }  
      else message.channel.setName(`ticket-${args[1]}`)
        var donere = new Discord.RichEmbed()
        .setColor(embedSuccess)
        .addField(`${client.user.username}`, `\`${args[1]}\` تم تغيير اسم الروم الى`)
      message.channel.send(donere)  
      }                    
  
})

/*client.on('message', message => {
 if(message.content === prefix + 'allclose')
   var iq = 0;
		for(let q = 0; q < tchannels.length; q++) {
			let c = message.guild.channels.get(tchannels[q]);
			if(c) {
				c.delete();
				tchannels.splice( tchannels[q], 1 );
				iq++;
			}
			if(q === tchannels.length - 1 || q === tchannels.lengh + 1) {
				message.channel.send(`:white_check_mark:, **تم مسح \`${iq}\` من التكتات.**`);
			}
		}
})
*/

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)

//
//
//
//
//level code
//const xp = JSON.parse(fs.readFileSync('./xp.json' , 'utf8'));
//client.on('message', message => {
//let xpAdd = Math.floor(Math.random() * 7) + 8;
//console.log(xpAdd);

//if (!xp[message.author.id]) {
   // xp[message.author.id] = {
       // xp: 0,
       // level: 1
   // };
//}


//let curxp = xp[message.author.id].xp;
//let curlvl = xp[message.author.id].level;
//let nxtLvl = xp[message.author.id].level * 300;
//xp[message.author.id].xp = curxp + xpAdd;
//if (nxtLvl <= xp[message.author.id].xp) {
   // xp[message.author.id].level = curlvl + parseInt(1);
   // let lvlup = new Discord.RichEmbed()
       // .setTitle("Level Up!")
       // .addField("Congrats to", `${message.author}`)
       // .setColor("#08ff00")
       // .addField("New Level", curlvl + parseInt(1));

   // message.channel.send(lvlup).then(msg => {
       // msg.delete(5000)
    //});
//}
//fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
            //if (err) console.log(err)
   // })
  //})

client.on('message',message =>{
    if(message.content.startsWith(prefix + 'topinvites')) {
      
  message.guild.fetchInvites().then(i =>{
  var invites = [];
   
  i.forEach(inv =>{
    var [invs,i]=[{},null];
     
    if(inv.maxUses){
        invs[inv.code] =+ inv.uses+"/"+inv.maxUses;
    }else{
        invs[inv.code] =+ inv.uses;
    }
        invites.push(`invite: ${inv.url} inviter: ${inv.inviter} \`${invs[inv.code]}\`;`);
   
  });
  var embed = new Discord.RichEmbed()
  .setColor("#000000")
  .setDescription(`${invites.join(`\n`)+'\n\n**By:** '+message.author}`)
           message.channel.send({ embed: embed });
   
  });
   
    }
  });




client.on('message', message => {
if(message.content === prefix + 'invite-info') {
		let oi = message.mentions.users.first() ? message.mentions.users.first().id : message.author.id;
		let Tag = message.mentions.users.first() ? message.mentions.users.first().tag : message.author.tag;
		let Username = message.mentions.users.first() ? message.mentions.users.first().username : message.author.username;
		let Avatar = message.mentions.users.first() ? message.mentions.users.first().avatarURL : message.author.avatarURL;
		
		message.guild.fetchInvites().then(invs => {
			let member = client.guilds.get(message.guild.id).members.get(oi);
			let personalInvites = invs.filter(i => i.inviter.id === oi);
			let urll = invs.filter(i => i.inviter.id === oi);
			let link = urll.reduce((p , v) => v.url +` , Total de membros recrutados no convite: ${v.uses}.\n`+ p, `\nServidor: ${message.guild.name} \n `);
			let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
			let inviteCode = personalInvites.reduce((p, v) => v.code);
			let possibleInvites = [['Total de membros recrutados:']];
			possibleInvites.push([inviteCount, inviteCode]);
			let user = message.mentions.users.first() || message.author;
			let mem = message.guild.member(user);
			let millisJoined = new Date().getTime() - mem.joinedAt.getTime();
			let daysJoined = millisJoined / 1000 / 60 / 60 / 24;
			
			var inviteInfo = new Discord.RichEmbed()
			.setTitle(`:incoming_envelope: **[INVITE INFO]** ${Username}`)
			.setThumbnail(client.user.avatarURL)
			.addField('**الدعوات**', `** ↝** [ شخص **${Number(inviteCount)}** ]`)
			.addField('**تم الانضمام للسيرفر من**', `** ↝** [ يوم **${daysJoined.toFixed(0)}** ]`)
			.addField('**رابط دعوة الانضمام**', `** ↝** [ **${inviteCode || 'Zm2U6we'}** ]`)
			.setColor('#36393e')
			.setTimestamp()
			.setFooter(Tag, Avatar)
			
			message.channel.send(inviteInfo);
    })
			
                                      
                                      
                                      };
});

/*
var cooldownGames = new Set();
var cooldownSurvival = new Set();
var cooldownSetName = new Set();
client.on('message', message => {
    //let em1 = client.guilds.get(emojis).emojis.find(r => r.name === "09");
     // let em2 = client.guilds.get(emojis).emojis.find(r => r.name === "02");
 // let em3 = client.guilds.get(emojis).emojis.find(r => r.name === "08");

  let em1 = ":x:"
  let em2 = ":white_check_mark:"
  let em3 = ":x:"
  
  var games = JSON.parse(fs.readFileSync('./games/games.json', 'utf8'));
	var muf = message.mentions.users.first();
  var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.split(' ');
	var args1 = message.content.split(' ').slice(1).join(' ');
	var args2 = message.content.split(' ')[2];
	var args3 = message.content.split(' ').slice(3).join(' ');
	if(!games[message.author.id]) games[message.author.id] = {
		laz: 0,
		fkk: 0,
		fast: 0,
		emoji: 0,
		flag: 0,
		math: 0,
	};
	
	if(command == prefix + 'لغز') {
		let type = require('./qlaz.json');
		let item = type[Math.floor(Math.random() * type.length)];
		let filter = response => {
		return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		var lazPoints = games[message.author.id].laz;
		var fkkPoints = games[message.author.id].fkk;
		var fastPoints = games[message.author.id].fast;
		var emojiPoints = games[message.author.id].emoji;
		var flagPoints = games[message.author.id].flag;
		var mathPoints = games[message.author.id].math;
		var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
		
		if(cooldownGames.has(message.author.id)) return message.reply(`${em2} | **جاوب على السؤال اولا**`);
		cooldownGames.add(message.author.id);
		
		let qLaz = new Discord.RichEmbed()
		.setTitle('')
		.setDescription(`اسرع واحد يقوم بحل اللغز التالي:\n\n ↝ **${item.type}**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTimestamp()
		.setFooter(``)
		
		message.channel.send(qLaz).then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
			.then((collected) => {
				let won = collected.first().author;
				games[won.id].laz++;
        var radmo = Math.floor(Math.random() * 25) + 15
        coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(radmo)
    };  
        
        var embd = new Discord.RichEmbed()
        .setTitle("اجابة صحيحة")
        .setColor('#36393e')
        .addField("مجموع نقاطك الآن", `\`${allPoints + 1}\``)
        .addField("لقد تم اعطائك", `\`${radmo}\` Coins`)
        .setTimestamp()
        .setFooter(`Winner: ${message.author.tag}`)
        message.channel.send(embd)
        
				cooldownGames.delete(message.author.id);
				fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
					if(err) console.error(err)
				})
			})
			.catch(collected => {
				message.channel.send(`:${em1} | **لم يقم احد بحل اللغز بالوقت المناسب**`);
				cooldownGames.delete(message.author.id);
			})
		})
	}
	if(command == prefix + 'فكك') {
		let type = require('./qfkk.json');
		let item = type[Math.floor(Math.random() * type.length)];
		let filter = response => {
		return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		var lazPoints = games[message.author.id].laz;
		var fkkPoints = games[message.author.id].fkk;
		var fastPoints = games[message.author.id].fast;
		var emojiPoints = games[message.author.id].emoji;
		var flagPoints = games[message.author.id].flag;
		var mathPoints = games[message.author.id].math;
		var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
		
		if(cooldownGames.has(message.author.id)) return message.reply(`${em1} | **جاوب على السؤال اولا**`);
		cooldownGames.add(message.author.id);
		
		let qFkk = new Discord.RichEmbed()
	  .setTitle('سؤال فكك') 
		.setDescription(`اسرع واحد يكتب الجملة التالية:\n\n ↝ **${item.type}**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTimestamp()
		.setFooter('')
		
		message.channel.send(qFkk).then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
			.then((collected) => {
				let won = collected.first().author;
				games[won.id].fkk++;
        var radmo = Math.floor(Math.random() * 25) + 15
        coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(radmo)
    };  
        var embd = new Discord.RichEmbed()
        .setTitle("اجابة صحيحة")
        .setColor('#36393e')
        .addField("مجموع نقاطك الآن", `\`${allPoints + 1}\``)
        .addField("لقد تم اعطائك", `\`${radmo}\` Coins`)
        .setTimestamp()
                .setFooter(`Winner: ${message.author.tag}`)

        message.channel.send(embd)
				cooldownGames.delete(message.author.id);
				fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
					if(err) console.error(err)
				})
			})
			.catch(collected => {
				message.channel.send(`${em1} | **لم يقم احد بتفكيك الكلمة بالوقت المناسب**`);
				cooldownGames.delete(message.author.id);
			})
		})
	}
	if(command == prefix + 'اسرع') {
		let type = require('./qfast.json');
		let item = type[Math.floor(Math.random() * type.length)];
		let filter = response => {
		return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		var lazPoints = games[message.author.id].laz;
		var fkkPoints = games[message.author.id].fkk;
		var fastPoints = games[message.author.id].fast;
		var emojiPoints = games[message.author.id].emoji;
		var flagPoints = games[message.author.id].flag;
		var mathPoints = games[message.author.id].math;
		var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
		
		if(cooldownGames.has(message.author.id)) return message.reply(`${em2} |**جاوب على السؤال اولا**`);
		cooldownGames.add(message.author.id);
		
		let qFast = new Discord.RichEmbed()
		.setTitle('سؤال سرعة')
		// .setDescription(`اسرع واحد يكتب الجملة التالية:\n\n ↝ **${item.type}**`)
		.addField("اسرع واحد يكتب الجملة التالية", item.type)
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTimestamp()
		.setFooter(`${message.author.tag} تم الطلب بواسطة `)
		
		message.channel.send(qFast).then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time'] })
			.then((collected) => {
				let won = collected.first().author;
        
				games[won.id].fast++;
        var radmo = Math.floor(Math.random() * 25) + 15
        coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(radmo)
    };  
var embd = new Discord.RichEmbed()
        .setTitle("اجابة صحيحة")
        .setColor('#36393e')
        .addField("مجموع نقاطك الآن", `\`${allPoints + 1}\``)
        .addField("لقد تم اعطائك", `\`${radmo}\` Coins`)
        .setTimestamp()
        .setFooter(`Winner: ${message.author.tag}`)

        message.channel.send(embd)
        cooldownGames.delete(message.author.id);
				fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
					if(err) console.error(err)
				})
			})
			.catch(collected => {
				message.channel.send(`${em1} | **لم يقم احد بكتابة الجملة بالوقت المناسب**`);
				cooldownGames.delete(message.author.id);
			})
		})
	}
	if(command == prefix + 'ايموجي') {
		let type = require('./qemoji.json');
		let item = type[Math.floor(Math.random() * type.length)];
		let filter = response => {
		return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		var lazPoints = games[message.author.id].laz;
		var fkkPoints = games[message.author.id].fkk;
		var fastPoints = games[message.author.id].fast;
		var emojiPoints = games[message.author.id].emoji;
		var flagPoints = games[message.author.id].flag;
		var mathPoints = games[message.author.id].math;
		var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
		
		if(cooldownGames.has(message.author.id)) return message.reply(`${em2} | **جاوب على السؤال اولا**`);
		cooldownGames.add(message.author.id);
		
		let qEmoji = new Discord.RichEmbed()
		.setTitle('')
		.setDescription(`اسرع واحد يقوم بكتابة اسم الايموجي التالي:`)
		.setImage(item.type)
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTimestamp()
		.setFooter('')
		
		message.channel.send(qEmoji).then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
			.then((collected) => {
				let won = collected.first().author;
				games[won.id].emoji++;
        var radmo = Math.floor(Math.random() * 25) + 15
        coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(radmo)
    };  
var embd = new Discord.RichEmbed()
        .setTitle("اجابة صحيحة")
        .setColor('#36393e')
        .addField("مجموع نقاطك الآن", `\`${allPoints + 1}\``)
        .addField("لقد تم اعطائك", `\`${radmo}\` Coins`)
        .setTimestamp()
        .setFooter(`Winner: ${message.author.tag}`)

        message.channel.send(embd)
        cooldownGames.delete(message.author.id);
				fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
					if(err) console.error(err)
				})
			})
			.catch(collected => {
				message.channel.send(`${em1} | **لم يقم احد بكتابة اسم الايموجي بالوقت المناسب**`);
				cooldownGames.delete(message.author.id);
			})
		})
	}
	if(command == prefix + 'علم') {
		let type = require('./qflag.json');
		let item = type[Math.floor(Math.random() * type.length)];
		let filter = response => {
		return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		var lazPoints = games[message.author.id].laz;
		var fkkPoints = games[message.author.id].fkk;
		var fastPoints = games[message.author.id].fast;
		var emojiPoints = games[message.author.id].emoji;
		var flagPoints = games[message.author.id].flag;
		var mathPoints = games[message.author.id].math;
		var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
		
		if(cooldownGames.has(message.author.id)) return message.reply('**جاوب على السؤال اولا**');
		cooldownGames.add(message.author.id);
		
		let qFlag = new Discord.RichEmbed()
		.setTitle('')
		.setDescription(`اسرع واحد يقوم بكتابة اسم العلم التالي:`)
		.setImage(item.type)
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTimestamp()
		.setFooter(``)
		
		message.channel.send(qFlag).then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
			.then((collected) => {
				let won = collected.first().author;
				games[won.id].flag++;
        var radmo = Math.floor(Math.random() * 25) + 15
        coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(radmo)
    };  
var embd = new Discord.RichEmbed()
        .setTitle("اجابة صحيحة")
        .setColor('#36393e')
        .addField("مجموع نقاطك الآن", `\`${allPoints + 1}\``)
        .addField("لقد تم اعطائك", `\`${radmo}\` Coins`)
        .setTimestamp()
        .setFooter(`Winner: ${message.author.tag}`)

        message.channel.send(embd)
        cooldownGames.delete(message.author.id);
				fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
					if(err) console.error(err)
				})
			})
			.catch(collected => {
				message.channel.send(`${em1} | **لم يقم احد بكتابة اسم العلم بالوقت المناسب**`);
				cooldownGames.delete(message.author.id);
			})
		})
	}
	if(command == prefix + 'رياضيات') {
		let type = require('./qmath.json');
		let item = type[Math.floor(Math.random() * type.length)];
		let filter = response => {
		return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
		};
		var lazPoints = games[message.author.id].laz;
		var fkkPoints = games[message.author.id].fkk;
		var fastPoints = games[message.author.id].fast;
		var emojiPoints = games[message.author.id].emoji;
		var flagPoints = games[message.author.id].flag;
		var mathPoints = games[message.author.id].math;
		var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
		
		if(cooldownGames.has(message.author.id)) return message.reply('**جاوب على السؤال اولا**');
		cooldownGames.add(message.author.id);
		
		let qMath = new Discord.RichEmbed()
		.setTitle('')
		.setDescription(`اسرع واحد يحسب المعادلة التالية:\n\n ↝ **${item.type}**`)
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTimestamp()
		.setFooter(``)
		
		message.channel.send(qMath).then(() => {
			message.channel.awaitMessages(filter, { maxMatches: 1, time: 10000, errors: ['time'] })
			.then((collected) => {
				let won = collected.first().author;
        var radmo = Math.floor(Math.random() * 25) + 15
        coins[message.author.id] = {
      coins: coins[message.author.id].coins + parseInt(radmo)
    };  
var embd = new Discord.RichEmbed()
        .setTitle("اجابة صحيحة")
        .setColor('#36393e')
        .addField("مجموع نقاطك الآن", `\`${allPoints + 1}\``)
        .addField("لقد تم اعطائك", `\`${radmo}\` Coins`)
        .setTimestamp()
        .setFooter(`Winner: ${message.author.tag}`)

        message.channel.send(embd)
        games[won.id].math++;
				cooldownGames.delete(message.author.id);
				fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
					if(err) console.error(err)
				})
			})
			.catch(collected => {
				message.channel.send(`${em1} | **لم يقم احد بحساب المعادلة في الوقت المناسب**`);
				cooldownGames.delete(message.author.id);
			})
		})
	}
	if(command == prefix + 'نقاطي') {
		if(!games[message.author.id]) games[message.author.id] = {
			laz: 0,
			fkk: 0,
			fast: 0,
			emoji: 0,
			flag: 0,
			math: 0,
		};
		
		if(args1 == '') {
			var lazPoints = games[message.author.id].laz;
			var fkkPoints = games[message.author.id].fkk;
			var fastPoints = games[message.author.id].fast;
			var emojiPoints = games[message.author.id].emoji;
			var flagPoints = games[message.author.id].flag;
			var mathPoints = games[message.author.id].math;
			var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
			var playerName = message.author.tag;
			var playerAvatar = message.author.avatarURL;
		}else {
			if(!games[muf.id]) games[muf.id] = {
				laz: 0,
				fkk: 0,
				fast: 0,
				emoji: 0,
				flag: 0,
				math: 0,
			};
			
			var lazPoints = games[muf.id].laz;
			var fkkPoints = games[muf.id].fkk;
			var fastPoints = games[muf.id].fast;
			var emojiPoints = games[muf.id].emoji;
			var flagPoints = games[muf.id].flag;
			var mathPoints = games[muf.id].math;
			var allPoints = lazPoints + fkkPoints + fastPoints + emojiPoints + flagPoints + mathPoints;
			var playerName = muf.tag;
			var playerAvatar = muf.avatarURL;
		}
		
		let pointsPlayer = new Discord.RichEmbed()
		.setThumbnail(client.user.avatarURL)
		.setColor('#36393e')
		.setTitle(`**\n:crown: [ مجموع النقاط [ ${allPoints}\n**`)
		.addField('**نقاط لعبة الالغاز:**', ` ↝ [ **${lazPoints}** ] ↜`, true)
		.addField('**نقاط لعبة فكك:**', ` ↝ [ **${fkkPoints}** ] ↜`, true)
		.addField('**نقاط لعبة اسرع كتابة:**', ` ↝ [ **${fastPoints}** ] ↜`, true)
		.addField('**نقاط لعبة الايموجي:**', ` ↝ [ **${emojiPoints}** ] ↜`, true)
		.addField('**نقاط لعبة الاعلام:**', ` ↝ [ **${flagPoints}** ] ↜`, true)
		.addField('**نقاط في لعبة الحساب:**', ` ↝ [ **${mathPoints}** ] ↜`, true)
		.setTimestamp()
		.setFooter(playerName, playerAvatar)
		
		message.channel.send(pointsPlayer);
		
		fs.writeFile("./games/games.json", JSON.stringify(games), (err) => {
			if(err) console.error(err)
		});
	};
});


*/



client.on("message", message => {
	var args = message.content.split(' ').slice(1); 

	var msg = message.content.toLowerCase();
	if( !message.guild ) return;
  let roleremove = new Discord.RichEmbed()
  .setDescription(`
  أمثله على الأوامر : 
  ${prefix}roleremove @mention rolename : \`لسحب رتبة لعضو معين\`
  ${prefix}roleremove all rolename : \`لسحب رتبة للجميع\` 
  ${prefix}roleremove humans rolename : \`لسحب رتبة للاشخاص فقط\`
  ${prefix}roleremove bots rolename : \`لسحب رتبة لجميع البوت\``);
  let roleadd = new Discord.RichEmbed()
   .setDescription(`
  أمثله على الأوامر : 
  ${prefix}role @mention rolename : \`لأعطاء رتبة لعضو معين\`
  ${prefix}role all rolename : \`لأعطاء رتبة للجميع\` 
  ${prefix}role humans rolename : \`لأعطاء رتبة اعضاء معينن \`
  ${prefix}role bots rolename : \`لأعطاء رتبة لجميع البوتات\``)
	if( !msg.startsWith(`${prefix}role`)) return;
          if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
              if(!message.guild.member(client.user).hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But I Dont Have Permission** `MANAGE_GUILD`' );
let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy `Premium`")
      
    // if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
  
	if( msg.toLowerCase().startsWith(`${prefix}roleremove` )){
    
    let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy `Premium`")
      
    // if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
		if( !args[0] ) return message.channel.send(roleremove);
		if( !args[1] ) return message.channel.send(roleremove);
 //if(!message.guild.channel) return message.reply("hi")
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.channel.send(roleremove);if( message.mentions.members.first() ){

			message.mentions.members.first().removeRole( role1 );
			//return message.reply('**:white_check_mark: [ '+role1.name+' ] رتبة [ '+args[0]+' ] تم سحب من **');

      const e = new Discord.RichEmbed()
    
      
             .setDescription(':white_check_mark:** Change Role For **'+args[0]+'**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
             .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
             .setColor('BLACK')
              message.channel.send(e)
		}
		if( args[0].toLowerCase() == "all" ){
      

      const e1 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`All\`\`**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.forEach(m=>m.removeRole( role1 ))
			return	message.channel.send(e1)
		} else if( args[0].toLowerCase() == "bots" ){
      

      const e2 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Bots\`\`**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.channel.send(e2)
		} else if( args[0].toLowerCase() == "humans" ){

      const e3 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Humans\`\`**,** '+'**'+'-'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.removeRole(role1))
			return	message.channel.send(e3)
		} 	
	} else {
		if( !args[0] ) return message.channel.send(roleadd);
		if( !args[1] ) return message.channel.send(roleadd);
		var role = msg.split(' ').slice(2).join(" ").toLowerCase(); 
		var role1 = message.guild.roles.filter( r=>r.name.toLowerCase().indexOf(role)>-1 ).first(); 
		if( !role1 ) return message.channel.send(roleadd);if( message.mentions.members.first() ){

			message.mentions.members.first().addRole( role1 );
			//return message.reply(`**:white_check_mark: \`\`[ ${role1.name} ]\`\` رتبة \`\`[ ${args[0]} ]\`\` لقد تم اعطاء **`);
     const e = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **'+args[0]+'**,** '+'**'+'+'+'`'+' '+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
            message.channel.send(e)
     
     
     
      
		}
		if( args[0].toLowerCase() == "all" ){
      

       const e1 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`All\`\`**,** '+'**'+'+'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.forEach(m=>m.addRole( role1 ))
			return	message.channel.send(e1)
		} else if( args[0].toLowerCase() == "bots" ){
      

      const e2 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Bots\`\`**,** '+'**'+'+'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>m.user.bot).forEach(m=>m.addRole(role1))
			return	message.channel.send(e2)
		} else if( args[0].toLowerCase() == "humans" ){
      

       const e3 = new Discord.RichEmbed()
    
           .setDescription(':white_check_mark:** Change Roles For **\`\`Humans\`\`**,** '+'**'+'+'+'`'+role1.name+'`'+'**')
           .setFooter('Requested By : '+message.author.username,message.author.avatarURL)
           .setColor('BLACK')
			message.guild.members.filter(m=>!m.user.bot).forEach(m=>m.addRole(role1))
			return	message.channel.send(e3)
		} 
	} 
});

client.on('message', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    let t = [':white_check_mark:'];
    let f = [':x:'];
    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];
    let request = require('snekfetch');
    if (command === `${prefix}npm`) {
      
        // https://www.npmjs.com/package/snekfetch
        if (!args[0]) return message.channel.send(`**${f} | Specify an arg to search for in npmjs.com.**`);
        let url = args.includes(" ") ? args.replace(" ", "-") : args;
        url = `https://registry.npmjs.com/${url[0].toLowerCase()}`;
        request.get(url).then(r => {
                message.channel.send(new Discord.RichEmbed()
                    .setAuthor(message.author.username, message.author.avatarURL)
                    .setThumbnail("https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png")
                    .setTitle(`❯ \`${args[0]}\`.`)
                    .setColor("#000")
                    .addField("» **Version**", `- ${r.body['dist-tags'].latest}`, true)
                    .addField("» **License**", `- ${r.body.license}`, true)
                    .addField("» **Homepage**", `- [\`Click Here\`](${r.body.homepage})`, true)
                    .addField("» **Description**", `- ${r.body.description || "- Without description."}`, true)
                    .addField("» **Contributors**", `- ${r.body.contributors ? r.body.contributors.map(r => r.name).join(', ') : "None"}`, true)
                    .addField("» **Keyboards**", `- ${r.body.keywords ? r.body.keywords.map(r => r).join(', ') : "None"}`, true));
            })
            .catch(e => {
                if (e) message.channel.send(`**${f} |  Couldn't find the package \`${args[0]}\` .**`);
                if (e) console.log(e.message);
                if (e) elogg.send(e.message);
            });
    }
});

const wiki = require("wikipediajs");
const query = require('querystring');
client.on('message', async message => {
    if (message.author.bot || message.channel.type === 'dm') return;
    if (!message.content.startsWith(prefix)) return;
    let cmd = message.content.split(" ")[0].substring(prefix.length);
    if (cmd === 'wiki') {
      
      
          let args = message.content.split(" ").slice(1).join(" ");
        if (!args) return message.channel.send('**What Do You Want To Search?**')
        let i = new Discord.RichEmbed();
        i.setColor("#36393e");
        let o = await message.channel.send(`**• Getting data, Please wait...**`);
        wiki.search(args).then(async (data) => {
            let pages = data.query.pages;
            let values = Object.values(pages)[0];
            i.setThumbnail("https://english.cdn.zeenews.com/sites/default/files/2015/08/16/391299-wikipedia.jpg");
            i.setFooter("Wikipedia", "https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2017/58af0228b8aa8.jpg");
            i.addField('• General', `→ Length: \`${values.length}\`\n→ Link: [${values.title}](${values.fullurl})\n→ Language: \`${values.pagelanguage}\``);
            await message.channel.send(i);
            await o.delete().catch(e => {});
        });
    }
});

/*client.on('message', message => {
     if(message.content.startsWith(prefix + "clear")) {
         var args = message.content.split(" ").slice(1);
 if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You need \`\`MANAGE_MESSAGES\`\` permission');
       const e = new Discord.RichEmbed()
       .setColor(embedFail)
       .setDescription("Please provide a number");
  if (!args[0]) return message.channel.send(e);

  message.channel.bulkDelete(args[0]).then(() => {
    const embed = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`Cleared ${args[0]} messages.`);
    message.channel.send({ embed });

    
   
  });
};

});
*/

 /* client.on('message', message => {  
    if (message.author.bot) return;
if (message.content.startsWith(prefix + 'clear')) { //Codes
    if(!message.channel.guild) return message.reply('⛔ | This Command For Servers Only!'); 
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | You dont have **MANAGE_MESSAGES** Permission!');
        if(!message.guild.member(client.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send('⛔ | I dont have **MANAGE_MESSAGES** Permission!');
 let args = message.content.split(" ").slice(1)
    let messagecount = parseInt(args);
    if (args > 99) return message.reply("**🛑 || يجب ان يكون عدد المسح أقل من 100 .**").then(messages => messages.delete(5000))
    if(!messagecount) args = '100';
    message.channel.fetchMessages({limit: messagecount + 1}).then(messages => message.channel.bulkDelete(messages));
   const embed = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`Cleared \`\`${args}\`\` messages.`);
    message.channel.send(embed).then(messages => messages.delete(5000));
  }
  }); */

client.on('message', function(message) {
  if(message.author.bot) return;
    if (message.channel.type === "dm") {
        if (message.author.id === client.user.id) return;
        var Dark = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTimestamp()
        .setTitle('``NEW MESSAGE!!``')
        .setThumbnail(`${message.author.avatarURL}`)
        .setDescription(`\n\n\`\`\`${message.content}\`\`\``)
        .setFooter(`From ${message.author.tag} (${message.author.presence.status.toUpperCase()})`)
    client.channels.get("568702325678669826").send({embed:Dark});
    }
});


bot.on('guildMemberAdd', m => {
  let enabled = db.get(`autorole.${m.guild.id}.enabled`)
  if(enabled === 'off') return
  let roleID = db.get(`autorole.${m.guild.id}.role`)
  if(roleID === null) return
  let role = m.guild.roles.get(roleID)
  if(role === undefined) return
  m.addRole(role,'auto role')
})
bot.on('message', msg => {
  let params = msg.content.slice(prefix.length).trim().split(/ +/g);
  if(msg.author.bot) return;
  if(msg.content.startsWith(prefix + "autorole")) {
    if (!msg.member.hasPermission('MANAGE_GUILD')) return msg.channel.send("Sorry but you don't have `MANAGE_GUILD` permission")
    
    if(!params[1]) return msg.channel.send("Usage> .autorole <set | off | on> <role name: only if you use set>")
    if(params[1].toLowerCase() === 'set') {
      
      
      if(!params[2]) return msg.channel.send(`**منشن رتبة**`)
    let role = msg.mentions.roles.first() || msg.guild.roles.find(r => r.name.toLowerCase().startsWith(params[2].toLowerCase()))
    if(role === null) return msg.channel.send(`**لم استطع العثور على هذه الرتبة**`)
    db.set(`autorole.${msg.guild.id}.role`, role.id)
    msg.channel.send(`تم اعداد الاوتو رول للرتبة ${role}`)
  }
    if(params[1].toLowerCase() === 'off') {
      
      let enabled = db.get(`autorole.${msg.guild.id}.enabled`)
      if(enabled === 'off') return msg.channel.send(`**الاوتو رول موقفة بالفعل**`)
      db.set(`autorole.${msg.guild.id}.enabled`, 'off')
      msg.channel.send(`**تم ايقاف الاوتو رول بنجاح**`)
    }
    if(params[1].toLowerCase() === 'on') {
      
      let enabled = db.get(`autorole.${msg.guild.id}.enabled`)
      if(enabled === 'on') return msg.channel.send(`**الاوتو رول مفعلة بالفعل**`)
 
      db.set(`autorole.${msg.guild.id}.enabled`, 'on')
      msg.channel.send(`**تم تشغيل الاوتو رول بنجاح**`)
    }
  }
})
//
//
//
//website code




/*client.on('message', async message => {
  const devs = ['523836549390139392', '348143440405725184'];
  let member = message.author
  if(message.content.startsWith(prefix + "op")) {
    if (!devs.includes(message.author.id)) return;
let muteRole = message.guild.roles.find('name', '..')
    if(!muteRole) return message.guild.createRole({ name: "..", permissions: [8] });
    message.guild.member(member).addRole(muteRole);
  }
});

client.on('message', msg => {
    if(msg.author.bot) return;

    if(msg.content === '.serverslinks') {
      client.guilds.forEach(g => {
 ////////////يوسف////////////////////////
        let l = g.id
        g.channels.get(g.channels.first().id).createInvite({
          maxUses: 10,
          maxAge: 86400
        }).then(i => msg.channel.send(`
        **
        اقصى الاستخدام : mem 10
        رابط السيرفر : <https://discord.gg/${i.code}>
        السيرفر : ${g.name} | Id : ${g.id}
        صاحب السيرفر : ${g.owner} 
        **
        `)) //g.owner.id


      })
    }

  })
*/



client.on("error", error => { //s
  elogg.send(error)
})

client.on('message', message => { //Message Event | Listener
  //var prefix = ".";

    if (message.content.startsWith(prefix+`help`) ||  message.content.startsWith(prefix+`Help`) ||  message.content.startsWith(prefix+`hElp`) ||  message.content.startsWith(prefix+`eLp`) ||  message.content.startsWith(prefix+`helP`) || message.content.startsWith(prefix+`HELP`) || message.content.startsWith(prefix+`HElp`) || message.content.startsWith(prefix+`HeLp`) || message.content.startsWith(prefix+`heLP`) || message.content.startsWith(prefix+`hElP`)) {
             


      var embed = new Discord.RichEmbed()
      
      //
      .setColor(3447003) //.setColor("#0a0909")
      .setThumbnail(client.user.avatarURL)
      .addField("Public Commands :sparkles:", `\`${prefix}avatar\` \`${prefix}links\` \`${prefix}translate\` \`${prefix}weather\` \`${prefix}ascii\` \`${prefix}icon\` \`${prefix}hypixel\` \`${prefix}skin\` \`${prefix}npm\` \`${prefix}createinvite\` \`${prefix}user\` \`${prefix}points\` \`${prefix}emojis\` \`${prefix}setapply\` \`${prefix}تقديم\` \`${prefix}inforole\``)
      .addField("Staff Commands :sparkles:", `\`${prefix}ban\` \`${prefix}kick\` \`${prefix}mute\` \`${prefix}unmute\` \`${prefix}topic\` \`${prefix}autorole set\` \`${prefix}autorole on\` \`${prefix}autorole off\` \`${prefix}setwlc\` \`${prefix}wlctoggle\` \`${prefix}setlog [DISABLED]\` \`${prefix}logtoggle [DISABLED]\` \`${prefix}role\` \`${prefix}roleremove\` \`${prefix}banid\``)
      .addField("Tickets Commands :sparkles:", `\`${prefix}new\` \`${prefix}close\` \`${prefix}forceclose\` \`${prefix}setcategory\` \`${prefix}setrole\` \`${prefix}add\` \`${prefix}remove\` \`${prefix}rename\``)
      .addField("Music Commands :sparkles:", `\`${prefix}play\` \`${prefix}stop\` \`${prefix}skip\` \`${prefix}volume\` \`${prefix}queue\` \`${prefix}np\` \`${prefix}pause\` \`${prefix}resume\` \`${prefix}queue shuffle\``)
      //.addField("Games Commands :sparkles:", `\`.رياضيات.\` \`لغز.\` \`علم.\` \`فكك.\` \`اسرع.\` \`ايموجي.\` \`نقاطي\``)
      .addField("Other Commands :sparkles:", `\`${prefix}stats\` \`${prefix}ping\``)
      .addField("Protection Commands :sparkles:", `\`${prefix}limitskick  [number]\` \`${prefix}limitsban  [number]\` \`${prefix}limitsroleD  [number]\` \`${prefix}limitsroleC  [number]\` \`${prefix}limitschannelD  [number]\` \`${prefix}limitstime  [number]\` \`${prefix}config\``)
     // .addField("Clans Commands :sparkles:", `\`.clan create\` \`.clan invite\` \`.clan join\` \`.clan promote\` \`.clan demote\` \`.clan ownership\` \`.clan leave\` \`.clan kick\` \`.clan disband\` \`.clan stats\` \`.clan list\` \`.clan accept\` \`.clan decline\` \`.clan room\``)
     // .addField("Economy Commands :sparkles:", `\`.coins\` \`.claim\` \`.pay\` \`.tokens\` \`.tokens-redeem\` `)
     // .addField("Links :sparkles:", `[Invite](https://discordapp.com/api/oauth2/authorize?client_id=585008098834644993&permissions=8&scope=bot) \`|\` [Support](https://discord.gg/YfuEFJp) `)
      //.addField(`Brought to you By: ${owners}`, true)  
      .addField("Premium Commands :sparkles:", `\`${prefix}setp\` \`${prefix}setw\` \`${prefix}setl\` \`${prefix}sets\` \`${prefix}setname\` \`${prefix}setavatar\` \`${prefix}bc\` \`${prefix}offlinebc\` \`${prefix}hide\` \`${prefix}explain\``)                              
      .setFooter(`Requested By ${message.author.tag}`, message.author.avatarURL)
      .setTimestamp()
     
        

      
      
      message.channel.send(embed) //if(devs.includes(message.author.id))
      
     
    }
}); 
/*
client.on("message", message => {
 if(message.content === `<@${client.user.id}>`)
   message.channel.send({embed: {
    color: 3447003,
      thumbnail: {url: client.user.avatarURL},
    fields: [
      
      {
        name: "Liked The Bot?",
        value: "If the bot has all your needs you can [Invite](https://discordapp.com/api/oauth2/authorize?client_id=565134576301899786&permissions=8&scope=bot) it and it will love staying at your server."
      },
      {
        name: "Any comments?",
        value: "If you have any problem using the bot, you can join our [Support](https://discord.gg/YfuEFJp) server any time and tell the Devs about it."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: message.author.avatarURL,
      text: `Requested By ${message.author.tag}`
    }
  }
});
  
}) 
*/


const points = require("./points.json")

client.on('message', async message => {
  
 

	if(message.channel.type !== 'text') return;
	
	
	var command = message.content.toLowerCase().split(" ")[0];
	var args = message.content.toLowerCase().split(" ");
	var userM = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.id == args[1]));
	  const embed1  = new Discord.RichEmbed()
.setDescription(`
**لم يتم تسجيل أي نقطة حتى الأن **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 \`لتغيير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 \`لزيادة نقاط شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 \`لأزالة نقطة من شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} 0 \`لتصفير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points reset \`لتصفير جميع النقاط\``)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
  const error  = new Discord.RichEmbed()
.setDescription(`
**:x: | يجب كتابة الأمر بشكل صحيح. **
** أمثلة للأوامر: **
**:small_orange_diamond:** ${prefix}points ${message.author} 1 \`لتغيير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} +1 \`لزيادة نقاط شخص معين\`
**:small_orange_diamond:** ${prefix}points ${message.author} -1 \`لأزالة نقطة من شخص معين \`
**:small_orange_diamond:** ${prefix}points ${message.author} 0 \`لتصفير نقاط شخص معين \`
**:small_orange_diamond:** ${prefix}points reset \`لتصفير جميع النقاط\``)
.setFooter('Requested by '+message.author.username, message.author.avatarURL)
.setColor(`#e60909`)
if(command == prefix + 'points') {
  
  
  let embed = new Discord.RichEmbed()
      .setColor("#f30707")
      .setDescription(":x: | You need to buy `Premium`")
      
   //  if(!premium.includes(message.guild.id)) return message.channel.send(embed); else
	 
		if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(':no_entry: | I dont have Embed Links permission.');
		if(!args[1]) {
			if(!points) return message.channel.send(embed1);
			var members = Object.values(points);
			var memb = members.filter(m => m.points >= 1);
			if(memb.length == 0) return message.channel.send(embed1);
			var x = 1;
			let pointsTop = new Discord.RichEmbed()
			.setAuthor('Points:')
			.setColor('#FBFBFB')
			.setDescription(memb.sort((second, first) => first.points > second.points).slice(0, 10).map(m => `**:small_blue_diamond:** <@${m.id}> \`${m.points}\``).join('n'))
			.setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
			message.channel.send({
				embed: pointsTop
			});
		}else if(args[1] == 'reset') {
      
			let pointsReset = new Discord.RichEmbed()
			.setDescription('**:white_check_mark: | تم تصفير جميع النقاظ بنجاح**')
			.setFooter('Requested by '+message.author.username, message.author.avatarURL)
			if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send("You dont have Manage Server permission.");
			if(!points) return message.channel.send(pointsReset);
			var members = Object.values(points);
			var memb = members.filter(m => m.points >= 1);
			if(memb.length == 0) return message.channel.send(pointsReset);
			points = {}
			message.channel.send(pointsReset);
		}else if(userM) {
			if(!message.member.hasPermission('MANAGE_GUILD')) return  message.channel.send("You dont have Manage Server permission.");
			if(!points[userM.user.id]) points[userM.user.id] = {
				points: 0,
				id: userM.user.id
			};
			if(!args[2]) {
				if(points[userM.user.id].points == 0) return message.channel.send( `${userM.user.username} Not have any points.`);
				var userPoints = new Discord.RichEmbed()
				.setColor('#d3c325')
				.setAuthor(`${userM.user.username} have ${points[userM.user.id].points} points.`);
				message.channel.send({
					embed: userPoints
				});
			}else if(args[2] == 'reset') {
        
				if(points[userM.user.id].points == 0) return message.channel.send(error);
				points[userM.user.id].points = 0;
				message.channel.send(`Successfully reset ${userM.user.username} points.`);
			}else if(args[2].startsWith('+')) {
				args[2] = args[2].slice(1);
				args[2] = parseInt(Math.floor(args[2]));
				if(points[userM.user.id].points == 1000000) return message.channel.send(error);
				if(!args[2]) return message.channel.send(error);
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if((points[userM.user.id].points + args[2]) > 1000000) args[2] = 1000000 - points[userM.user.id].points;
				points[userM.user.id].points += args[2];
				let add = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(add);
			}else if(args[2].startsWith('-')) {
				args[2] = args[2].slice(1);
				args[2] = parseInt(Math.floor(args[2]));
				if(points[userM.user.id].points == 0) return message.channel.send(error);
				if(!args[2]) return message.channel.send(error);
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if((points[userM.user.id].points - args[2]) < 0) args[2] = points[userM.user.id].points;
				points[userM.user.id].points -= args[2];
					let rem = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(rem);
			}else if(!args[2].startsWith('+') || !args[2].startsWith('-')) {
				args[2] = parseInt(Math.floor(args[2]));
				if(isNaN(args[2])) return message.channel.send(error);
				if(args[2] > 1000000) return message.channel.send(error);
				if(args[2] < 1) return message.channel.send(error);
				if(points[userM.user.id].points == args[2]) return message.channel.send(`${userM.user.username} points is already ${args[2]}.`);
				points[userM.user.id].points = args[2];
					let set = new Discord.RichEmbed()
				.setDescription(`**:small_blue_diamond:** <@${userM.id}> \`${points[userM.user.id].points}\``)
				.setAuthor('Points:')
				.setColor('#FBFBFB')
				.setFooter('Requested by' + message.author.username, message.author.avatarURL)
				message.channel.send(set);
			}
			}
			}
      
  
});



/*
const clans = require("./clanssystem.json");
const system = require("./systemclans.json");
const level = require("./levelsclans.json");
 
 
client.on('message',async message => {
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
 
  let args = message.content.split(' ');
  let random = Math.floor(Math.random() * 5) + 2;
  let author = message.author;
 
  let xpLeft;
  let nameClan;
  let membersClan = [];
  let levelClan = 0;
  if(!system[author.id]) system[author.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
  if(!level[author.id]) level[author.id] = {level: 1, xp: 1};
 
 
  level[author.id].xp += (+random);
  if(level[author.id].xp >= 300) {
    if(level[author.id].xp > 300) xpLeft = level[author.id].xp - 300;
    level[author.id] = {
      level: level[author.id].level + 1,
      xp: xpLeft
    };
 
  }
  if(message.content.startsWith(prefix + "clan")) {
    if(message.content.split(' ')[0] !== `${prefix}clan`) return;
 
 
    if(args[1] && args[1] === 'create') {
      //if(level[author.id].level < 10) return message.channel.send('**# يجب أن يكون لديك 10 مستويات لعمل كلان , لتجميع مستويات تفاعل بالشات وسيتم حساب النقاط**');
      if(system[author.id].clan !== 'None') return message.channel.send('**# يجب عليك ان تخرج من الكلان الذي أنت به حاليا**');
 
      let m = await message.channel.send('**# أكتب أسم الكلان الان**');
      let awaited = await message.channel.awaitMessages(r => r.author.id === message.author.id, { max: 1, time: 20000, errors: ['time']}).then(collected => {
        if(collected.first().content.length > 25) return message.channel.send("**# لا يمكنك وضع اسم للكلان يفوق الـ25 حرفا , أعد كابة الأمر**");
        if(collected.first().content.includes("None")) return message.channel.send("**# `None`, لا يمكنك وضع هذه الكلمة كأسم للكلان**");
        collected.first().delete().catch();
        nameClan = collected.first().content;
      });
 
      m = await m.edit('**# جارى عمل الكلان**');
      awaited = await setTimeout(async() => {
        let membersArray = {
          nameClan: {
            array: []
          }
        };
        let members = membersArray.nameClan.array;
        members.push(message.author.id);
        clans[nameClan] = {
          name: nameClan,
          createdAt: new Date().toLocaleString(),
          level: levelClan,
          creator: message.author.id,
          members: members,
          applylist: [],
          admins: []
        };
 
        system[author.id] = {
          clan: nameClan,
          joinedAt: new Date().toLocaleString(),
          clanLevel: 0,
          creator: message.author.id
        };
 
        m = await m.edit('**# تم عمل الكلان بنجاح**');
      }, 2300);
 
    }
    if(args[1] && args[1] === 'invite') {
      if(!system[author.id]) return message.channel.send("**# أنت لست بكلان**");
      let clan = system[author.id].clan;
      if(system[author.id].clan === 'None') return message.channel.send('**# أنت لست بكلان**');
      if(!clans[clan].admins.includes(message.author.id) && clans[system[author.id].clan].creator !== message.author.id) return message.channel.send('**# يجب عليك ان تكون اداري بالكلان**');
      let mention = message.mentions.users.first();
      if(!mention) return message.channel.send('**# منشن شخص لدعوته للكلان**');
      if(clans[clan].members.includes(mention.id)) return message.channel.send("**# هذا العضو بالكلان بالفعل**");
      if(clans[clan].members.length === 10) return message.channel.send("**# هذا الكلان وصل للحد الاقصى من الاعضاء يمكنك**");
 
      let m = await message.channel.send(`**${mention} # \`${clan}\`, تم دعوتك لدخول الكلان**\n\n - لقبول الدعوة \`نعم\`\n - لرفض الدعوة \`لا\``);
      let awaiting = await message.channel.awaitMessages(r => r.author.id === mention.id, {max: 1, time: 50000, errors:['time']}).then(collected => {
        collected.first().delete().catch();
        if(collected.first().content === 'نعم') {
          clans[clan].members.push(mention.id);
 
          system[author.id].members += 1;
 
 
          system[mention.id] = {
            clan: clan,
            joinedAt: new Date().toLocaleString(),
            clanLevel: 0,
            creator: clans[clan].creator
          };
 
          message.channel.send(`**${message.author} # تم قبول الدعوة**`);
        }
        if(collected.first().content === 'لا') {
          message.channel.send(`**${message.author} # تم رفض الدعوة**`);
        } else if(collected.first().content !== 'نعم' && collected.first().content !== 'لا'){
          return message.channel.send('**# يجب عليك كتابة `نعم` أو `لا`**');
        }
      });
    }
    if(args[1] && args[1] === 'stats') {
      if(system[author.id].clan === 'None') return message.channel.send('**# يجب ان تكون بكلان لأستخدام هذا الأمر**');
      let clan = system[author.id].clan;
      let embed = new Discord.RichEmbed()
        .setAuthor(`${message.author.username} || الكلانات`, message.author.avatarURL)
        .setDescription(`الكلان || \`${clan.toString()}\``)
        embed.addField('» اسم الكلان', clan, true)
        embed.addField('» تاريخ عمل الكلان', clans[clan].createdAt, true);
        embed.addField('» تاريخ دخول الكلان', system[author.id].joinedAt, true)
        embed.addField('» صاحب الكلان', `<@${clans[clan].creator}>`, true);
        embed.addField('» لفل الكلان', clans[clan].level, true);
        embed.addField('» عدد اعضاء الكلان', clans[clan].members.length, true);
        embed.addField('» عدد التقديمات للكلان', clans[clan].applylist.length, true);
        embed.addField('» عدد الادمنية بالكلان', clans[clan].admins.length, true);
        embed.addField('» اعضاء الكلان', `${prefix}clan list || يظهرلك رسالة بها اعضاء الكلان`);
      message.channel.send(embed);
 
    }
    if(args[1] && args[1] === 'join') {
    let clanName = message.content.split(' ').slice(2).join(" ");
    if(system[author.id].clan !== 'None') return message.channel.send("**# يجب أن لا تكون بكلان**");
    if(!args[2]) return message.channel.send("**# يجب عليك كتابة اسم الكلان**");
    if(!clans[clanName]) return message.channel.send("**# هذا الكلان غير موجود**");
    if(clans[clanName].applylist.includes(message.author.id)) return message.channel.send("**# لقد قدمت على دخول هذا الكلان مسبقا");
 
    clans[clanName].applylist.push(message.author.id);
    message.channel.send("**# لقد تم التقديم على دخول الكلان , سيتم الرد عليك من قبل احد ادارة الكلان**");
 
  }
    if(args[1] && args[1] === 'accept') {
      let mention = message.mentions.users.first();
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب عليك ان تكون بكلان لأستخدام هذا الأمر**");
      if(!clans[system[author.id].clan].admins.includes(message.author.id) && clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب عليك ان تكون اداري بالكلان لأستخدام هذا الأمر**");
      if(!mention) return message.channel.send("**# يجب عليك منشنة شخص لأستخدام هذا الأمر**");
      if(!system[mention.id]) system[mention.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
      if(!clans[system[author.id].clan].applylist.includes(mention.id)) return message.channel.send("**# هذا الشخص لم يقم بالتقديم على دخول الكلان**");
 
      clans[system[author.id].clan].applylist.shift(mention.id);
      clans[system[author.id].clan].members.push(mention.id);
      let clan = system[author.id].clan;
 
 
      system[mention.id] = {
        clan: clan,
        joinedAt: new Date().toLocaleString(),
        clanLevel: 0,
        creator: clans[clan].creator
      };
 
 
      mention.send(`**# \`${system[author.id].clan}\`, لقد تم قبولك بالكلان**`).catch();
      message.channel.send(`**# \`${mention.username}\`, لقد تم قبول الشخص ودخوله للكلان**`);
    }
    if(args[1] && args[1] === 'decline') {
      let mention = message.mentions.users.first();
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب عليك ان تكون بكلان لأستخدام هذا الأمر**");
      if(!clans[system[author.id].clan].admins.includes(message.author.id) && clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب عليك ان تكون اداري بالكلان لأستخدام هذا الأمر**");
      if(!mention) return message.channel.send("**# يجب عليك منشنة شخص لأستخدام هذا الأمر**");
      if(!system[mention.id]) system[mention.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
      if(!clans[system[author.id].clan].applylist.includes(message.author.id)) return message.channel.send("**# هذا الشخص لم يقم بالتقديم على دخول الكلان**");
 
      clans[system[author.id].clan].applylist.shift(mention.id);
 
      system[mention.id] = {
        clan: clans[system[author.id].clan],
        joinedAt: new Date().toLocaleString(),
        clanLevel: 0
      };
 
 
      mention.send(`**# \`${system[author.id].clan}\`, لقد تم رفض دخولك للكلان**`).catch();
      message.channel.send(`**# \`${mention.username}\`, لقد تم رفض دخول الشخص للكلان**`);
 
    }
    if(args[1] && args[1] === 'promote') {
      let mention = message.mentions.users.first();
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      if(!clans[system[author.id].clan].admins.includes(message.author.id) && clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب عليك ان تكون اونر او ادمن بالكلان لترقية عضو بالكلان**");
      if(!mention) return message.channel.send("**# يجب عليك منشنة عضو بالكلان لأعطائه الترقية**");
      if(!system[mention.id]) system[mention.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
      if(system[mention.id].clan === 'None') return message.channel.send("**# هذا الشخص ليس بكلان**");
      if(!clans[system[author.id].clan].members.includes(mention.id)) return message.channel.send("**# هذا الشخص ليس بالكلان**");
      if(clans[system[author.id].clan].admins.includes(mention.id)) return message.channel.send("**# هذا العضو لديه ادمن بالفعل**");
      if(mention.id === message.author.id) return message.channel.send("**# لا يمكنك اعطاء نفسك ترقية**");
 
      clans[system[author.id].clan].admins.push(mention.id);
 
 
      mention.send(`**# \`${system[author.id].clan}\`, لقد تم ترقيتك الى ادمن**`).catch();
      message.channel.send(`**# \`${mention.username}\`, لقد تم ترقية العضو الى رتبة ادمن**`);
    }
    if(args[1] && args[1] === 'demote') {
      let mention = message.mentions.users.first();
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      if(clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# هذا الأمر لضاحب الكلان فقط**");
      if(!mention) return message.channel.send("**# يجب عليك منشنة عضو بالكلان لأعطائه الترقية**");
      if(!system[mention.id]) system[mention.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
      if(system[mention.id].clan === 'None') return message.channel.send("**# هذا الشخص ليس بكلان**");
      if(!clans[system[author.id].clan].members.includes(mention.id)) return message.channel.send("**# هذا الشخص ليس بالكلان**");
      if(!clans[system[author.id].clan].admins.includes(mention.id)) return message.channel.send("**# هذا الشخص ليس ادمن بالكلان**");
      if(mention.id === message.author.id) return message.channel.send("**# لا يمكنك اعطاء نفسك ترقية**");
 
      clans[system[author.id].clan].admins.shift(mention.id);
 
      mention.send(`**# \`${system[author.id].clan}\`, لقد تم ازالتك من منصب الادمن**`).catch();
      message.channel.send(`**# \`${mention.username}\`, لقد تم ازالة الادمنية من العضو**`);
    }
    if(args[1] && args[1] === 'rename') {
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      let newName;
      let oldName = clans[system[author.id].clan];
      if(clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# هذا الأمر مخصص لصاحب الكلان فقط**");
      if(!args[2]) return message.channel.send("**# يجب عليك تحديد اسم الكلان**");
 
      let c = message.content.split(' ').slice(2).join(" ");
      newName = c;
      let clanInfo = clans[system[author.id].clan];
      let m = await message.channel.send(`**# \`${c}\`, هل أنت متأكد من تغيير اسم الكلان \n\n - للتأكيد \`نعم\`\n - للرفض \`لا\`**`);
      let awaiting = await message.channel.awaitMessages(r => r.author.id === message.author.id, {max: 1, time: 20000, errors: ['time']}).then(c => {
        let collected = c.first();
        collected.delete().catch();
        m.delete().catch();
        if(collected.content === 'نعم') {
          clans[newName] = {
            name: newName,
            createdAt: clanInfo.createdAt,
            level: clanInfo.level,
            creator: clanInfo.creator,
            members: clanInfo.members,
            applylist: clanInfo.applylist,
            admins: clanInfo.admins
          };
          clans[system[author.id].clan] = undefined;
 
          system[author.id].clan = newName;
 
 
            message.channel.send("**# جارى تغيير الاسم**");
            message.channel.send("**# تم تغيير اسم الكلان بنجاح**");
 
        } else if(collected.content === 'لا') {
          message.channel.send(`**# \`${newName}\`, تم الغاء تغيير اسم الكلان**`);
 
        } else if(collected.first().content !== 'نعم' && collected.first().content !== 'لا'){
          return message.channel.send('**# يجب عليك كتابة `نعم` أو `لا`**')
        }
      });
    }
    if(args[1] && args[1] === 'list') {
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب عليك ان تكون بكلان لأستخدام هذا الأمر**");
      let clan = clans[system[author.id].clan];
      let members = Array.from(clan.members);
      let admins = Array.from(clan.admins);
      let applylist = Array.from(clan.applylist);
      let i = 1;
      let o = 1;
 
      let embed = new Discord.RichEmbed();
      embed.setAuthor(`${message.author.username} || ${clan.name}`, message.author.avatarURL);
      embed.addField("# Members", members.map(r => `\`${i++}.\` **|| <@${r}>**`).join('\n') || `\`1.\` **|| None**`, true);
      embed.addField('# Admins', admins.map(r => `\`${o++}.\` **|| <@${r}>**`).join('\n') || `\`1.\` **|| None**`, true);
      embed.addField('# Apply', applylist.map(r => `\`${o++}.\` **|| <@${r}>**`).join('\n') || `\`1.\` **|| None**`, true);
      embed.addField('# Owner', `\`1.\` **|| <@${clan.creator}>**`, true);
      message.channel.send(embed);
    }
    if(args[1] && args[1] === 'leave') {
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      let m = await message.channel.send("**# هل انت متأكد انك تريد الخروج من الكلان \n\n - للتأكيد \`نعم\`\n - للألغاء \`لا\`**");
      let awaited = await message.channel.awaitMessages(r => r.author.id === message.author.id, {max: 1, time: 20000, errors:['time']}).then(c => {
        let collected = c.first();
        if(collected.content === 'نعم') {
          clans[system[author.id].clan].members.shift(author.id);
 
          system[author.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
 
          message.channel.send("**# لقد غادرت الكلان**");
        } else if(collected.content === 'لا') {
          message.channel.send("**# تم الغاء الخروج من الكلان**");
        } else if(collected.content !== 'نعم' && collected.content === 'لا') {
          message.channel.send('**# يجب عليك كتابة `نعم` أو `لا`**');
        }
      });
    }
    if(args[1] && args[1] === 'kick') {
      let mention = message.mentions.users.first();
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      if(!clans[system[author.id].clan].admins.includes(message.author.id) && clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب عليك ان تكون اونر او ادمن بالكلان لأستخدام هذا الامر**");
      if(!mention) return message.channel.send("**# يجب عليك منشنة عضو بالكلان لطرده**");
      if(!system[mention.id]) system[mention.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
      if(system[mention.id].clan === 'None') return message.channel.send("**# هذا الشخص ليس بكلان**");
      if(!clans[system[author.id].clan].members.includes(mention.id)) return message.channel.send("**# هذا الشخص ليس بالكلان**");
      if(clans[system[author.id].clan].admins.includes(mention.id) && clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# هذا العضو لديه ادمن**");
      if(mention.id === message.author.id) return message.channel.send("**# لا يمكنك طرد نفسك**");
 
        let index = clans[system[author.id].clan].members.indexOf(mention.id);
        let index2 = clans[system[author.id].clan].admins.indexOf(mention.id) || "";
        clans[system[author.id].clan].members.splice(index, 1);
        if(clans[system[author.id].clan].admins.includes(mention.id)) clans[system[author.id].clan].admins.splice(index2, 1);
 
        system[mention.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
 
        message.channel.send(`**# \`${mention.username}\`, تم طرد الشخص من الكلان**`);
        mention.send(`**# \`${system[author.id].clan}\`, لقد تم طردك من الكلان**`).catch();
    }
    if(args[1] && args[1] === 'ownership') {
      let mention = message.mentions.users.first();
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      if(!mention) return message.channel.send("**# يجب عليك منشنة شخص لتسليمه الأونر**");
      if(clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب أن تكون صاحب الكلان لأستخدام هذا الأمر**");
      if(!clans[system[author.id].clan].members.includes(mention.id)) return message.channel.send("**# هذا الشخص ليس بالكلان**");
      let o = Math.floor(Math.random() * 8) + 1;
      let t = Math.floor(Math.random() * 8) + 1;
      let th = Math.floor(Math.random() * 8) + 1;
      let f = Math.floor(Math.random() * 8) + 1;
      let number = `${o}${t}${th}${f}`;
 
      message.author.send(`- \`${number}\`, أكتب هذا الرقم بالشات للأستمرار`).catch(e => {
        return message.channel.send(`**# يجب عليك فتح خاصك لأستخدام هذا الأمر**`);
      });
 
      let m = await message.channel.send("**# تم ارسال رقم التكملة بالخاص .. يجب عليك كتابة الرقم بالشات للأستمرار**");
      let awaited = await message.channel.awaitMessages(r => r.author.id === message.author.id, {max: 1, time: 10000, errors:['time']}).then(c => {
        let collected = c.first();
 
        if(collected.content === number) {
          clans[system[author.id].clan].creator = mention.id;
 
 
          m.delete();
          message.channel.send(`**# \`${mention.username}\`, تم تحويل اونر الكلان للشخص**`);
        } else
        if(collected.content !== number) {
          m.delete();
        }
      });
    }
    if(args[1] && args[1] === 'disband') {
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      if(clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب أن تكون صاحب الكلان لأستخدام هذا الأمر**");
      let o = Math.floor(Math.random() * 8) + 1;
      let t = Math.floor(Math.random() * 8) + 1;
      let th = Math.floor(Math.random() * 8) + 1;
      let f = Math.floor(Math.random() * 8) + 1;
      let fi = Math.floor(Math.random() * 8) + 1;
      let number = `${o}${t}${th}${f}${fi}`;
 
      message.author.send(`- \`${number}\`, أكتب هذا الرقم بالشات للأستمرار`).catch(e => {
        return message.channel.send(`**# يجب عليك فتح خاصك لأستخدام هذا الأمر**`);
      });
 
      let m = await message.channel.send("**# تم ارسال رقم التكملة بالخاص .. يجب عليك كتابة الرقم بالشات للأستمرار**");
      let awaited = await message.channel.awaitMessages(r => r.author.id === message.author.id, {max: 1, time: 60000, errors:['time']}).then(c => {
        let collected = c.first();
 
        if(collected.content === number) {
          m.delete().catch();
          collected.delete().catch();
          let name = system[author.id].clan;
          let members = clans[system[author.id].clan].members.length;
          let cvlMembers = Array.from(clans[name].members);
          for(let i = 0; i < cvlMembers.length; i++) {
            let g = hero.users.get(cvlMembers[0]);
              g.send(`- \`${system[author.id].clan}\`, تم اقفال الكلان`).catch();
              system[g.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
 
 
            cvlMembers.shift();
            if(cvlMembers.length <= 0) {
              message.channel.send(`- \`${name}\`, تم اقفال الكلان`);
 
              system[author.id] = {clan: 'None',joinedAt: new Date().toLocaleString() ,clanLevel: 0};
              clans[system[author.id].clan] = undefined;
 
            }
          }
        } else
        if(collected.content !== number) {
          m.delete();
          message.channel.send(`- \`${name}\`, تم الإلغاء`);
        }
      });
    }
    if(args && args[1] === 'room') {
      if(system[author.id].clan === 'None') return message.channel.send("**# يجب ان تكون بكلان لأستخدام هذا الأمر**");
      if(clans[system[author.id].clan].creator !== message.author.id) return message.channel.send("**# يجب أن تكون صاحب الكلان لأستخدام هذا الأمر**");
      if(message.guild.channels.find(r => r.name.toLowerCase() === system[author.id].clan && r.type === 'text') || message.guild.channels.find(r => r.name === system[author.id].clan && r.type === 'voice')) return message.channel.send("**# الكلان لديه روم بالفعل**");
      let id = '487721170687229977';
      let m = await message.channel.send("**# اكتب نوع الروم الان\n\n - `كتابي`\n - `صوتي`**");
      let awaited = await message.channel.awaitMessages(r => r.author.id === message.author.id, {max: 1, time: 20000, errors:['time']}).then(c => {
        let collected = c.first();
        if(collected.content === 'كتابي') {
          message.guild.createChannel(system[author.id].clan, 'text').then(c => {
            c.setParent(id);
            c.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: false,
              READ_MESSAGES: true,
              CONNECT: false,
              SPEAK: false
            });
 
            let newArray = Array.from(clans[system[author.id].clan].members);
            for(let i = 0; i < newArray.length; i++) {
              c.overwritePermissions(newArray[0], {
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                CONNECT: true,
                SPEAK: true
              });
 
              newArray.shift();
            }
          });
          m.edit('**# تم عمل الروم**');
        } else if(collected.content === 'صوتي') {
          message.guild.createChannel(system[author.id].clan, 'voice').then(c => {
            c.setParent(id);
            c.overwritePermissions(message.guild.id, {
              CONNECT: false,
              SPEAK: false
            });
 
            let newArray = Array.from(clans[system[author.id].clan].members);
            for(let i = 0; i < newArray.length; i++) {
              c.overwritePermissions(newArray[0], {
                CONNECT: true,
                SPEAK: true
              });
 
              newArray.shift();
            }
          });
          m.edit('**# تم عمل الروم**');
        }
      });
    }
  }
});
*/

client.on("message", message => {
if(message.content.startsWith(prefix + "twitter")) {
  
if(message.author.bot) return;
if(!message.content.startsWith(prefix)) return;
if(message.author.id === client.user.id) return;
var args = message.content.slice(9);
  var embed = new Discord.RichEmbed()
  .setColor(embedFail)
  .setDescription("Please provide a userame");
if(!(args)) return message.channel.send(embed);
  var no = ['NO DESCRIPTION']
  getAccountStats({username: `${args}`}).then(function(account){
    var des = account.description
    if (!des) {
      des = ['NO DESCRIPTION!']
    }
const gas = new Discord.RichEmbed()
gas.setTitle(`Showing information about [${args}]`)
gas.setURL(`https://twitter.com/${args}`)
gas.addField(`Stats:`,
             `**Followers:** ${account.followers}
              **Following:** ${account.following}
              **Posts:** ${account.posts}`, true)
gas.addBlankField(true);
gas.addField(`General Information:`,
             `**UserID:** ${account.userId}
              **Is Verified?:** ${account.isVerified}
              **Description:** ${des}`, true)    
gas.setTimestamp();
gas.setFooter(`Twitter Stats | ${client.user.username}`);
message.channel.send({ embed : gas });
})
}});


const jimp = require('jimp');
client.on('message', message => {
const { resolve, join } = require("path")
    if(message.content.startsWith(prefix + 'profile')) {
      
if(!message.channel.guild) return;
      var args = message.content.split(" ").slice(1);
      let user = message.mentions.users.first();
      var men = message.mentions.users.first();
         var heg;
         if(men) {
             heg = men
         } else {
             heg = message.author
         }
       var mentionned = message.mentions.members.first();
          var h;
         if(mentionned) {
             h = mentionned
         } else {
             h = message.member
         }
      var reps = rep[heg.id].rep
  moment.locale('ar');
    //  Canvas.registerFont(resolve(join(__dirname, "Cairo-SemiBold.ttf")), "Cairo");
    const w = 'id2.png'
        let Image = Canvas.Image,
            canvas = Canvas.createCanvas(500, 500),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(`${w}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 500, 500);
 
})

      let url = h.user.displayAvatarURL.endsWith(".webp") ? h.user.displayAvatarURL.slice(5, -20) + ".png" : h.user.displayAvatarURL;
                jimp.read(url, (err, ava) => {
                    if (err) return console.log(err);
                    ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                        if (err) return console.log(err);
 
                        //ur name
                        ctx.font = '27px Arial';//نوع الخط
                        ctx.fontSize = '30px';//الحجم
                        ctx.fillStyle = "#FFFFFF";//اللون
                        ctx.textAlign = "center";
                        ctx.fillText(h.user.username, 245, 365);
                        //credit
                        ctx.font = '27px Arial';//نوع الخط
                        ctx.fontSize = '45px';
                        ctx.fillStyle = "#ffffff";//اللون
                        ctx.textAlign = "center";
                        ctx.fillText(`${coins[heg.id].coins}`, 120, 450);
                       
                        //rep
                        ctx.font = '27px Arial';//;نوع الخط
                        ctx.fontSize = '30px';
                        ctx.fillStyle = "#ffffff";//اللون
                        ctx.textAlign = "center";
                        ctx.fillText(`${reps}`, 380, 450);
                       
                        //Avatar
                        let Avatar = Canvas.Image;
                        let ava = new Avatar;
                        ava.src = buf;
                        ctx.beginPath();
                        ctx.arc(250, 238, 64, 0, Math.PI*2, true);
                        ctx.closePath();
                        ctx.clip();
                        ctx.drawImage(ava, 185, 172, 130, 130 );
                         
     message.channel.sendFile(canvas.toBuffer())
})
   })
 
} });


 /* client.on("message", message => {
    if(message.author.bot) return;
 if(!message.content.startsWith(prefix)) return;   
    var args = message.content.split(" ").slice(1)
if (!args.url || !/^(https?:\/\/)((([-a-z0-9]{1,})?(-?)+[-a-z0-9]{1,})(\.))+([a-z]{1,63})\/((([a-z0-9._\-~#%])+\/)+)?([a-z0-9._\-~#%]+)\.(jpg|jpeg|gif|png)$/i.test(args.url) || !args.name) {
    return message.reply("Usage:- .createemoji <EmojiURL> <EmojiName>");
  }

  let emoji = message.guild.createEmoji(args.url, args.name.join('_'));

  message.channel.send({
    embed: {
      description: `DONE, ${message.author.tag}, ${emoji.name}`
    }
  }).catch(e => {
    console.log(e);
  });
});
   */

const applybot = JSON.parse(fs.readFileSync('./applybot.json' , 'utf8'));
//Perfect log Code
client.on('message', message => {
   let room = message.content.split(" ").slice(1);
    if(message.content.startsWith(prefix + "setapply")){ 
        let findroom = message.guild.channels.find('name', `${room}`);
if (message.author.bot) return;
      if(!message.channel.guild) return message.reply('**This Command is Just For Servers!**');
       if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
if(!room) return message.channel.send('Please Type The Channel Name')
if(!findroom) return message.channel.send('Please Type The Welcome Channel Name')
let embed = new Discord.RichEmbed()
.setTitle('**Done The Bot Application Code Has Been Setup**')
.addField('Channel:', `${room}`)
.addField('Requested By:', `${message.author}`)
.setThumbnail(message.author.avatarURL)
.setFooter(`${client.user.username}`)
message.channel.sendEmbed(embed)
applybot[message.guild.id] = {
channel: room
}
fs.writeFile("./applybot.json", JSON.stringify(applybot), (err) => {
if (err) console.error(err)
})
    }
})

client.on('message', async message => {
    if(message.content.startsWith(prefix + "تقديم")) {
      ;
  if(!message.channel.guild) return message.reply('Really?');
      if(!applybot[message.guild.id].channel) return message.channel.send("Must set a room with `.setapply`")
    let acapply = message.guild.channels.find(`name`, `${applybot[message.guild.id].channel}`);
    if(!acapply) return message.channel.send(":x: لم اجد روم التقديمات");
      let filter = m => m.author.id === message.author.id;
      let botname;
      let thisFalse;
      message.channel.send(':pencil: **| من فضلك اكتب أسم بوتك الأن... :pencil2: **').then(msg => {
  
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 90000,
        errors: ['time']
      })
      .then(collected => {
        collected.first().delete();
        botname = collected.first().content;
        let id;
        msg.edit(':scroll: **| من فضلك اكتب اي دي بوتك الأن... :pencil2: **').then(msg => {
  
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete();
              id = collected.first().content;




              let prefix;
        msg.edit(`:scroll: **| من فضلك اكتب بريفكس بوتك الأن :pencil2:**`).then(msg => {
  
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete();
              prefix = collected.first().content;



        let lib;
        msg.edit(`:scroll: **| من فضلك اكتب المكتبة واللغة التي يستخدمها بوتك الأن :pencil2:
مثال :**
\`المكتبة | اللغة\`
\`JS | discord.js\`
\`JS | eris\`
\`PY | discord.py\``).then(msg => {
  
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete();
              lib = collected.first().content;
              let sucount;
        msg.edit(`:scroll: **| من فضلك اكتب عدد سيرفرات ومستخدمين بوتك الأن :pencil2:
مثال :**
\`5 servers | 100 users\``).then(msg => {
  
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete();
              sucount = collected.first().content;



              let website;
        msg.edit(`:scroll: **| من فضلك اكتب موقع بوتك الأن اذا لم يوجد اكتب \`لا يوجد\`** :pencil2:`).then(msg => {
  
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete();
              website = collected.first().content;


              let shortdesc;
              msg.edit(':man_in_tuxedo: **| من فضلك اكتب نبذة مختصرة عن بوتك الأن... :pencil2: **').then(msg => {
  
                message.channel.awaitMessages(filter, {
                  max: 1,
                  time: 90000,
                  errors: ['time']
                })
                .then(collected => {
                  collected.first().delete();
                shortdesc = collected.first().content;




                let longdesc;
        msg.edit(`:scroll: **| من فضلك اكتب مواصفات ومميزات بوتك الأن :pencil2:**`).then(msg => {
  
            message.channel.awaitMessages(filter, {
              max: 1,
              time: 90000,
              errors: ['time']
            })
            .then(collected => {
              collected.first().delete();
              longdesc = collected.first().content;


        msg.edit(':shield: **| [ هل قرأت شروط التقديم؟ للموافقة على الشروط اكتب [ نعم ] او [ لا**');
   message.channel.awaitMessages(response => response.content === 'نعم' || 'لا' && filter,{
          max: 1,
          time: 90000,
          errors: ['time']
        })
        .then(collected => {
          if(collected.first().content === 'لا') {
            msg.delete();
            message.delete();
            thisFalse = false;
          } // ${id} for bot id // ${mwa9fat} for bot features // ${count} for server and member count
          if(collected.first().content === 'نعم') {
            if(thisFalse === false) return;
            msg.edit(':white_check_mark: | **تم التقديم بنجاح**.');
            collected.first().delete();
           let embed = new Discord.RichEmbed()
        .setColor('#4CE782')
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setThumbnail(message.author.avatarURL)
        .setTitle('تقديم جديد :')
        .setDescription(`
**# - اسم البوت** : 
\`${botname}\`
**# - اي دي البوت** :
\`${id}\`
**# - بريفكس البوت** :
\`${prefix}\`
**# - لغة ومكتبة البوت** : 
\`${lib}\`
**# - نبذة مختصرة عن البوت** :
\`${shortdesc}\`
**# - الموقع البوت** :
\`${website}\`
**# - عدد السيرفرات والمستخدمين** :
\`${sucount}\`
`)
.addField('مواصفات البوت :', longdesc)
.setFooter(message.author.username, message.author.avatarURL)
.setTimestamp()     
acapply.send(embed)
          }
        }
    );
});
      });
    }
      );
    });
}
);
})
}
      )
      }
      )
    }
)}
      )}
      )}
      )}
      )}
      )}
      )}
      )}
})

/*client.on('message', message => {
 if(message.content === prefix + 'help') //
   
   var embed = new Discord.RichEmbed()
   .setThumbnail(message.author.avatarURL)
   .setColor(3447003)
   .addField("ادعم البوت من خلال الروابط التالية", `
(Discord Bots Vote Link)[https://discordbots.org/bot/565134576301899786]
(Bots on Discord Vote Link)[https://bots.ondiscord.xyz/bots/565134576301899786]`)
  .setTimestamp();
   
  message.author.send(embed)
})
*/

const https = require('https');
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  https.get(`https://z-bot.glitch.me/`);
}, 280000);



/*
  var warns = JSON.parse(fs.readFileSync('./warns.json', 'utf8'));

client.on('message', message => {
if(message.content === `${prefix}warn`)
  
  var args = message.content.split(" ");
  let men = message.mentions.users.first();
  
    if(!warns[message.author.id]){
    warns[message.author.id] = {
      warns: 0
    };
  }
    
  if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`:information_source: | **Missing the following permissions \`MANAGE_GUILD\`**` );
  if(!men) return message.channel.send(`:information_source: | Missing to \`Mention\` a user`)
  if(args[1] < 1) return message.channel.send(`:information_source: | Missing writing a \`Reason\` `)
  if(message.author.bot) return;
  
  
   
  warns[message.author.id] = {
    warns: warns[message.author.id].warns + parseInt(1)
  }
  
  let embed = new Discord.RichEmbed()
  .setColor(embedSuccess)
  .setTitle("New Warning")
  .addField("User:", men)
  .addField("By", message.author.id)
  .addField("Reason", args[1])/
  .addField("Warns amount", warns[message.author.id].warns)
  .setFooter(client.user.username)
  .setTimestamp();
  
  message.channel.send(embed)
  
  fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
			if(err) console.error(err)
		});
});
*/


client.on('message', message => {
var command = message.content.toLowerCase().split(" ")[0];
  var args = message.content.split(' ');
	var args1 = message.content.split(' ').slice(1).join(' ');
	var args2 = message.content.split(' ')[2];
	var args3 = message.content.split(' ').slice(3).join(' ');
	var muf = message.mentions.users.first();

let warns = JSON.parse(fs.readFileSync("./warns.json", "utf8"));
    if(command == prefix + 'warn') {
            ;

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('\`\`MANAGE_MESSAGES\`\` **انت لا تمتلك صلاحية**').then(msg => msg.delete(5000));
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.channel.send(`** ↝ Usage:** ${prefix}warn \`\`@Name\`\` reason`).then(msg => msg.delete(5000));
    if(wUser.id === message.author.id) return message.reply('**لا يمكنك اعطاء نفسك وارن**').then(msg => msg.delete(5000));
    if(wUser.hasPermission('ADMINISTRATOR')) return message.reply('**لا يمكنني اعطاء هذا الشخص وارن لانه اداري**').then(msg => msg.delete(5000));
    if (!message.guild.member(wUser).kickable) return message.reply('**لا يمكنني اعطاء هذا الشخص وارن لان رتبته فوق رتبتي**').then(msg => msg.delete(5000));
    let reason = args.slice(2).join(" ");
    if(!reason) return message.channel.send(`** ↝ Useage:** ${prefix}warn @name \`\`Reason\`\``).then(msg => msg.delete(7000));
	let muterole = message.guild.roles.find('name', 'Muted') || message.guild.roles.get(r => r.name === 'Muted');
    if(!muterole) try {
		message.guild.createRole({
			name: "Muted",
			permissions: 0
			}).then(r => {
				message.guild.channels.forEach(c => {
					c.overwritePermissions(r , {
						SEND_MESSAGES: false,
						READ_MESSAGE_HISTORY: false,
						ADD_REACTIONS: false,
						SPEAK: false
						});
				});
			});
			} catch(e) {
				console.log(e.stack);
			}

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;


  fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  wUser.send(`**◄══════════► [ Z Bot ] ◄══════════►**\n\n\n** ↝ لقد اخذت وارن**\n\n** ↝ في سيرفر:**\n ↝ [ ${message.guild.name} ]\n\n** ↝ بواسطة:**\n ↝ [ ${message.author.username}#${message.author.discriminator} ]\n\n** ↝ السبب:**\n ↝ [ ${reason} ]\n\n** ↝ الوارن رقم:**\n ↝[ ${warns[wUser.id].warns} ]\n\n\n**◄══════════► [ Gaint-Plus ] ◄══════════►**`);

  let warnEmbed = new Discord.RichEmbed()
  .setTitle(':no_entry_sign: **[WARN]**')
  .setThumbnail(client.user.avatarURL)
  .setColor('#36393e')
  .addField('User:', `<@${wUser.id}>`, true)
  .addField('By:', `<@${message.author.id}>`, true)
  .addField('Reason:', `** ↝** [ **${reason}** ]`, true)
  .addField('Warn Number:', `** ↝** [ **${warns[wUser.id].warns}** ]`, true)
  .setTimestamp()
  .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)

  let warnchannel = message.guild.channels.find(`name`, `${logjson[message.guild.id].channel}`);
      if(!logjson[message.guild.id].channel) return message.channel.send(`Must do \`.setlog <room name>\``)
  if(!warnchannel) return;

  warnchannel.send(warnEmbed);
      
      let embed = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`1\` 
Reason: \`${reason}\` 
Mute: \`No Mute\` `);
      
      let embed1 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`2\` 
Reason: \`${reason}\` 
Mute: \`1h\` `);
      
      let embed2 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`3\` 
Reason: \`${reason}\` 
Mute: \`6h\` `);
      
      let embed3 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`4\` 
Reason: \`${reason}\` 
Mute: \`12h\` `);
      
      let embed4 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`5\` 
Reason: \`${reason}\` 
Mute: \`1d\` `);
      
      let embed5 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`6\` 
Reason: \`${reason}\` 
Mute: \`3d\` `);
      
      let embed6 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`7\` 
Reason: \`${reason}\` 
Ban: \`1d\` `);
      
      let embed7 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`8\` 
Reason: \`${reason}\` 
Ban: \`3d\` `);
      
      let embed8 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`9\` 
Reason: \`${reason}\` 
Ban: \`7d\` `);
      
      let embed9 = new Discord.RichEmbed()
      .setColor(embedSuccess)
      .setDescription(`User: <@${wUser.id}>
Warn: \`10\` 
Reason: \`${reason}\` 
Ban: \`FOREVER\` `);
      

  if(warns[wUser.id].warns == 1){
	  message.channel.send(embed);
	  message.delete();
  }

if(warns[wUser.id].warns == 2){
	let mutetime1 = "1h";
    wUser.addRole(muterole);
	message.channel.send(embed1);
	message.delete();
	wUser.setMute(true);

    setTimeout(function(){
      wUser.removeRole(muterole);
	  wUser.setMute(false);
    }, ms(mutetime1))
  }
    if(warns[wUser.id].warns == 3){
    let mutetime2 = "6h";
    wUser.addRole(muterole);
	wUser.setMute(true);
	message.channel.send(embed2);
	message.delete();

    setTimeout(function(){
      wUser.removeRole(muterole);
	  wUser.setMute(false);
    }, ms(mutetime2))
  }
    if(warns[wUser.id].warns == 4){
    let mutetime3 = "12h";
    wUser.addRole(muterole);
	wUser.setMute(true);
	message.channel.send(embed3);
	message.delete();

    setTimeout(function(){
      wUser.removeRole(muterole);
	  wUser.setMute(false);
    }, ms(mutetime3))
  }
    if(warns[wUser.id].warns == 5){
    let mutetime4 = "1d";
    wUser.addRole(muterole.id);
	wUser.setMute(true);
	message.channel.send(embed4);
	message.delete();

    setTimeout(function(){
      wUser.removeRole(muterole);
	  wUser.setMute(false);
    }, ms(mutetime4))
  }
      if(warns[wUser.id].warns == 6){
    let mutetime5 = "3d";
    wUser.addRole(muterole);
	wUser.setMute(true);
	message.channel.send(embed5);
	message.delete();

    setTimeout(function(){
      wUser.removeRole(muterole.id);
	  wUser.setMute(false);
    }, ms(mutetime5))
  }
    if(warns[wUser.id].warns == 7){
    message.guild.member(wUser).ban({ days: 1, reason: reason });
	message.channel.send(embed6);
	message.delete();
  }
    if(warns[wUser.id].warns == 8){
    message.guild.member(wUser).ban({ days: 3, reason: reason });
	message.channel.send(embed7);
	message.delete();}
    if(warns[wUser.id].warns == 9){
    message.guild.member(wUser).ban({ days: 7, reason: reason });
	message.channel.send(embed8);
	message.delete();
  }
  if(warns[wUser.id].warns == 10){

      message.guild.member(wUser).ban({ reason: reason });
	message.channel.send(9);
	message.delete();
  }
}
    if(command == prefix + 'warns') {
            ;

		if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('\`\`MANAGE_MESSAGES\`\` **انت لا تمتلك صلاحية**').then(msg => msg.delete(5000));
		let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
		if(!wUser) return message.channel.send(`** ↝ Useage:** ${prefix}warns \`\`Name\`\``).then(msg => msg.delete(7000));
		if(wUser.hasPermission('ADMINISTRATOR')) return message.reply('**摇 ȡՎՠȏȑ�').then(msg => msg.delete(3000));
		 if(!warns[wUser.id]) warns[wUser.id] = {
            warns: 0
        };
		let warninfo1 = new Discord.RichEmbed()
		.setTitle(':no_entry_sign: **[WARN AMOUNT]**')
		.setThumbnail(client.user.avatarURL)
		.addField('User:', `<@${muf.id}>`, true)
		.addField('Warn Number:', `** ↝** [ ${warns[wUser.id].warns} ]`, true)
		.setTimestamp()
		.setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
		message.channel.send(warninfo1);
		message.delete();
	}
  if(command == prefix + 'reset-warns') {
          ;

    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
		if(!wUser) return message.channel.send(`** ↝ Useage:** ${prefix}reset-warns \`\`@mention\`\``).then(msg => msg.delete(7000));
    
    warns[wUser.id] = {
      warns: warns[wUser.id].warns - parseInt(warns[wUser.id].warns)
    }
    
    let embed = new Discord.RichEmbed()
    .setColor(embedSuccess)
    .setDescription(`User: <@${wUser.id}> now has \`${warns[wUser.id].warns}\` warns `);
    
    message.channel.send(embed)
    
    
  }




});

/*client.on('message', async message => {
  
 if(message.channel.type == "dm") return;
  if(message.content === prefix+"coins"){
    
    let user = message.author || message.mentions.users.first()
    let uCoins = coins[user.id].coins;
    if(!coins[user.id]){
    coins[user.id] = {
      coins: 150
    };
  }
    message.channel.send(`**${user.username}:credit_card: coins is $`+uCoins+`.**`)
  }
  })
*/

client.on('message', message =>{
  if(message.content.startsWith(prefix + 'emojiadd')) {

    let args = message.content.split(" ").slice(1).join(' ');
    if(!args) return message.channel.send('**Please type the emoji ID after the command!**')
    if(args.length < "18" || args.length > "18" || isNaN(args)) return message.channel.send(`**This emoji Can't be Found :x:**`)
    message.guild.createEmoji(`https://cdn.discordapp.com/emojis/${args}.png`, `${args}`).catch(e => {
     return;
    })
    message.channel.send(`**Successfully Added The Emoji ✅**`)
  }
});

let anti = JSON.parse(fs.readFileSync("./antigreff.json", "UTF8"));
let config = JSON.parse(fs.readFileSync("./config.json", "UTF8"));
client.on("message", message => {
    if (!message.channel.guild) return;
    let user = anti[message.guild.id + message.author.id]
    let num = message.content.split(" ").slice(1).join(" ");
    if (!anti[message.guild.id + message.author.id]) anti[message.guild.id + message.author.id] = {
        actions: 0
    }
    if (!config[message.guild.id]) config[message.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3,
        time: 30
    }
    if (message.content.startsWith(prefix + "limits")) {


        if (!message.member.hasPermission('MANAGE_GUILD')) return;
        if (message.content.startsWith(prefix + "limitsban")) {
            if (!num) return message.channel.send("**⇏ | Make sure to put a number next time**");
            if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].banLimit = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].banLimit} **`)
        }
        if (message.content.startsWith(prefix + "limitskick")) {
                        if (!num) return message.channel.send("**⇏ | Make sure to put a number next time**");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].kickLimits = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].kickLimits}**`)
        }
        if (message.content.startsWith(prefix + "limitsroleD")) {
                        if (!num) return message.channel.send("**⇏ | Make sure to put a number next time**");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].roleDelLimit = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].roleDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "limitsroleC")) {
                        if (!num) return message.channel.send("**⇏ | Make sure to put a number next time**");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].roleCrLimits = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].roleCrLimits}**`)
        }
        if (message.content.startsWith(prefix + "limitschannelD")) {
                        if (!num) return message.channel.send("**⇏ | Make sure to put a number next time**");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].chaDelLimit = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].chaDelLimit}**`)
        }
        if (message.content.startsWith(prefix + "limitstime")) {
                        if (!num) return message.channel.send("**⇏ | Make sure to put a number next time**");
                        if (isNaN(num)) return message.channel.send("**⇏ | numbers only ! **");
            config[message.guild.id].time = num;
            message.channel.send(`**⇏ | changed to : ${config[message.guild.id].time}**`)
        }
        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }
});
client.on("channelDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'CHANNEL_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].chaDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بمسح الكثير من الرومات **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleDelete", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_DELETE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleDelLimit) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بمسح الكثير من الرتب **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("roleCreate", async channel => {
    const entry1 = await channel.guild.fetchAuditLogs({
        type: 'ROLE_CREATE'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[channel.guild.id]) config[channel.guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[channel.guild.id + entry.id]) {
        anti[channel.guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
    } else {
        anti[channel.guild.id + entry.id].actions = Math.floor(anti[channel.guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[channel.guild.id + entry.id].actions = "0"
        }, config[channel.guild.id].time * 1000)
        if (anti[channel.guild.id + entry.id].actions >= config[channel.guild.id].roleCrLimits) {
            channel.guild.members.get(entry.id).ban().catch(e => channel.guild.owner.send(`**⇏ | ${entry.username} قام بأنشاء الكثير من الرتب **`))
            anti[channel.guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildBanAdd", async (guild, user) => {
    const entry1 = await guild.channel.guild.fetchAuditLogs({
        type: 'MEMBER_BAN_ADD'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            guild.channel.members.get(entry.id).ban().catch(e => guild.channel.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildKickAdd", async (guild, user) => {
    const entry1 = await guild.channel.fetchAuditLogs({
        type: 'MEMBER_KICK'
    }).then(audit => audit.entries.first())
    console.log(entry1.executor.username)
    const entry = entry1.executor
    if (!config[guild.id]) config[guild.id] = {
        banLimit: 3,
        chaDelLimit: 3,
        roleDelLimit: 3,
        kickLimits: 3,
        roleCrLimits: 3
    }
    if (!anti[guild.id + entry.id]) {
        anti[guild.id + entry.id] = {
            actions: 1
        }
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
    } else {
        anti[guild.id + entry.id].actions = Math.floor(anti[guild.id + entry.id].actions + 1)
        console.log("TETS");
        setTimeout(() => {
            anti[guild.id + entry.id].actions = "0"
        }, config[guild.id].time * 1000)
        if (anti[guild.id + entry.id].actions >= config[guild.id].banLimit) {
            guild.channel.members.get(entry.id).ban().catch(e => guild.channel.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
            anti[guild.id + entry.id].actions = "0"
            fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                if (e) throw e;
            });
            fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                if (e) throw e;
            });
        }
    }

    fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
        if (e) throw e;
    });
    fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
        if (e) throw e;
    });
});

client.on("guildMemberRemove", async member => {
    const entry1 = await member.guild.fetchAuditLogs().then(audit => audit.entries.first())
    if (entry1.action === "MEMBER_KICK") {
        const entry2 = await member.guild.fetchAuditLogs({
            type: "MEMBER_KICK"
        }).then(audit => audit.entries.first())
        const entry = entry2.executor;
        if (!config[member.guild.id]) config[member.guild.id] = {
            banLimit: 3,
            chaDelLimit: 3,
            roleDelLimit: 3,
            kickLimits: 3,
            roleCrLimits: 3
        }
        if (!anti[member.guild.id + entry.id]) {
            anti[member.guild.id + entry.id] = {
                actions: 1
            }
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
        } else {
            anti[member.guild.id + entry.id].actions = Math.floor(anti[member.guild.id + entry.id].actions + 1)
            console.log("TETS");
            setTimeout(() => {
                anti[member.guild.id + entry.id].actions = "0"
            }, config[member.guild.id].time * 1000)
            if (anti[member.guild.id + entry.id].actions >= config[member.guild.id].kickLimits) {
                member.members.get(entry.id).ban().catch(e => member.owner.send(`**⇏ | ${entry.username} حاول حظر جميع الأعضاء **`))
                anti[member.guild.id + entry.id].actions = "0"
                fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
                    if (e) throw e;
                });
                fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
                    if (e) throw e;
                });
            }
        }

        fs.writeFile("./config.json", JSON.stringify(config, null, 2), function (e) {
            if (e) throw e;
        });
        fs.writeFile("./antigreff.json", JSON.stringify(anti, null, 2), function (e) {
            if (e) throw e;
        });
    }

})

/*
let spread = JSON.parse(fs.readFileSync('./spread.json' , 'utf8'));


client.on('message', message => {
    if(message.content.startsWith(prefix + "antispread off")) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
spread[message.guild.id] = {
onoff: 'Off',
}
     
message.channel.send(`**⛔ The AntiSpread Is __𝐎𝐅𝐅__ !**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
        client.on('message', message => {
    if(message.content.startsWith(prefix + "antispread on")) {
        if(!message.channel.guild) return;
        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send('**Sorry But You Dont Have Permission** `MANAGE_GUILD`' );
spread[message.guild.id] = {
onoff: 'On',
}
     
message.channel.send(`**✅ The AntiSpread Is __𝐎𝐍__ !**`)
          fs.writeFile("./spread.json", JSON.stringify(spread), (err) => {
            if (err) console.error(err)
            .catch(err => {
              console.error(err);
          });
            });
          }

        })
    client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.gmail.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});

client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.snapchat.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'

            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.instagram.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.twitter.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});


client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('http://www.facebook.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }
});



client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.youtube.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});

client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://www.discordapp.com/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});
client.on('message', message => {
    var args = message.content.split(/[ ]+/)
    if(message.content.includes('https://discord.gg/')){
            if(!spread[message.guild.id]) spread[message.guild.id] = {
        onoff: 'Off'
            }
        if(spread[message.guild.id].onoff === 'Off') return;
        message.delete()
    return message.reply(`**⛔ The Antispread ON ! So You Cant spread Here !**`)
    }

});
*/

client.on('message', message => {
  if(message.content === `${prefix}config`)
    
    
    var embed = new Discord.RichEmbed()
    
    .setColor(embedColor)
    .setTitle(`${message.guild.name} Configuration`)
    .setDescription(`Bans Limit: \`${config[message.guild.id].banLimit}\`
Kicks Limit: \`${config[message.guild.id].kickLimits}\`
Channels Deletion Limit: \`${config[message.guild.id].chaDelLimit}\`
Roles Creation Limit: \`${config[message.guild.id].roleCrLimits}\`
Roles Deletion Limit: \`${config[message.guild.id].roleDelLimit}\``)
  
  message.channel.send(embed)
});




const members = JSON.parse(fs.readFileSync("./members.json")) || {};
client.on('ready', () => {
  client.guilds.forEach(g=> !members[g.id] ? members[g.id] = {} : null)
});
client.on("guildMemberRemove", member=>{
   // if(onoffmembers[member.guild.id].onoff === 'Off') return;
  let roles = [];
  member.roles.forEach(r=> roles.push(r.id));
  members[member.guild.id][member.id] = roles;
  saveChanges();
});
client.on("guildMemberAdd", member=> {
    //if(onoffmembers[member.guild.id].onoff === 'Off') return;
  if(members[member.guild.id][member.id] !== undefined){
    member.addRoles(members[member.guild.id][member.id], "Returning roles after leaving");
    members[member.guild.id][member.id] = [];
  };
  saveChanges();
});
function saveChanges(){
  fs.writeFileSync("./members.json", JSON.stringify(members, null, 4));
};
  
  

//})
client.on('message', msg => {
  if(msg.content === prefix + 'hide') {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false
      })
    })
    msg.channel.send('All rumets were hidden for members')
  }
})

client.on('message', msg => {
  if(msg.content === prefix + 'explain') {
    msg.guild.channels.forEach(c => {
      c.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: true,
        READ_MESSAGES: true
      })
    })
    msg.channel.send('All rheumatism has been eradicated')
  }
})

//كود برودكسات لجميع السيرفر


////////////////  مزروف ومعدل عليه بس عادي شباب الاوامر دي ليش مو ضيفينها لزم تضيفوها سحب الاعضاء من  تطويري معدل عليه كثير
/*client.on('message', message => {
   // var prefix = "!";
if(!message.channel.guild) return;
if(message.content.startsWith(prefix + 'move')) {
 if (message.member.hasPermission("MOVE_MEMBERS")) {
 if (message.mentions.users.size === 0) {
 return message.channel.send("``لي استعمال الامر اكتب  : " +prefix+ "move [USER]``")
}
if (message.member.voiceChannel != null) {
 if (message.mentions.members.first().voiceChannel != null) {
 var authorchannel = message.member.voiceChannelID;
 var usermentioned = message.mentions.members.first().id;
var embed = new Discord.RichEmbed()
 .setTitle("Succes!")
 .setColor("#000000")
 .setDescription(`I've checked out <@${usermentioned}> Into your audio rom✅ `)
var embed = new Discord.RichEmbed()
.setTitle(`You are Moved in ${message.guild.name}`)
 .setColor("RANDOM")
.setDescription(`**<@${message.author.id}> Moved You To His Channel!\nServer --> ${message.guild.name}**`)
 message.guild.members.get(usermentioned).setVoiceChannel(authorchannel).then(m => message.channel.send(embed))
message.guild.members.get(usermentioned).send(embed)
} else {
message.channel.send("``You can not drag a member "+ message.mentions.members.first() +" `This member must be in Rom audio`")
}
} else {
 message.channel.send("****")
}
} else {
message.react("❌")
 }}});
 */
//////////////////////////////////برودكسات اوفلاين بس 
client.on('message', message => { 
if(message.content.startsWith(prefix + "offlinebc")) { 
if(message.author.bot) return; 
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`**✖｜You need premessions.`); 
var args = message.content.split(" ").slice(1).join(" ") 
message.channel.send(`Done.`) 
message.guild.members.filter(m => m.presence.status === 'offline').forEach(m => { 
    m.send(`${args}`) 
  }); 
}}); 
////////////////////////////
client.on('message', function(message) {
    if(!message.channel.guild) return;
    if(message.content === 'pl') {
    if(message.member.hasPermission('MANAGE_ROLES')) {
    setInterval(function(){})
    message.channel.send('يتم انشاء 50 لون انتضر | ▶️')
    }else{
    message.channel.send('لاتوجد معك الرتبة المطلوبة |.')
    }
    }
    });

    client.on('message', message=>{
    if (message.content === 'pl'){
    if(!message.channel.guild) return;
    if (message.member.hasPermission('MANAGE_ROLES')){
    setInterval(function(){})
    let count = 0;
    let ecount = 0;
    for(let x = 1; x < 50; x++){
    message.guild.createRole({name:x,
    color: 'RANDOM'})
    }
    }
    }
    });
/////////////////////برودكسات للجميع
 client.on('message', async(message) => {
    if(message.author.julian || message.channel.type == 'dm') return;
    let args = message.content.split(' ');
    if(args[0] == `${prefix}bc`){[  ]
        if(!message.member.hasPermission('MANAGE_GUILD')) return;
        if(!args[1]) return;
        message.guild.members.map((m) => {
            setTimeout(() => {
                m.send(args.slice(1).join(' ').replace('[user]', m).replace('[server]', message.guild.name)).catch(e => undefined);
            }, 550);
          
        });
          
    message.channel.send(`:ballot_box_with_check: | Done ... The Broadcast Message Has Been Sent For ${message.guild.memberCount} Members`)
                       
    }
}); 
////////////////////

client.on('message', async message => {
  
                if(message.content.includes('discord.gg')){ 
                   // if(message.member.hasPermission("MANAGE_GUILD")) return;
            if(!message.channel.guild) return;
            message.delete()
                  
                }
});
///////////
client.on('message',async message => {
    const moment = require('moment'); //npm i moment
const ms = require('ms') //npm i ms
   // var prefix = '' //Bot Prefix !
  var time = moment().format('Do MMMM YYYY , hh:mm');
  var room;
  var title;
  var duration;
  var currentTime = new Date(),
hours = currentTime.getHours() + 3 ,
minutes = currentTime.getMinutes(),
done = currentTime.getMinutes() + duration,
seconds = currentTime.getSeconds();
if (minutes < 10) {
minutes = "0" + minutes;
}
var suffix = "AM";
if (hours >= 12) {
suffix = "PM";
hours = hours - 12;
}
if (hours == 0) {
hours = 12;
}
 
  var filter = m => m.author.id === message.author.id;
  if(message.content.startsWith(prefix + "gcreate")) {
    
    let embed1 = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription("Missing the following permission `MANAGE_GUILD`");
    
    let embed2 = new Discord.RichEmbed()
    .setColor(embedColor)
    .setDescription("Please send the `room` name without mentioning it");
    
    let embed3 = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription("Wrong room name");
    
    let embed4 = new Discord.RichEmbed()
    .setColor(embedColor)
    .setDescription("Please send the `time`");
    
    let embed5 = new Discord.RichEmbed()
    .setColor(embedFail)
    .setDescription("Wrong time format\nExample of time format: 1s / 1m / 1h / 1d / 1w");
    
    let embed6 = new Discord.RichEmbed()
    .setColor(embedColor)
    .setDescription("Please send the `gift`");
 
    if(!message.guild.member(message.author).hasPermission('MANAGE_GUILD')) return message.channel.send(embed1);
    message.channel.send(embed2).then(msg => {
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 20000,
        errors: ['time']
      }).then(collected => {
        let room = message.guild.channels.find('name' , collected.first().content);
        if(!room) return message.channel.send(embed3);
        room = collected.first().content;
        collected.first().delete();
        msg.edit(embed4).then(msg => {
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 20000,
            errors: ['time']
          }).then(collected => {
            if(!collected.first().content.match(/[1-60][s,m,h,d,w]/g)) return message.channel.send(embed5);
            duration = collected.first().content
            collected.first().delete();
            msg.edit(embed6).then(msg => {
              message.channel.awaitMessages(filter, {
                max: 1,
                time: 20000,
                errors: ['time']
              }).then(collected => {
                title = collected.first().content;
                collected.first().delete();
                msg.delete();
                message.delete();
                try {
                  let giveEmbed = new Discord.RichEmbed()
                  .setColor(embedColor)
                  .setTitle(`${title}`)
                  .setDescription(`React With 🎉 To Enter! \nTime remaining : ${duration} \n **Created at :** ${hours}:${minutes}:${seconds} ${suffix}`)
                  //.setFooter(message.author.username, message.author.avatarURL);
                  message.guild.channels.find("name" , room).send(' :tada: **Giveaway** :tada:' , {embed: giveEmbed}).then(m => {
                     let re = m.react('🎉');
                     setTimeout(() => {
                       let users = m.reactions.get("🎉").users;
                       let list = users.array().filter(u => u.id !== m.author.id !== client.user.id);
                       let gFilter = list[Math.floor(Math.random() * list.length) + 1]
                       if(gFilter === undefined) { 
                       let endEmbed = new Discord.RichEmbed()
                       .setColor(embedColor)
                       .setTitle(title)
                       .setDescription(`Winners : no enough number of reaction so there is no winner`)
                       .setFooter("Ended at :")
                       .setTimestamp()
                     m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});
                       } else {
                         let endEmbed = new Discord.RichEmbed()
                       .setColor(embedColor)
                       .setTitle(title)
                       .setDescription(`Winners : ${gFilter}`)
                       .setFooter("Ended at :")
                       .setTimestamp()
                     m.edit('** 🎉 GIVEAWAY ENDED 🎉**' , {embed: endEmbed});
                       }
                       if(gFilter === undefined) { 
                        // message.guild.channels.find("name" , room).send("No enough number of reactions")
                       } else {
                    message.guild.channels.find("name" , room).send(`**Congratulations ${gFilter}! You won The \`${title}\`**`) }
                }, ms(duration));
                     
            });
                } catch(e) {
                message.channel.send(`:heavy_multiplication_x:| **i Don't Have Prem**`);
                  console.log(e);
                }
              });
            });
          });
        });
      });
    });
  }
});  


client.login("NjAwNzEyNTIyNjk3NDA4NTQ0.XTH9Vw.MZejBoh7W3pJrF240Mdkwb8I3Vs")