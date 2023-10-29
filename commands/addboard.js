//Requires
const {readFileSync, writeFileSync} = require("fs");
const main = require("../trellobot");
//Command Handler
var commands = {
	//What to run
	run: async function(client, interaction) {
		
		try {
		const data = readFileSync("conf.json", "utf-8");

		var json = JSON.parse(data);

		var name = interaction.options.getString('id')
		json['boardIDs'].push(name);

		writeFileSync("conf.json", JSON.stringify(json), "utf-8", true)
		
		main.reloadBot();

		interaction.reply({content: "Successfully Added board ID: " + name + " to track", ephemeral: true});
		} catch (e) {
			console.error(e);
			interaction.reply({content: "An Error occured."})
		}
	},
	//Command Section
	section: "TrelloBot",
	//Description of command
	description: "Adds a trello board to track",
	//Restrictions
	restriction: 2,
	//usage
	usage: "addboard",

	options: [
		{
			type: 'string',
			name: 'id',
			description: 'Trello Board ID',
			required: true
		}
	]
}
module.exports = commands;
