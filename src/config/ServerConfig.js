const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    Flight_service_path:process.env.Flight_service_path,
    MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
    EXCHANGE_NAME: process.env.EXCHANGE_NAME,
    REMINDER_BINDING_KEY: process.env.REMINDER_BINDING_KEY
}
