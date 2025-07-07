const fs = require("fs");
const axios = require("axios");

module.exports = async (client) => {

const SlashsArray = []

  fs.readdir(`./commands`, (error, folder) => {
  folder.forEach(subfolder => {
fs.readdir(`./commands/${subfolder}/`, (error, files) => { 
  files.forEach(files => {
      
  if(!files?.endsWith('.js')) return;
  files = require(`../commands/${subfolder}/${files}`);
  if(!files?.name) return;
  client.slashCommands.set(files?.name, files);
   
  SlashsArray.push(files)
  });
    });
  });
});
  client.on("ready", async () => {
    client.guilds.cache.forEach(guild => guild.commands.set(SlashsArray));
    const url = 'https://discord.com/api/v10/applications/@me';

    const data = {
      description: "<a:money:1181552777323892769> **MAGNATA STORE 2.0**\n**https://discord.gg/4qq6W6YN**",
    };

    axios.patch(url, data, {
      headers: {
        Authorization: `Bot ${client.token}`,
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {})
    .catch((error) => {});
  });
};
