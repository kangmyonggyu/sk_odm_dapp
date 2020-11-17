//const Web3 = require('web3');

var web3;
var contract;
var contract_address;

function init_web3 () {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9vbDoqIiwiZWVhOioiXSwiZXhwIjoxNjA3MTQ3Njc0LCJ0ZWFtIjoiMDMifQ.LPlWdNzHpgpYTJ57aaxKqWk9lH0mJbwzToWIgvJKaJL-IQ7elyfSSWTSJWY-hlWX0_82463iopBfLvkdwJtD0_Twk7pTiUcEeP2tF_pO82LIgpRda34mG0pkWjiekrx4OgPJRrLiUoNVs7eI-2Y2SlmksAOwuQ40WJ0QhVIlojWdqk37E60cj62ckgsdqIwNEwjD1Syn1lDiUmsYarIQSstr9u8PM8xM4gtcJjOsNYcbEecMdMMq03_iBFDSn3cnb1YMPxcGCAIPkRUh4K2iAVpY0xde83qWVHnexI5kh6dLGi9jFGchFVSZnHwHqJ0drzRNmMy1xppFQX7o09Zn7Q";
    var options = {
        headers: [{
            name:"Authorization" , value: "Bearer " + token
        }]
    };

    var provider = config.chain_endpoint;
    var ws_provider = config.ws_chain_endpoint;
    var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))
//    var web3 = new Web3(new Web3.providers.WebsocketProvider(ws_provider, options))
//    web3.transactionConfirmationBlocks = 1;
    return web3
};

$( document ).ready(function() {
    console.log( "document ready!" );
    $.ajax({
        type: "GET",
        url: "/api/contract/config",
        dataType : "json",
        success: function(res) {
            config = res.result;
            web3 = init_web3();
            contract_address = config.contract_address;
            console.log("contarct address:"+contract_address);
            contract = new web3.eth.Contract(abi, contract_address );
            $("#odm_address_name").html("OBT Token (Contract Deployer) Address : "+ config.contract_address)
            $("#brandowner_address_name").html("OBT Token("+ config.brandowner.account +")")
            $("#company_a_address_name").html("OBT Token("+ config.company_a.account +")")
            $("#company_b_address_name").html("OBT Token("+ config.company_b.account +")")
            $("#company_c_address_name").html("OBT Token("+ config.company_c.account +")")
            get_all_tx();
            event_subscript();
            set_all_token_value();
            console.log('typeof ethereumjs.Tx:',            (typeof ethereumjs.Tx))
        },
        error: function (err) {
            console.log(err);
        },
    });
});



$("#btn_start_auction").click(function(){
    start_auction();
});

$('#btn_start_auction').on("keypress", function(e) {
        if (e.keyCode == 13) {
            start_auction();
            return false; // prevent the button click from happening
        }
});

$("#btn_company_a").click(function(){
    send_company_a_to_odm();
});

$('#btn_company_a').on("keypress", function(e) {
        if (e.keyCode == 13) {
            send_company_a_to_odm();
            return false; // prevent the button click from happening
        }
});

$("#btn_company_b").click(function(){
    send_company_b_to_odm();
});

$('#btn_company_b').on("keypress", function(e) {
        if (e.keyCode == 13) {
            send_company_b_to_odm();
            return false; // prevent the button click from happening
        }
});

$("#btn_company_c").click(function(){
    send_company_c_to_odm();
});

$('#btn_company_c').on("keypress", function(e) {
        if (e.keyCode == 13) {
            send_company_c_to_odm();
            return false; // prevent the button click from happening
        }
});

$("#btn_end_auction").click(function(){
    refund_and_end_auction(config.odm.private_key, config.odm.account);
});

$("#btn_reset_auction").click(function(){
    reset_auction();
});

function set_all_token_value() {
    console.log(config.odm.account);

    contract.methods.balanceOf(config.odm.account)
        .call({from: config.odm.account},
            function(error, result){
        console.log(result);
        $("#odm_token_value").text(web3.utils.fromWei(result))
    });
    contract.methods.balanceOf(config.brandowner.account)
        .call({from: config.brandowner.account},
            function(error, result){
        $("#brandowner_token_value").text(web3.utils.fromWei(result))
    });
    contract.methods.balanceOf(config.company_a.account)
        .call({from: config.company_a.account},
            function(error, result){
        $("#company_a_token_value").text(web3.utils.fromWei(result))
    });
    contract.methods.balanceOf(config.company_b.account)
        .call({from: config.company_b.account},
            function(error, result){
        $("#company_b_token_value").text(web3.utils.fromWei(result))
    });
    contract.methods.balanceOf(config.company_c.account)
        .call({from: config.company_c.account},
            function(error, result){
        $("#company_c_token_value").text(web3.utils.fromWei(result))
    });
}

