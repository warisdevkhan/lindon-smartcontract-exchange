require('dotenv').config()
const express = require('express')
const connectToDatabase = require('./database/dbConfig')
const user = require('./routes/user');
const admin = require('./routes/admin');
const wallet = require('./routes/wallet');
const payment = require('./routes/payment');
const kycDetails = require('./routes/kycDetails')
const errorMiddleware = require('./middlewares/error')
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');


var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/ssl/private.key', 'utf8');
var certificate = fs.readFileSync('/etc/ssl/fullchain.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};



app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// express middleware
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.status(400).send('Api working')
})

app.use('/user', user)
app.use('/wallet',wallet)
app.use('/payment',payment)
app.use('/kyc' , kycDetails)
app.use('/admin', admin)
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    errors: [
      {
        msg: 'Route not found',
      },
    ],
  })
})

const PORT = process.env.PORT 

// connectToDatabase().then(_ => {
//   app.listen(PORT, _ => {
//     console.log(`Server started on port ${PORT}`)
//   })
// })


var httpsServer = https.createServer(credentials, app);


httpsServer.listen(PORT);