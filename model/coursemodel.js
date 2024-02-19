var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    
        c_name:{
            type: String
        },
        course_fee:{
            type: String,
            ref: "content"
        }

})

module.exports = mongoose.model('course', courseSchema)