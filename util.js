const discord = require("discord.js");
const bitfield = discord.PermissionsBitField;



var utilities = {
	hasPerms: function(restriction, interaction) {
		
		function hasAdmin() {
			return (hasPermission(interaction, bitfield.Flags.Administrator))
		}

		function hasInsights() {
			return hasPermission(interaction, bitfield.Flags.ViewGuildInsights)
		}
		let hasPerms = false
		/* if (restriction >= 3 && (interaction.user.id === '162369340069511180')) hasPerms = true
		else*/ if (restriction === 2 && hasAdmin()) hasPerms = true
		else if (restriction === 1 && (hasInsights() || hasAdmin())) hasPerms = true;
		else if (restriction === 0) hasPerms = true
		return hasPerms;


	},
	hasPermission: function(interaction, permission) {
		return hasPermission(interaction, permission);
	},
	getArrayPart: function(start, amount, array) {
		return getArrayPart(start, amount, array);
	}
}
module.exports = utilities;


function getArrayPart(start, amount, array){
	let returnValue = "";
	for(var i = start; (i < amount + start && i < array.length); i++)
    {
		returnValue += array[i] + "\n";
    }
	return returnValue;
}

function hasPermission(interaction, permission) {
	return interaction.memberPermissions.has(permission)
}