function remove_all_input_value(){
    $("#input_brandowner").val("")
    $("#input_company_a").val("")
    $("#input_company_b").val("")
    $("#input_company_c").val("")
}

function start_auction(){
    var deposit_token_value = $("#input_brandowner").val()
    if (deposit_token_value < 0 || 1500 < deposit_token_value) {
        alert("deposit token value should be 0~1500.")
    }
    brandowner_to_deposit_transfer(config.brandowner.private_key, config.brandowner.account, web3.utils.toWei(deposit_token_value, "ether"));
}

function send_company_a_to_odm(){
    var deposit_token_value = $("#input_company_a").val()
    if (deposit_token_value < 0 || 2000 < deposit_token_value) {
        alert("deposit token value should be 0~2000.")
    }
    bidding_company_to_deposit_token(config.company_a.private_key, config.company_a.account, web3.utils.toWei(deposit_token_value, "ether"));
}

function send_company_b_to_odm(){
    var deposit_token_value = $("#input_company_b").val()
    if (deposit_token_value < 0 || 2000 < deposit_token_value) {
        alert("deposit token value should be 0~2000.")
    }
    bidding_company_to_deposit_token(config.company_b.private_key, config.company_b.account, web3.utils.toWei(deposit_token_value, "ether"));
}

function send_company_c_to_odm(){
    var deposit_token_value = $("#input_company_c").val()
    if (deposit_token_value < 0 || 2000 < deposit_token_value) {
        alert("deposit token value should be 0~2000.")
    }
    bidding_company_to_deposit_token(config.company_c.private_key, config.company_c.account, web3.utils.toWei(deposit_token_value, "ether"));
}

// brandowner To Deposit 전송 함수 호출
function brandowner_to_deposit_transfer(private_key, from_address, token_value) {
    console.log("function call [brandowner_to_deposit_transfer]")
    var _nonce = web3.utils.toHex(web3.eth.getTransactionCount(from_address))
    web3.eth.getTransactionCount(from_address)
      .then(_nonce => {
        let privateKey = new ethereumjs.Buffer.Buffer(private_key, 'hex')
        let txParams = {
            nonce:    _nonce,
            gasPrice: web3.utils.numberToHex(0x00),
            gasLimit: web3.utils.numberToHex(15900000),
            to:       contract_address,
            value:    '0x00',
            data:     contract.methods.api_brandowner_to_paymentguarantee(token_value).encodeABI(),
        }

        let tx = new ethereumjs.Tx(txParams)
        tx.sign(privateKey);

        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .then(function(receipt){
                console.log(`Transaction Confirmed.`);
                console.log(receipt);
                insert_tx(receipt.transactionHash, receipt.from, receipt.to, token_value)
                remove_all_input_value()
                set_all_token_value();
            });
    })
}

// Company To Deposit 전송 함수 호출 for bidding
function bidding_company_to_deposit_token(private_key, from_address, token_value) {
    console.log("function call [company_to_deposit_transfer]")
    var _nonce = web3.utils.toHex(web3.eth.getTransactionCount(from_address))
     console.log("1111")
    web3.eth.getTransactionCount(from_address)
      .then(_nonce => {
        console.log("2222")
        let privateKey = new ethereumjs.Buffer.Buffer(private_key, 'hex')
        let txParams = {
            nonce:    _nonce,
            gasPrice: web3.utils.numberToHex(0x00),
            gasLimit: web3.utils.numberToHex(15900000),
            to:       contract_address,
            value:    '0x00',
            data:     contract.methods.api_bidding_company_to_paymentguarantee(token_value).encodeABI(),
        }

        let tx = new ethereumjs.Tx(txParams)
        tx.sign(privateKey);
        console.log("3333")
        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .then(function(receipt){
                console.log(`Transaction Confirmed.`);
                console.log(receipt);
                insert_tx(receipt.transactionHash, receipt.from, receipt.to, token_value)
                remove_all_input_value()
                set_all_token_value();
            });
    })
}

