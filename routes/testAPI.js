var express = require('express')
var router = express.Router();

var accountSid = 'AC1295bdfcebc3ead465311e126b19e01b'; // Your Account SID from www.twilio.com/console
var authToken = 'b5815c7adf0f2f38d8c46ced9329a1fe';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);


router.post("/", (req, res, next) => {
    res.send(req.body.user.name);
    client.messages.create({
    body: req.body.user.name,
    to: '+12102097089',  // Text this number
    from: '+14159426955' // From a valid Twilio number
    })
    // .then((message) =>     res.send(message.sid));
})

module.exports = router;