var mongoose = require('mongoose');

var roleSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        unique:true
    },

    description:{
        type:String,
        default:""
    },

    status:{
        type:Boolean,
        default:true
    }

},
{timestamps:true}
)

module.exports = mongoose.model("Role",roleSchema)