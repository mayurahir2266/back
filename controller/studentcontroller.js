var student = require('../model/studentmodel');
 
var current_date = new Date;

var month  = current_date.getMonth();
var year = current_date.getFullYear();
var date = current_date.getDate();

function getinstallments(year, month){
    return new Date(year, month,0).getDate();
}

//create an array of the dates in question

function getpaymentdate(year, startMonth, Month, termmonth, amount ){
    return Array.from({length: termmonth}, (v, monthset) => {

        const days = getinstallments(year, startMonth +monthset );

        if(month <=days){
            return new Date(year, startMonth +monthset, Month)
        }else
        {
            return new Date(year, startMonth + monthset, 0)
        }
    });
}

// test with some different payment days....

const days = [1];

for(let dom of days){
    var datee = getpaymentdate(year, month, dom, 5).map(d => d.toLocaleDateString([]))
    var amount = 10000;
    console.log(datee);
}

for (let i=0;i<5;i++)
{
    var install = [datee[i], amount]
    console.log(install);
}

exports.add_student = async (req, res) => {

    req.body.image = req.file.originalname;
    
    req.body.installment = datee;
  
    
    var data = await student.create(req.body)

    res.status(200).json({
        status: 'success',
        data
    })
}

exports.find_student = async (req, res) => {
    var v_id = req.params.id;
    // var name = req.params.name;
    // var contact_number = req.params.contact_number;

    var data = await student.findById(v_id).populate('content_id')
    console.log('id', data);

    res.status(200).json({
        status: 'success',
        data
    })
}

exports.delete_student = async (req, res) => {
    v_id = req.params.id

    var data = await student.findByIdAndDelete(v_id)

    res.status(200).json({
        status:'delete successfully'
    })
}

exports.update_student = async (req, res) => {
    v_id = req.params.id

    var data = await student.findByIdAndUpdate(v_id, req.body)

    res.status(200).json({
        status:'updated successfully',
        data
    })
}
