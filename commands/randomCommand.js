"use strict";

const {
    SlashCommandBuilder,
    ModalBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    TextInputBuilder,
    TextInputStyle,
    ButtonStyle,
} = require("discord.js");


exports.command = {
    data: new SlashCommandBuilder()
        .setName("random")
        .setDescription("Random generator (User, Number...)")
        .addStringOption(option =>
            option.setName("type")
                .setDescription("The type of random result")
                .setRequired(true)
                .addChoices(
                    {name: "Number", value: "NumberRandom"},
                    {name: "User", value: "UserRandom"},
                )),
    async execute(interaction) {
        // select the right type.
        switch (interaction.options.data[0].value) {
            case "NumberRandom":
                // todo : Add validation min need to be lower than max
                // create radom number modal
                const randomNumberModal = new ModalBuilder()
                    .setCustomId("randomNumberModal")
                    .setTitle("Number randomizer");

                // create min input
                const minNumberInput = new TextInputBuilder()
                    .setCustomId("minNumberInput")
                    .setLabel("Minimum number")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                // create max input
                const maxNumberInput = new TextInputBuilder()
                    .setCustomId("maxNumberInput")
                    .setLabel("Maximum number")
                    .setStyle(TextInputStyle.Short)
                    .setRequired(true);

                // Action row
                const firstActionRow = new ActionRowBuilder().addComponents(minNumberInput);
                const secondActionRow = new ActionRowBuilder().addComponents(maxNumberInput);

                // Add input to modal
                randomNumberModal.addComponents(firstActionRow, secondActionRow);

                // Show modal
                await interaction.showModal(randomNumberModal);
                break;
            case "UserRandom":
                await interaction.reply("Random command");
                break;
        }
    },
};

exports.onModalRandomNumberSubmit = async (interaction) => {
    const min = interaction.fields.getTextInputValue("minNumberInput");
    const max = interaction.fields.getTextInputValue("maxNumberInput");

    const randomNumber = Math.floor(Math.random() * (+max - +min + 1)) + +min;

    const resultEmbed = new EmbedBuilder()
        .setColor(0x00ffcb)
        .setTitle("Generated random number")
        .setDescription(`The random number generated by ${interaction.user.username} between **${min}** and **${max}** is **${randomNumber}**.`);

    await interaction.reply({embeds: [resultEmbed]});
};