function refund_and_end_auction(private_key, from_address) {
    console.log("function call [refund_and_end_auction]")
    console.log("1111");
    var _nonce = web3.utils.toHex(web3.eth.getTransactionCount(from_address))
    web3.eth.getTransactionCount(from_address)
      .then(_nonce => {
        let privateKey = new ethereumjs.Buffer.Buffer(private_key, 'hex')
        let txParams = {
            nonce:    _nonce,
            gasPrice: web3.utils.numberToHex(0x00),
            gasLimit: web3.utils.numberToHex(15900000),
            to:       contract_address,
            value:    '0x00',
            data:     contract.methods.api_bidding_processing().encodeABI(),
        }

        let tx = new ethereumjs.Tx(txParams)
        tx.sign(privateKey);

        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
            .then(function(receipt){
                console.log(`Transaction Confirmed.`);
                console.log(receipt);
                call_winner_info(receipt.transactionHash, receipt.to);
                remove_all_input_value()
                set_all_token_value();
            });
    })
}

function call_winner_info(transactionHash, from) {
    contract.methods.winner()
        .call({from: config.odm.account},
            function(error, result){
                insert_tx(transactionHash, from, result[1], result[2]);
                save_winner(result[0], transactionHash, result[2], result[1])
                alert("낙찰 Transaction\n"+transactionHash+"\n\n낙찰회사\nCompany "+result[0]+"\n\n낙찰회사 Address\n"+result[1]+"\n\n낙찰금액\n"+web3.utils.fromWei(result[2], "ether"));
    });
}

function reset_auction() {
    alert("초기화에 약 3~4초 시간이 소요됩니다.\n잠시만 기다려주세요.");
    sendTransfer(config.brandowner.private_key, config.brandowner.account, config.odm.account, web3.utils.toWei($("#brandowner_token_value").text(), "ether"), "company_a");
}

function insert_tx(tx, from, to, token) {
    console.log("insert_tx");
    var req_data = {
        "tx"        : tx,
        "from"      : from.toLowerCase(),
        "to"        : to.toLowerCase(),
        "token"     : token,
    }
    console.log(req_data);

    $.ajax({
        type: "POST",
        url: "/api/contract/save_tx",
        data: req_data,
        dataType : "json",
        success: function() {
            setTimeout(get_all_tx, 100)
//            get_all_tx();
        },
        error: function (err) {
             console.log("get_all_tx error");
             alert(err);
        },
    });

    console.log("???");
}

function save_winner(win_company_name, win_tx_hash, win_token_value, win_company_address) {
    console.log("save_winner");
    var req_data = {
        "win_company_name"           : win_company_name,
        "win_tx_hash"                : win_tx_hash,
        "win_token_value"            : win_token_value,
        "win_company_address"        : win_company_address.toLowerCase(),
    }
    console.log(req_data);

    $.ajax({
        type: "POST",
        url: "/api/contract/save_winner",
        data: req_data,
        dataType : "json",
        success: function() {
        },
        error: function (err) {
            console.log(err);
        },
    });
}

function get_all_tx() {
    console.log("get_all_tx 2");
    var address_list = []
    address_list.push(config.contract_address)
    address_list.push(config.odm.account)
    address_list.push(config.brandowner.account)
    address_list.push(config.company_a.account)
    address_list.push(config.company_b.account)
    address_list.push(config.company_c.account)

    for (var i = 0 ; i < address_list.length ; i ++) {
        var req_data = {
            "address" : address_list[i]
        }

        $.ajax({
            type: "POST",
            url: "/api/contract/get_tx",
            data: req_data,
            dataType : "json",
            success: function(res) {
                console.log("res");
                console.log("get_all_tx!!!");
                draw_table(res.result)
            },
            error: function (err) {
                console.log("get_all_tx error");
            },
        });
    }
}

