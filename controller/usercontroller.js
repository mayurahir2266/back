var register_model = require('../model/usermodel')
var nodemailer = require('nodemailer');
const storage = require('node-persist')

var loginmodel = false;

exports.register_user = async (req, res) => {

     var data = await register_model.findOne({ email: req.body.email })

     if (data) {

          res.status(200).json({
               status: 'user already registered'
          });
     }

     else {

          var data = await register_model.create(req.body)

          res.status(200).json({
               status: 'success',
               data
          })
     }

}
exports.login_user = async (req, res) => {
     
     if (loginmodel == false) {

          var data = await register_model.find({ email: req.body.email })

          if (data.length == 1) {

               if (data[0].password == req.body.password) {
                    loginmodel = true;

                    res.status(200).json({
                         status: 'success',
                         data
                    })
               }
               else {
                    res.status(200).json({
                         status: 'check_password'
                    })
               }
          }
          else {
               res.status(200).json({
                    status: 'user not found'
               })

          }

     }
     else {
          res.status(200).json({
               status: 'user already logged in'
          })
     }
}

exports.logout_user = (req, res) => {
     loginmodel = false;

     res.status(200).json({
          status:'succesfully logged out'
     })
}

exports.alluser = async (req, res) => {
     var data = await register_model.find()

     res.status(200).json({
          status:'succesfully fetched',
          data
     })
}

exports.delete_user = async (req, res) => {

     var v_id = req.params.id

     var data = await register_model.findByIdAndDelete(v_id)

     res.status(200).json({
          status:'succesfully deleted',
          status: "delete data" + v_id
     })
    
}

exports.update_user = async (req, res) => {
     
     var v_id = req.params.id

     var data = await register_model.findByIdAndUpdate(v_id, req.body)

     res.status(200).json({
          status:'succesfully updated',
          status: "update data" + v_id
     })
}

exports.forget_password = async (req, res) => {

     // var forget = req.params.id
     var data = await register_model.find({email: req.body.email})

     var send_mail = data[0].email;
     console.log('send mail', send_mail);

     var OTP = Math.floor(1000 + Math.random() * 9000)

     await storage.init( /* options ... */ );
     await storage.setItem('OTP',OTP)

     if(data){

          var transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                 user: 'sonanijaydip4@gmail.com',
                 pass: 'ochpvloxdimvmtlk'
               }
             });
             
             var mailOptions = {
               from: 'sonanijaydip4@gmail.com',
               to: send_mail,
               subject: 'Sending Email using Node.js',
               text: 'your otp is '+OTP
             };
             
             transporter.sendMail(mailOptions, function(error, info){
               if (error) {
                 console.log(error);
               } else {
                 console.log('Email sent: ' + info.response);
               }
             });
             
     }

     res.status(200).json({
          status: 'success',
          data
     })
}
exports.check_otp = async (req,res) => {

     await storage.init()
     var old_otp = await storage.getItem('OTP')
     var new_otp = req.body.otp;

     if(old_otp == new_otp){
          var data = await register_model.find({email: req.body.email})

          var id = data[0].id;
          var u_password = req.body.password
          console.log('password', u_password);

          if(data)
          {
               var update = await register_model.findByIdAndUpdate(id,{password: u_password})

               res.status(200).json({
               status: 'password change successfully',
               update
          })
          }        
     
     }
     else{
          res.status(200).json({
               status: 'check your otp'
          })
     }
}
