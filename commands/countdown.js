import { SlashCommandBuilder } from '@discordjs/builders';
import { timeOn } from './countdown/timeOn.js';
import { timeOff } from './countdown/timeOff.js';


const countdown = {
    data: new SlashCommandBuilder()
        .setName('countdown')
        .setDescription('esta mas alpedo, pero no me deja quitarlo xd')
        .addSubcommand(subcommand=>subcommand
            .setName('on')
            .setDescription('Inicia el countdown (por defecto 2hs).')
            .addIntegerOption(option=>option
                .setName('hours')
                .setDescription('Define las horas en valores enteros del 1 al 60.'))
            .addIntegerOption(option=>option
                .setName('mins')
                .setDescription('Define los minutos en valores enteros del 1 al 60.')))
            .addSubcommand(subcommand=>subcommand
                .setName('off')
                .setDescription('Para el countdown.')
                .addStringOption(option=> option
                    .setName('timerid')
                    .setRequired(true)
                    .setDescription('ID único en las respuestas de /countdown on')))
    ,          
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'on') {
            let hours = interaction.options.getInteger('hours');
            let mins = interaction.options.getInteger('mins');
            
            timeOn(interaction, hours, mins);
        };
        if (interaction.options.getSubcommand() === 'off') {
            const messageId = interaction.options.getString('timerid');
            timeOff(interaction, messageId)
        }
    },
};
export default countdown;