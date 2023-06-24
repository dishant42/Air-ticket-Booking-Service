const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    Flight_service_path:process.env.Flight_service_path
}
