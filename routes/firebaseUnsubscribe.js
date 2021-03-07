var admin = require('firebase-admin');
var express = require('express');
var router = express.Router();



var db = admin.database();
var ref = db.ref("/phone_numbers");

router.post("/", (req, res, next) => {
    let trivia = [];
    var triviaRef = db.ref("/Trivia");
    triviaRef.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            trivia.push(data.val().Question);
        });
    });
    phoneNumbers = []
    ref.orderByValue().equalTo("subscribed").on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            phoneNumbers.push(data.key);
        })
        
    })
    console.log(phoneNumbers);
    if (phoneNumbers.includes(req.body.user.number)) {
        ref.update({
            [req.body.user.number]: "unsubscribed"
        }, () => {
            res.send("Your phone number has been successully unsubscribed from TriviaTexter!");
        });
    } else {
        res.send("You have not previously subscribed your phone number with TriviaTexter!")
    }
});


Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

module.exports = router;