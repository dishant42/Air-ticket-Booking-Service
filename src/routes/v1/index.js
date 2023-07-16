const express = require('express');
const {BookingController} = require("../../controllers/index")

// SyntaxError: await is only valid in async functions and the top level bodies of modules

const bookingController=new BookingController();

const router = express.Router();


router.post("/booking", bookingController.create);
router.post("/publish",bookingController.PublishMessage);
module.exports = router;