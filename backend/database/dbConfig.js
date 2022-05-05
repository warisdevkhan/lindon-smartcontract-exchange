const mongoose = require('mongoose')
const Role = require('../models/role.model')

const connOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/air_left'

const connectToDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, connOptions)
    if (connect) {
      console.log(`Mongodb connected - ${connect.connection.host}`)
      initialize()
    }
  } catch (err) {
    console.log(`Database error ${err}`)
  }
}

function initialize() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
module.exports = connectToDB