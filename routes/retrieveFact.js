var admin = require('firebase-admin');
var express = require('express');
var router = express.Router();
var db = admin.database();

router.get("/", (req, res, next) => {
    let trivia = [];
    var triviaRef = db.ref("/Trivia");
    triviaRef.on("value", function(snapshot) {
        snapshot.forEach(function(data) {
            trivia.push({"Question": data.val().Question, "Answer": data.val().Answer});
        });
    });
    const triviaFact = trivia.random();
    res.send(triviaFact);
});

Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
}

module.exports = router;