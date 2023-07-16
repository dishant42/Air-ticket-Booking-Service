const { bookingService } = require("../services/index");
const { StatusCodes } = require('http-status-codes');

const { createChannel, publishMessage,getChannel } = require('../utils/messageQueues');
const { REMINDER_BINDING_KEY } = require('../config/ServerConfig');

const BookingService = new bookingService();

class BookingController {
    constructor() {

    }

    async PublishMessage(req, res) {
        // const channel = await getChannel();
        const channel=await createChannel();

        const payload = { 
            data:{
                subject:"this is a noti from queue",
                content:"subscribed by queue",
                recepient_Mail :"dishantgarg57@gmail.com ",
                NotificationTime:"2023-07-13T15:16:51"
            },
            service:"CREATE_TICKET"
        };

        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
        return res.status(StatusCodes.OK).json({
            message:"Succesfully published the event"
        })
    }

    async create (req, res) {
        try {
            const response = await BookingService.CreateBooking(req.body);
            console.log("from booking controller", response)
            return res.status(StatusCodes.OK).json({
                message: 'Successfully completed booking',
                success: true,
                err: {},
                data: response
            })
        } catch (error) {
            console.log("from booking controller", error)
            return res.status(error.statusCode).json({
                message: error.message,
                success: false,
                err: error.explanation,
                data: {}
            })
        }
    }
}



module.exports = BookingController