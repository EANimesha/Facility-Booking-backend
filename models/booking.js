const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const BookingSchema=new Schema({
    facility:{
        type:String
    },
    uid:{
        type:String
    },
    date:{
        type:Date
    },
    time:{
        type:Number
    }
});


module.exports=Booking=mongoose.model('bookings',BookingSchema);