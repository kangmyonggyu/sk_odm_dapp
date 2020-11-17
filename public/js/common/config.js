var frontend_config = {
  "dev": {
    "chain_endpoint" : "http://127.0.0.1:7545",
    "contract_address" : "0xfEe59E9250074701Fcd62e5802C062DB821E951C",
    "odm" : {
      "account" : "0xf2fC09221C8928BD8F2Ed4F6E37a92d61c0810a6",
      "private_key" : "a4907314676b97be6311df78fa739bc08d579128c5cdc56a2ca51efa1e92ed99"
    },
    "brandowner": {
      "account" : "0xBf4D68998F777A68cf1ACf88b19806e17E42d1A5",
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
    "ws_chain_endpoint": "wss://besutest.chainz.network",
    "scan_url" : "https://bexplorer.chainz.network/",
    "contract_address" : "0x242990adCd80501Bc63D666F37dBEda9047410C6",
    "odm" : {
      "account" : "0x56B9B17564D7B2C1cDf4166Bcceb32EDfB4a9511",
      "private_key" : "0x39fcb451a731a0ad58e58fe1cbaa851c953062813dffe070e6a5a623f67b91de"
    },
    "brandowner": {
      "account" : "0x4ACB42d6CD76001c2e427E2De6ACb27C4466eB12",
      "private_key" : "0x793adce876dc3eed79236fe1436709c2d184372909e537d01a40f3404cb738ac"
    },
    "company_a": {
      "account" : "0xC96c845d3246F52BEC42C13050bc36B9f1860298",
      "private_key" : "0x96bcd872675e5f9d1658da06c9be13ab0bd1d8b0c0aca7a9c12bfd756aa590e6"
    },
    "company_b": {
      "account" : "0x9bE87345B869B2b331D4E91c7A7B30bc981Ee36E",
      "private_key" : "0xdcc2d9b0137ebc47dbc2f32ab5290e26d51a88c3f9919bbb537285dadf07a97a"
    },
    "company_c": {
      "account" : "0xc9BeF9a0e1b49Bc55a3c9e6f4dC24039793d8F6b",
      "private_key" : "0xdaa248872c01d66a341a91039f48a8a00cf71bde6665901cd91dbdf48586934c"
    }
  },
  "mainnet": {
    "chain_endpoint" : "https://besu.chainz.network",
    "ws_chain_endpoint": "wss://besu.chainz.network",
    "scan_url" : "https://besuscan.chainz.network/",
    "contract_address" : "", //TODO: 생성후에 넣기
    "odm" : {
      "account" : "0x2e46bb261A0352aDA4dFc2095b77762ec94481e0",
      "private_key" : "0xa4aaa8c1db80d6449b11c6ed2e2d40c17f5a6c5304c9599371152632e64b2bdf"
    },
    "brandowner": {
      "account" : "0xc5D50eCcb13a6428BEd539ccB02294A1Bb90FDD6",
      "private_key" : "0x4ac043875cb0fa419ebcd91c4c4fe0d8297bc644e3479942ec3d2bf0d343f36a"
    },
    "company_a": {
      "account" : "0xACb3907F9c6cdb834EA1277D99278F283cD82066",
      "private_key" : "0x63edbbfbef7995191ef02cd8a882e78ecfae3b129c0f1fefb3ade5f2abf5983e"
    },
    "company_b": {
      "account" : "0x5B3eCaB5c578A26992C2F8677d84812362A036E7",
      "private_key" : "0xd129ce90ba62abd618596a295da2c0dc446e00a50b06a562b4265a00da9d6f78"
    },
    "company_c": {
      "account" : "0x8A711d936aDBBf9495FF3064395B7D2590D64ceE",
      "private_key" : "0xdf0d3bdcf5001bcc2cbc64701f83c083b0af5d70adf1d3cf83c12734cf89835d"
    }
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