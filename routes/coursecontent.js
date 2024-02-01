
var express = require('express');
var router = express.Router();

var content = require('../controller/coursecontent')


router.post('/add_content/:id', content.add_content)
router.get('/:id', content.select_content)
router.post('/delete_content/:id', content.delete_content)
router.post('/update_content/:id', content.update_content)

module.exports = router;