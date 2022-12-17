"use strict";

require("dotenv").config();
const {Client, GatewayIntentBits} = require("discord.js");
const db = require("./models/dbSetup");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
const commands = require("./commands/loadCommands");
const events = require("./events/loadEvents");
const {config} = require("dotenv");

client.on("ready", async () => {
    await commands.load(client);
    await events.load(client);
    console.info(`\x1b[94mLogged in as ${client.user.tag}!\x1b[0m`);
});

client.login(process.env.TOKEN)
    .catch(_ => console.error("\x1b[31mConnection failed !\x1b[0m"));
