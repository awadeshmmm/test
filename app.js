var express = require('express')
var app = express()


app.get('/', function (req, res) {
    var remoteAddress = req.headers['x-forwarded-for'] ||   req.connection.remoteAddress;
    res.json({ "ipAddresssdsd": "anu ki maa ki chut" });
	
});

app.listen(process.env.PORT || 80);

