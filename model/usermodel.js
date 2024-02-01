var mongoose = require('mongoose')

// Schema
 
var registerSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    conformpassword : {
        type: String
    },
    role:{
        type: String,
        enum: ['1', '2','3'],
        default: '1'
    }
})

module.exports = mongoose.model('register', registerSchema)
