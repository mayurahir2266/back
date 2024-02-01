var course = require('../model/coursemodel')
var coursecontent = require('../model/contentmodel')

exports.add_course = async (req, res) => {

     var data = await course.create(req.body)

     res.status(200).json({
          status:'succesfully added',
          data
     })
}

exports.select_course = async (req, res) => {
     
     var id = req.params.id;

         var data = await course.findById(id).populate("content_id");
         
         res.status(200).json({
              status:'view all courses',
              data
         })
}

exports.delete_course = async (req, res) => {
     v_id = req.params.id;

     var data = await course.findByIdAndDelete(v_id)
     var c_id = data.content_id
     console.log('c_id', c_id);

     var c_data = await coursecontent.findByIdAndDelete(c_id)
     // console.log('c-id', c_data);

     res.status(200).json({
          status:'succesfully deleted',

     })
}

exports.update_course = async (req, res) => {
     v_id = req.params.id
     
     var data = await course.findByIdAndUpdate(v_id, req.body)
     
     res.status(200).json({
          status:'succesfully updated',

     })
}