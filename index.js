const prompts = require('prompts');
const { Client } = require('discord.js-selfbot-v13');
const client = new Client({
  checkUpdate: false,
});
var prompt = require('prompt-sync')();
const chalk = require('cli-color');
console.log(chalk.green(`
██████╗░██████╗░░█████╗░███╗░░░███╗░█████╗░███╗░░██╗
██╔══██╗██╔══██╗██╔══██╗████╗░████║██╔══██╗████╗░██║
██████╔╝██████╔╝██║░░██║██╔████╔██║███████║██╔██╗██║
██╔═══╝░██╔══██╗██║░░██║██║╚██╔╝██║██╔══██║██║╚████║
██║░░░░░██║░░██║╚█████╔╝██║░╚═╝░██║██║░░██║██║░╚███║
╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═╝░░░░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝
`))

var token = prompt('Enter a vaild Account Token ');

client.on('ready', async () => {
  const regex = /\d+/gmi
  let array = []
  client.guilds.cache.map(guild => array.push({ title: `name : ${guild.name} id : ${guild.id}` }))
  const copy = await prompts([{
    type: 'autocomplete',
    name: 'value',
    message: 'what is the server that you wanna clone ?',
    choices: array
  }]);
  let copyg = client.guilds.cache.get(copy.value.match(regex)[0])
  const paste = await prompts([{
    type: 'autocomplete',
    name: 'value',
    message: 'what is the server that you wanna to paste ?',
    choices: array
  }]);
  let pasteg = client.guilds.cache.get(paste.value.match(regex)[0])
  const backup = require("discord-backup");
  backup.create(copyg,{
        backupID: null,
        maxMessagesPerChannel: 10,
        jsonSave: true,
        jsonBeautify: true,
        doNotBackup: ["bans"],
        saveImages: ''
    }).then((backupData) => {
    backup.load(backupData.id, pasteg).then(() => {
      backup.remove(backupData.id);
    }).catch((err) => {
      return console.log(`error ${err}`)
    });
  });


})

  client.login(token)