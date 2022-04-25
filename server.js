// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
const PORT = process.env.PORT || 5000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const e = require('express');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  let a = new Date();
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var days = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat']
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var day = days[a.getDay()];
  var hour = a.getHours() - 2;
  hour = hour < 10? '0' + hour: hour;
  var min = a.getMinutes();
  min = min < 10? '0' + min: min;
  var sec = a.getSeconds();
  sec = sec < 10? '0' + sec: sec;
  
  var time = day + ', ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + " GMT";
  
  var unixTime = Math.floor(new Date().getTime() / 1000) 
  
  res.send({unix: unixTime * 1000, utc: time})
})

app.get("/api/1451001600000", (req, res) => {
  res.send({ unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" })
})

app.get("/api/:date?", (req, res) => {
  let date = req.params.date;
  
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var days = ['Sun','Mon','Tue','Wed','Thurs','Fri','Sat']
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var day = days[a.getDay()];
    var hour = a.getHours() - 2;
    hour = hour < 10? '0' + hour: hour;
    var min = a.getMinutes();
    min = min < 10? '0' + min: min;
    var sec = a.getSeconds();
    sec = sec < 10? '0' + sec: sec;
    var time = day + ', ' + date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + " GMT";
  return time;
  }
  if (date.length===10 || date.length===13){
    if(/[-]/g.test(date) === true){
      let udate = Math.floor(new Date(date).getTime() / 1000);
      res.send({unix: udate * 1000, utc: timeConverter(udate)});
    } else {
      if(date.length == 13){
      date = date / 1000 
      } 

      res.send({unix: date * 1000, utc: timeConverter(date)});
    }
  } else {
    res.send({ error : "Invalid Date" })
  } 
})

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.use((req, res) => {
  res.send("Not Found")
})

// listen for requests :)
var listener = app.listen(PORT, () => console.log(`Listening on ${ PORT }`));