var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var router = require('./router/main')(app);

const pg = require('pg');
const config = require('./router/contract/config.js').config()

const db_config = {
    host: config.database_url,
    user: config.database_id,
    password: config.database_password,
    database: config.database_database,
    port: 5432,
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'));

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});

app.post('/api/contract/save_tx', (req, res) => {
    console.log(req.body);
    const client = new pg.Client(db_config);
    var tx_hash = req.body.tx;
    var from = req.body.from;
    var to = req.body.to;
    var token = req.body.token;
    var query_str = `INSERT INTO block.tb_tx("tx", "from_addr", "to_addr", "token") VALUES ('${tx_hash}', '${from}', '${to}', '${token}')`;
    console.log(query_str)
    client.connect();
    client.query(query_str, (err, res) => {
        console.log("T_T");
        console.log(res);
        console.log(err);
        client.end();
    });
    res.end(JSON.stringify({ result : true }));
})

app.post('/api/contract/get_tx', (req, res) => {
    const client = new pg.Client(db_config);
    var result = {}

    client.connect();
    var address = req.body.address;
    var rows_list = []
    var input = address.toLowerCase()
    var query_str = `SELECT seq, tx, from_addr, to_addr, token, datetime FROM block.tb_tx WHERE from_addr = '${input}' or to_addr = '${input}' order by seq desc limit 3`;
    client.query(query_str, (sql_err, sql_res) => {
        console.log(sql_res.rows[0])
        result[input] = sql_res.rows
        res.end(JSON.stringify({ "result" : result }));
        client.end();
    });
})
