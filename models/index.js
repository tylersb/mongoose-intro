// connect to mongo db
// require the mongoose package
const mongoose = require('mongoose')

// create a mongodb URI and tell mongoose to connect to it
const dbName = 'mongooseIntro'
const uri = 'mongodb://127.0.0.1/' + dbName
// console.log(uri)
mongoose.connect(uri)

// use mongoose's connection methods to validate the db connection and do some useful console.logs
const db = mongoose.connection
// connection success
db.once('open', () =>
  console.log(`mongoDB has connected @ ${db.host}:${db.port}  🔗`)
)
// connection failure
db.on('error', (err) =>
  console.log('🔥 the datacenter has burned to the ground:', err)
)

// export all of our models
module.exports = {
  Drink: require('./Drink')
}
