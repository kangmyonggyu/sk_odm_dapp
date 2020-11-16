exports.config = function() {
    console.log(__dirname)
    config_json = require( '../../config.json');
    var config;
    if (process.env.NODE_ENV == "development") {
        config = config_json["dev"];
    } else if (process.env.NODE_ENV == "test") {
        config = config_json["testnet"];
    } else if (process.env.NODE_ENV == "prod") {
        config = config_json["mainnet"];
    }

    return config;
}