function draw_table(result) {
    console.log("draw_table function")
    console.log(config.odm.account)
    var table_id = "";
    var table_target_address = "";
    var table_data
    if (config.contract_address.toLowerCase() in result) {
        table_id = "odm_table"
        table_data = result[config.contract_address.toLowerCase()]
    } else if (config.brandowner.account.toLowerCase() in result) {
        table_id = "brandowner_table"
        table_data = result[config.brandowner.account.toLowerCase()]
    } else if (config.company_a.account.toLowerCase() in result) {
        table_id = "company_a_table"
        table_data = result[config.company_a.account.toLowerCase()]
    } else if (config.company_b.account.toLowerCase() in result) {
        table_id = "company_b_table"
        table_data = result[config.company_b.account.toLowerCase()]
    } else if (config.company_c.account.toLowerCase() in result) {
        table_id = "company_c_table"
        table_data = result[config.company_c.account.toLowerCase()]
    } else {
        return
    }
    console.log("11111");
    $("#"+table_id).html("");
    console.log(table_data)
    var table_str = ""
    for (var i = 0 ; i < table_data.length ; i ++) {
        console.log("22222");
        table_str += '<tr role="row">'
                    +'<td>'+table_data[i].datetime+'</td>'
                    +'<td style="display:flex">'
                        + '<button id='+table_data[i].tx+' onclick="open_window(this.id)" class="btn btn-primary" type="button" style="padding:0 5px 0 5px; margin-right: 7px">'
                        + '<i class="fas fa-search fa-sm"></i>'
                        + '</button>'
                    + table_data[i].tx +'</td>'
                    +'<td>'+table_data[i].from_addr+'</td>'
                    +'<td>'+table_data[i].to_addr+'</td>'
                    +'<td>'+web3.utils.fromWei(table_data[i].token, "ether")+'</td>'
                    +'</tr>'
    }
    console.log("33333");
    $("#"+table_id).html(table_str);
    console.log("444444");
}

function open_window(id) {
    var url = config.scan_url+'tx/'+id
    window.open(url,"");
}

function sendTransfer(private_key, from_address, to_address, token_value, next_flag) {
    console.log("function call [sendTransfer]");
    var _nonce = web3.utils.toHex(web3.eth.getTransactionCount(from_address))

    web3.eth.getTransactionCount(from_address)
      .then(_nonce => {
        let privateKey = new ethereumjs.Buffer.Buffer(private_key, 'hex')
        let txParams = {
            nonce:    _nonce,
            gasPrice: web3.utils.numberToHex(0x00),
            gasLimit: web3.utils.numberToHex(15900000),
            to:       contract_address,
            value:    '0x00',
            data:     contract.methods.transfer(to_address, token_value).encodeABI(),
        }

        let tx = new ethereumjs.Tx(txParams)
        tx.sign(privateKey);

        console.log(tx.serialize().toString('hex'));

        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .then(() => {
            if (next_flag == "company_a") {
                sendTransfer(config.company_a.private_key, config.company_a.account, config.odm.account  , web3.utils.toWei($("#company_a_token_value").text(), "ether"), "company_b");
            } else if (next_flag == "company_b") {
                sendTransfer(config.company_b.private_key, config.company_b.account, config.odm.account  , web3.utils.toWei($("#company_b_token_value").text(), "ether"), "company_c");
            } else if (next_flag == "company_c") {
                sendTransfer(config.company_c.private_key, config.company_c.account, config.odm.account  , web3.utils.toWei($("#company_c_token_value").text(), "ether"), "init_call");
            } else if (next_flag == "init_call") {
                send_reset_auction_transfer(config.odm.private_key, config.odm.account);
            }
        });
    })
}

function event_subscript() {
//    contract.events.Transfer()
//        .on("data", function(event) {
//          let event_return_data = event.returnValues;
//          console.log("[[[[[[[[event_return_data]]]]]]]]")
//          console.log(event_return_data);
//          insert_tx("", event_return_data.from.toLowerCase(), event_return_data.to.toLowerCase(), event_return_data.value)
//        }).on("error", console.error);
}

function send_reset_auction_transfer(private_key, from_address) {
    var _nonce = web3.utils.toHex(web3.eth.getTransactionCount(from_address))

    web3.eth.getTransactionCount(from_address)
      .then(_nonce => {
        let privateKey = new ethereumjs.Buffer.Buffer(private_key, 'hex')
        let txParams = {
            nonce:    _nonce,
            gasPrice: web3.utils.numberToHex(0x00),
            gasLimit: web3.utils.numberToHex(15900000),
            to:       contract_address,
            value:    '0x00',
            data:     contract.methods.reset_auction().encodeABI(),
        }

        let tx = new ethereumjs.Tx(txParams)
        tx.sign(privateKey);

        console.log(tx.serialize().toString('hex'));

        web3.eth.sendSignedTransaction('0x' + tx.serialize().toString('hex'))
        .on('transactionHash', (hash)=> {
            console.log(`Transaction hash is ${hash}`)
        })
        .once('confirmation', (confirmation, receipt)=> {
            console.log(`Auction Reset Transaction Confirmed.`);
            remove_all_input_value()
            set_all_token_value();
        });
    })
}