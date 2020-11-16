const router = require('express').Router();
const controller = require('./controller');

router.get('/list', controller.list);
router.post('/save_tx', controller.save_tx);
//router.get('/get_server_info', controller.get_server_info);

module.exports = router;
