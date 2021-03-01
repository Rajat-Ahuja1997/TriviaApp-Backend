var admin = require('firebase-admin');
var express = require('express');
var router = express.Router();
var twilio = require('twilio');

var accountSid = 'AC1295bdfcebc3ead465311e126b19e01b'; // Your Account SID from www.twilio.com/console
var authToken = 'b5815c7adf0f2f38d8c46ced9329a1fe';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);
var db = admin.database();

router.post("/", (req, res, next) => {
    let trivia = [];
    var triviaRef = db.ref("/Trivia");
    triviaRef.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            trivia.push(data.val().Question);
        });
    });
    var phoneRef = db.ref("/phone_numbers");
    phoneNumbers = []
    phoneRef.orderByValue().equalTo("subscribed").on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            phoneNumbers.push(data.key);
        })
    });
    console.log("reached here");

    for (let phone_number of phoneNumbers) {
        const receiver = "+1" + phone_number;
        console.log(receiver);
        const body = trivia.random();
        console.log(body);
        client.messages.create({
            body: body,
            to: receiver,  // Text this number
            from: '+14159426955' // From a valid Twilio number
        })
    }
});

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

module.exports = router;