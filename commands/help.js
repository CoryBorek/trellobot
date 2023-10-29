//Requires
const {cyan} = require("../colors.json");
const {readdirSync} = require('fs');
const {hasPerms} = require('../util.js');
const {EmbedBuilder} = require('discord.js')
//Command Syntax
var commands = {
	// Command Handling
	run: function(client, interaction) {
		//Embed to send

		let embed = new EmbedBuilder()
		.setColor(cyan)
		.setTitle(`Hey, ` + interaction.user.username)
		.setAuthor({name: `Commands`})
		.setImage(client.user.avatarURL())

		let sendM = false
		var list = readdirSync("./commands/");
		// List of commands
		if (interaction.options.getString('command') === null) {
			let cat=[];
			let command2 = []
			list.forEach(file => {
				let command = require("./" + file);
				let restriction = command.restriction;
				if (hasPerms(restriction, interaction)) {
				if (cat.indexOf(command.section) === -1)
				{
					cat.push(command.section)
					command2[cat.indexOf(command.section)] = []
				}
				command2[cat.indexOf(command.section)].push("`/" + command.usage + "`")
			}

			})
			cat.forEach((item, i) => {
				let m = "";
				command2[i].forEach((item, i) => {
					m = m + (item + ", ");
				});

				embed.addFields({ name: item, value: m.substring(0, m.length-2)});
			});

			sendM = true
		}
		// Ask for specific command
		else {
			let match = false;
			list.forEach(file => {
				let command = require("./" + file);
				let restriction = command.restriction;


				if(hasPerms(restriction, interaction)) {
				if (interaction.options.getString('command') === file.replace(".js", "")) {
					let command = require("./" + file);
					embed.setTitle(`Command: /` + file.replace(".js", ""))
					embed.setDescription(command.description)
					let aliases = "";
					// command.aliases.forEach(alias => {
					// 	aliases += "`" + prefix + alias + "`, "
					// })
					embed.addFields({ name: "Usage", value: "/" + command.usage});
					// embed.addFields({ name: "Aliases", value: aliases.substring(0, aliases.length-2)});
					match = true;
					sendM = true;
				}
				}
			})


		}
		if (sendM)
		interaction.reply({content: "", embeds: [embed]});
		else interaction.reply({content: "Invalid Syntax: Try `p!help [command]`"});

	},
	// Sections for command (if we add it)
	section: "Help/Support",
	// Description of command
	description: "Help Command.",
	// Restriction
	restriction: 0,
	//Usage
	usage: "help",

	options: [
		{
			type: 'string',
			name: 'command',
			description: 'A command',
			required: false,
			choices: getOptions()
		}
	]
}

//Exports Command.
module.exports = commands;


function getOptions() {
	var commands = readdirSync("./commands/")

	var out = [];
	for (var i in commands) {
		var object = {
			name: commands[i].replaceAll(".js", ""),
			value: commands[i].replaceAll(".js", "")
		}
		out.push(object);
	}

	return out;

}