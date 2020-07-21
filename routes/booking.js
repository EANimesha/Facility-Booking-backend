const express= require('express');
const jwt=require('jsonwebtoken');

const books=express.Router();
const Bookings=require("../models/booking");
const Facility=require("../models/facility");

books.post('/',(req,res,next)=>{
    var user= req.body.user;
    if(user){
        const bookingData={
            uid:user._id,
            facility:req.body.facility,
            date:req.body.date,
            time:req.body.time
        }

        Facility.findOne({
            name:bookingData.facility
        })
        .then(facility=>{
            const spots=facility.spots;

            Bookings.find({
                fid:bookingData.fid,
                date:bookingData.date,
                time:bookingData.time
            }).count()
            .then(bookedSpots=>{
                if(bookedSpots<spots){
                    Bookings.create(bookingData)
                    .then(book=>{
                        res.json({message:'booked a spot'})
                    })
                }
                else{
                    res.status(400).json({error:'no spots available'})
                }
            })

        })
    }
    else{
        res.status(400).json({error:'Unauthorized'})
    }

})


module.exports=books;