var coursecontent = require('../model/contentmodel')
var course = require('../model/coursemodel')

exports.add_content = async (req, res) => {

     var id = req.params.id;

     req.body.course_id = id;
    
     var data = await coursecontent.create(req.body)

     await course.findByIdAndUpdate(id,{"content_id":data.id});
     
     res.status(200).json({
          status:'succesfully added',
          data
     })
}

exports.select_content = async (req, res) => {

     var id = req.params.id;

    var data = await coursecontent.findById(id).populate("course_id");

    res.status(200).json({
        status:'view data successfully',
        data
   })
}

exports.delete_content = async (req, res) => {

     v_id = req.params.id

     var data = await coursecontent.findByIdAndDelete(v_id)
     
     res.status(200).json({
          status:'successfully deleted',
          data
     })
}

exports.update_content = async (req, res) => {

     v_id = req.params.id

     var data = await coursecontent.findByIdAndUpdate(v_id, req.body)
     
     res.status(200).json({
          status: 'successfully updated',
          data
     })
}