var admin = require('firebase-admin');
var express = require('express');
var router = express.Router();

var serviceAccount = require("../json/trivia-446d2-firebase-adminsdk-7qmrg-5848d569cb.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://trivia-446d2-default-rtdb.firebaseio.com'
});

var db = admin.database();
var ref = db.ref("/phone_numbers");

router.post("/", (req, res, next) => {
    ref.update({
        [req.body.user.number]: "subscribed"
    });
})

module.exports = router;