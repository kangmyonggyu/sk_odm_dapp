var frontend_config = {
  "dev": {
    "chain_endpoint" : "http://127.0.0.1:7545",
    "database_url" : "",
    "database_port" : "",
    "database_schema" : "",
    "database_id" : "",
    "database_password" : "",
    "contract_address" : "0xfEe59E9250074701Fcd62e5802C062DB821E951C",
    "odm" : {
      "account" : "0xf2fC09221C8928BD8F2Ed4F6E37a92d61c0810a6",
      "private_key" : "a4907314676b97be6311df78fa739bc08d579128c5cdc56a2ca51efa1e92ed99"
    },
    "brandowner": {
      "account" : "0xBf4D68998F777A68cf1ACf88b19806e17E42d1A5",
//    "private_key" : "2656f00eea83c12e5e0f5b8c5381b9cc9bc5a3ec87fb542343eb5834d1ab5f94"
      "private_key" : "eca72966ccf32948411451fb7bc8433723abec8e643a591e747dd6e08842385d"
    },
    "company_a": {
      "account" : "0xe2654CDa29E4F82aE7875a8bc011187d16Ea6A9C",
      "private_key" : "907b3049118fae39a6e04530794d28688301778b9ac117834c1caeaf83f65dc3"
    },
    "company_b": {
      "account" : "0x38Ab676B6E148f005BBea472F94Cf20D56bff6E2",
      "private_key" : "2656f00eea83c12e5e0f5b8c5381b9cc9bc5a3ec87fb542343eb5834d1ab5f94"
    },
    "company_c": {
      "account" : "0xbe3E1C32d342e353827f8ba5b7a12C69bb561e8d",
      "private_key" : "20862deed16738eff3e8dc13163d7c5b13690e934467bf0f70016ffd5386c3f4"
    }
  },
  "testnet": {
    "chain_endpoint" : "https://besutest.chainz.network",
    "scan_url" : "https://bexplorer.chainz.network/",
    "database_url" : "",
    "database_port" : "",
    "database_schema" : "",
    "database_id" : "",
    "database_password" : "",
    "contract_address" : "0x0c57Ca1268DF961355864b495f8681A2150AA55F",
    "odm" : {
      "account" : "0x0e9148dF19AC0e51E7EebAdec57324D63ef8a8bF",
      "private_key" : "b530d97a37813d8d2f76a84e41d0d779b51d662c443b43ce2ae2e5cc9831ddea"
    },
    "brandowner": {
      "account" : "0x06CEf859B7C25C706c56284b3D8d08090016c23b",
      "private_key" : "9f270e8dc1c74408319271501a090636d1916453942c9fe6e0f3ae786a1372d2"
    },
    "company_a": {
      "account" : "0xF6c14524234728D042D60a9cFdB9D2bC4069632F",
      "private_key" : "7b030ce25f740cee3c64662a2528bc0f9bb6206d1fba1f5ac13aa1b9729d97d9"
    },
    "company_b": {
      "account" : "0xd86F2B693872BAC7cBaA854C72EFb654d6CD2392",
      "private_key" : "9f55207be2a29be4e0bab2930be75d958e257b0c5628116341d52a4f3994f40d"
    },
    "company_c": {
      "account" : "0x40e895C58369380bd9c7Fc38b586869e4946c3Bd",
      "private_key" : "030cfffcd4e11306916723b3e9dbae8c81de745dfa58e8e8ce76712d6ff58b1b"
    }
  },
  "mainnet": {
       "scan_url" : "https://besuscan.chainz.network/",
  }
}

//var config = set_config("prod");
//var config = set_config("development");
var config = set_config("test");

function set_config(env) {
    config_json = frontend_config
    var config;
    if (env == "development") {
        config = config_json["dev"];
    } else if (env == "test") {
        config = config_json["testnet"];
    } else if (env == "prod") {
        config = config_json["mainnet"];
    }
    console.log("set_config")
    console.log(config)
    return config;
}

