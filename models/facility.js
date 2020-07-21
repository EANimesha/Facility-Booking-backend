const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const FacilitySchema=new Schema({
    name:{
        type:String
    },
    spots:{
        type:Number
    },
    open_time:{
        type:Number
    },
    close_time:{
        type:Number
    }
});


module.exports=Facility=mongoose.model('facilities',FacilitySchema);