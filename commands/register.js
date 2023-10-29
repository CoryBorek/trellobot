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

		var name = interaction.options.getString('username')
		json['userIDs'][name] = interaction.member.id;

		writeFileSync("conf.json", JSON.stringify(json), "utf-8")

		main.reloadConf();

		interaction.reply({content: "Successfully registered Trello user: " + name + " to your account.", ephemeral: true});
		} catch (e) {
			console.error(e);
			interaction.reply({content: "An Error occured."})
		}
	},
	//Command Section
	section: "TrelloBot",
	//Description of command
	description: "Registers User to display upon Trello actions.",
	//Restrictions
	restriction: 0,
	//usage
	usage: "register",

	options: [
		{
			type: 'string',
			name: 'username',
			description: 'Trello Username',
			required: true
		}
	]
}
module.exports = commands;
