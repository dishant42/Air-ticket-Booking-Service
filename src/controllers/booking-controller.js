const {bookingService}=require("../services/index");
const { StatusCodes } = require('http-status-codes');

const BookingService=new bookingService();

const create=async(req,res)=>{
    try {
        const response=await BookingService.CreateBooking(req.body);
        console.log("from booking controller",response)
        return res.status(StatusCodes.OK).json({
            message: 'Successfully completed booking',
            success: true,
            err: {},
            data: response
        })
    } catch (error) {
        console.log("from booking controller",error)
        return res.status(error.statusCode).json({
            message:error.message,
            success:false,
            err:error.explanation,
            data:{}
        })
    }
}

module.exports={
    create
}