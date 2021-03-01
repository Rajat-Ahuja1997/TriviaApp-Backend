var cron = require('node-cron');

var accountSid = 'AC1295bdfcebc3ead465311e126b19e01b'; // Your Account SID from www.twilio.com/console
var authToken = 'b5815c7adf0f2f38d8c46ced9329a1fe';   // Your Auth Token from www.twilio.com/console

var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to: '+12259541125',  // Text this number
    from: '+14159426955' // From a valid Twilio number
})
.then((message) => console.log(message.sid));

//Schedules an event for once a day at 11:59am
// Will probably have to use Heroku scheduler instead of cron job
cron.schedule('59 11 * * *', function() {
    //Retrieve  
  console.log('---------------------');
});
