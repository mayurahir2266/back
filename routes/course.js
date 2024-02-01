
var express = require('express');
var router = express.Router();

var course = require('../controller/coursecontroller')

router.post('/addcourse', course.add_course)
router.get('/:id', course.select_course)
router.post('/deletecourse/:id', course.delete_course)
router.post('/updatecourse/:id', course.update_course)

module.exports = router;