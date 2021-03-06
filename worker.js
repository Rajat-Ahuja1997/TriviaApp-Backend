var admin = require('firebase-admin');
var twilio = require('twilio');

var accountSid = 'AC1295bdfcebc3ead465311e126b19e01b'; // Your Account SID from www.twilio.com/console
var authToken = 'b5815c7adf0f2f38d8c46ced9329a1fe';   // Your Auth Token from www.twilio.com/console

var client = new twilio(accountSid, authToken);

var serviceAccount = require("./json/trivia-446d2-firebase-adminsdk-7qmrg-5848d569cb.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://trivia-446d2-default-rtdb.firebaseio.com'
});

var db = admin.database();

function sendText() {
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
    for (let phone_number of phoneNumbers) {
        const receiver = "+1" + phone_number;
        const body = trivia.random();
        client.messages.create({
            body: body,
            to: receiver,  // Text this number
            from: '+14159426955' // From a valid Twilio number
        });
    }
}

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

sendText();