//Requires

//Command Handler
var commands = {
	//What to run
	run: async function(client, interaction) {
		interaction.reply({content: 'Pong!'})
	},
	//Command Section
	section: "Owner",
	//Description of command
	description: "Replies pong.",
	//Restrictions
	restriction: 2,
	//usage
	usage: "ping",

	options: []
}
module.exports = commands;
