// Create a Stripe client.
var stripe = require("stripe")("sk_test_ENTER_PRIVATE_TEST_KEY_HERE");
var express = require("express");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/success", function (req, res) {
  res.sendFile(__dirname + '/success.html');

});

// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:


app.post("/charge", function (req, res) {
  const token = req.body.stripeToken;
  const chargeAmount = req.body.chargeAmount;
  const charge = stripe.charges.create ({
    amount: chargeAmount, 
    currency: "usd", 
    source: token,
  
  }, function (err, charge){
    if (err === "StripeCardError"){
      console.log ("Sorry bur this card was declined")
    }
  });
  console.log("Your payment was successful")
  res.redirect("/success")
});

app.listen(3000, function () {
  console.log("stripe is up and running!");
});















