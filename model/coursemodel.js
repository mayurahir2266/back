var mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({
    
        c_name:{
            type: String
        },
        content_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "content"
        }

})

module.exports = mongoose.model('course', courseSchema)