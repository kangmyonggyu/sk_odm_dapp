//const Web3 = require('web3');

var web3 = init_web3();
var contract;
var contract_address = config.contract_address;

function init_web3 () {
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJwZXJtaXNzaW9ucyI6WyJ3ZWIzOioiLCJuZXQ6KiIsImV0aDoqIiwiZGVidWc6KiIsInR4cG9sOioiLCJlZWE6KiJdLCJleHAiOjE2MDUzMzUwOTZ9.xO3G29-45nokWAnLHVGEsfvECKLqpY4ZBVh8J_8eGNgPRstRd8D_aHouUGKWmv5_rRSEKsqun8uoIFflE-sMCcqEnUKhZusL2VqH3DghQ3iW--pxTTWyKJyXboXnX6XtPqChMtxqCSo_lro-FpcqdYU_S1f3Wv8LUgW-Com_4V3vhZ4X6DvsUyGOK7OUNq35148XH2UaIyDNvvWkqNvm1YD5lPoVS5ndB0IqbGTHZ7EXXRxwEKTYJtp2Ha2XPcJpX-JwSglqmPqCVcCNLVz2nV_hOtyPqGypx_KngE2v33LgGb0ud2QUN2fZWm93pNGv-zbSeZ5RViipjDJbxrl4kg";
    var options = {
        headers: [{
            name:"Authorization" , value: "Bearer " + token
        }]
    };

    var provider = config.chain_endpoint;
    var ws_provider = config.ws_chain_endpoint;
//    var web3 = new Web3(new Web3.providers.HttpProvider(provider, options))
    var web3 = new Web3(new Web3.providers.WebsocketProvider(ws_provider, options))
//    web3.transactionConfirmationBlocks = 1;
    return web3
};

$( document ).ready(function() {
    console.log( "ready!" );
    console.log("contarct address:"+contract_address);
    contract = new web3.eth.Contract(abi, contract_address );
    get_all_tx();
    event_subscript();
    set_all_token_value();
    console.log('typeof ethereumjs.Tx:',            (typeof ethereumjs.Tx))
});

$("#btn_start_auction").click(function(){
    start_auction();
});

$("#btn_company_a").click(function(){
    send_company_a_to_odm();
});

$("#btn_company_b").click(function(){
    send_company_b_to_odm();
});

$("#btn_company_c").click(function(){
    send_company_c_to_odm();
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
            gasLimit: web3.utils.numberToHex(1590000),
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
            gasLimit: web3.utils.numberToHex(1590000),
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
                insert_tx(receipt.transactionHash, receipt.from, receipt.to, 0)
                remove_all_input_value()
                set_all_token_value();
            });
    })
}

function reset_auction() {
    sendTransfer(config.brandowner.private_key, config.brandowner.account, config.odm.account, web3.utils.toWei($("#brandowner_token_value").text(), "ether"), "company_a");
}

function insert_tx(tx, from, to, token) {
    console.log("insert_tx");
    var req_data = {
        "tx"        : tx,
        "from"      : from,
        "to"        : to,
        "token"     : token,
    }
    console.log(req_data);

    $.ajax({
        type: "POST",
        url: "/api/contract/save_tx",
        data: req_data,
        dataType : "json",
        success: function() {
            get_all_tx();
        },
        error: function (err) {
             console.log("get_all_tx error");
             alert(err);
        },
    });

    console.log("???");

//    $.post( "/api/contract/save_tx", req_data)
//      .then(function( res_data ) {
//      console.log("get_all_tx 0");
//      console.log("get_all_tx 1");
//        get_all_tx();
//    });
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
    var table_id = ""
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
    $("#"+table_id).html("");
    console.log(table_data)
    var table_str = ""
    for (var i = 0 ; i < table_data.length ; i ++) {
        var url = "https://naver.com"
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
    $("#"+table_id).html(table_str);
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
            gasLimit: web3.utils.numberToHex(1590000),
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
    contract.events.Transfer()
        .on("data", function(event) {
          let event_return_data = event.returnValues;
          console.log("[[[[[[[[event_return_data]]]]]]]]")
          console.log(event_return_data);
//          insert_tx(event_return_data.tx, event_return_data.from, event_return_data.to, event_return_data.token)
        }).on("error", console.error);
}

function send_reset_auction_transfer(private_key, from_address) {
    var _nonce = web3.utils.toHex(web3.eth.getTransactionCount(from_address))

    web3.eth.getTransactionCount(from_address)
      .then(_nonce => {
        let privateKey = new ethereumjs.Buffer.Buffer(private_key, 'hex')
        let txParams = {
            nonce:    _nonce,
            gasPrice: web3.utils.numberToHex(0x00),
            gasLimit: web3.utils.numberToHex(1590000),
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