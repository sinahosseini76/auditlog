const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());



const http = require('http')
const server = http.createServer(app)
const auditLogPost = require('./auditLogPost')
const auditLogGet = require('./auditLogGet')
const createToken = require('./createToken')
const port = process.env.PORT;


app.post('/auditlog',  auditLogPost);
app.get('/auditlog',  auditLogGet);
app.post('/generate-token', createToken);




server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

