// require the mongoose package
const mongoose = require('mongoose')

// define the 'mongoose schema' which is key/values pairs of what we want our model to be
// type definitions, validations and mongoose options all go in the schema
// mongoose.Schema({ key/val pairs for the model }, { options object (mongose config) })
const DrinkSchema = new mongoose.Schema({
    // each key in the object will be a field in the db
    name: {
        type: String // types can be any valid js primitive or refernce type
    },
    rating: {
        type: Number
    }
}, {
    timestamps: true // mongoose will manage created at and updated at fields for us
})

// turn the schema into a model so we can use it in our js
module.exports = mongoose.model('Drink', DrinkSchema)