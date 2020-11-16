exports.list = function (req, res) {
    const client = new pg.Client(db_config);
    console.log(db_config);
    var query_str = `SELECT seq, tx, "from", "to", token, datetime FROM block.tb_tx`;
    client.connect(); client.query(query_str, (err, res) => {
        console.log("T_T");
        console.log(res);
        client.end();
    });
};

exports.save_tx = function (req, res) {
//    console.log("start save_tx");

};

