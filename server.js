var path = require('path')
var express = require('express')
var app = express()
var port = 2000

app.use('/', express.static(path.join(__dirname, "Restaurant")))

app.listen(port)
console.log('Listening on port ', port)