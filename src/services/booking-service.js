const axios = require("axios");

const { StatusCodes } = require('http-status-codes');
const { BookingRepository } = require("../repository/index");
const { ServiceError } = require("../utils/errors/index");

const { Flight_service_path } = require("../config/ServerConfig")

class bookingService {
    constructor() {
        this.Bookingrepository = new BookingRepository();
    }

    async CreateBooking(data) {
        try {
            const Flightid = data.flightID;

            const getFlightRequestURL = `${Flight_service_path}/api/v1/flight/${Flightid}`;
            const response = await axios.get(getFlightRequestURL);

            const flightdata = response.data.data;

            let priceofflight = flightdata.price
            if (data.noOfSeats > flightdata.totalseats) {
                throw new ServiceError('something went wrong in booking process', 'insuficient seats')
            }

            const totalCost=priceofflight * data.noOfSeats;
            const bookingPayload={...data,totalCost};
            const booking=await this.Bookingrepository.create(bookingPayload);
            
            // now we need to update the flight data 
            const flightupdateURL=`${Flight_service_path}/api/v1/flight/${booking.flightID}`;
            await axios.patch(flightupdateURL,{totalseats:flightdata.totalseats-booking.noOfSeats});
            const finalbooking=await this.Bookingrepository.update(booking.id,{status:"Booked"})//we have done here but when we execute the request we donot see status as booked thus we must update it
            return finalbooking;
            
        } catch (error) {
            console.log(error);
            if (error.name == 'RepositoryError' || error.name == 'ValidationError') { //this was the error that would have come from repository error or due to sequelize validation error
                throw error;
            }
            throw new ServiceError();

        }
    }
}

module.exports = bookingService