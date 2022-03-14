var mongoose=require('mongoose')

var infoschema=mongoose.model('infoschema', new mongoose.Schema(
    {
        id:Number,
        name:String,
        location:String,
        country:String
    }
), 'infoschema')

module.exports=infoschema

