var express = require('express');
var router = express.Router();
var {getDataDb} = require('./../controllers/getDataDb.controller');


router.post('/data', getDataDb);

module.exports = router;
