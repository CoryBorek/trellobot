
var bot = null;
var conf = null;

const output = {
    setConf: function(newConf) {
        conf = newConf;
    },
    getConf: function() {
        return conf;
    },
    setBot: function (newBot) {
        bot = newBot;
    },
    getBot: function () {
        return bot;
    }
}

module.exports = botdata;