var faculty = require('../model/facultymodel')

exports.add_faculty = async (req, res) => {

    var data = await faculty.create(req.body)

    res.status(200).json({
        status: 'success',
        data
    })
}

exports.find_faculty = async (req, res) => {
    
    v_id = req.params.id
    var data = await faculty.findById(v_id)

    res.status(200).json({
        status: 'success',
        data
    })

}

exports.update_faculty = async (req, res) => {
    
    u_id = req.params.id

    var data = await faculty.findByIdAndUpdate(u_id, req.body)

    res.status(200).json({
        status:'successfully updated'
    })
}

exports.delete_faculty = async (req, res) => {
    v_id = req.params.id

    var data = await faculty.findByIdAndDelete(v_id)

    res.status(200).json({
        status:'successfully deleted'
    })

}