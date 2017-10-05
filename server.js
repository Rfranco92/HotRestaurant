// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
{
customerName: "John Doe",
phoneNumber: "555-555-5555",
customerEmail: "jd@mail.com",
customerID: "12345ABC"
},
{
customerName: "bill",
phoneNumber: "555 555 5555",
customerEmail: "bill@bill.org",
customerID: "123456789"
},
{
customerName: "john",
phoneNumber: "5555555555",
customerEmail: "akjsdfnakjsdfn@gmail.com",
customerID: "askdfakjsdf"
},
{
customerName: "afsdfasdf",
phoneNumber: "2353w4twerwe",
customerEmail: "fasdfasdg",
customerID: "gfdasgfd"
},
{
customerName: "asgasdfasdf",
phoneNumber: "asfdasdfas",
customerEmail: "asfdasdfas",
customerID: "asdfasdfasdf"
}
];

var reserveList = []

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:tables?", function(req, res) {
  var chosen = req.params.tables;


  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].customerName) {
        return res.json(tables[i]);
      }
    }

    if (chosen === "waitlist"){
    return res.json(reserveList);
    }
    return res.json(false);


    
  }
  return res.json(tables);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware

  var data = true;
  var newReservation = req.body;
  newReservation.routeName = newReservation.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);
  if (tables.length < 5){
  tables.push(newReservation);
  }
  else{
    reserveList.push(newReservation);
    data = false;
  }
  res.json(data);
});

app.post("/api/clear", function(req, res){
  tables = [];

  for (var i = 0; i < 5; i ++){
    if (reserveList.length > 0){
      tables.push(reserveList[0]);
      reserveList.splice(0, 1)

    }
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
