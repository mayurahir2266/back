var express = require('express');
var router = express.Router();
const multer = require('multer');

//multer start

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  var upload = multer({ storage: storage })

  //multer end

var user = require('../controller/studentcontroller')

router.post('/addstudent', upload.single('image'), user.add_student);
router.get('/:id', user.find_student);
// router.get('/find', user.find_student);
router.post('/update/:id', user.update_student);
router.post('/delete/:id', user.delete_student);

module.exports = router;