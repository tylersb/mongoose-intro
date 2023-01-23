// like sequelize, we will mount our models on a db object
const db = require('./models')

const drinkCRUD = async () => {
  try {
    // CREATE
    // 1. using the model as a constructor
    // (not async until you save to the db)
    const newDrink = db.Drink({
      name: 'Chocolate milk',
      rating: 10
    })
    // saving the model instance is when the db transaction occurs (async operation)
    await newDrink.save()
    // 2. directly writing to the db
    // const secondDrink = await db.Drink.create({
    //     name: 'Strawberry Milk',
    //     rating: 0
    // })

    // console.log(secondDrink)

    // READ
    // finding many
    // db.model.find({ key/val pairs to matach })
    const allDrinks = await db.Drink.find({}) // returns an array
    allDrinks.forEach((drink) =>
      console.log(`${drink.name} is rated ${drink.rating}`)
    )

    // finding one
    const chocoDrink = await db.Drink.findOne({
      name: 'Chocolate milk'
    })
    // console.log(chocoDrink)

    // finding by id
    const foundById = await db.Drink.findById('63ced55163534cbd86c3c89b')
    // console.log(foundById)

    // UPDATE
    // mathod 1: modifying and saving a model instance
    // find something in the db
    const strawberryMilk = await db.Drink.findOne({
      name: 'Strawberry Milk'
    })
    // update the values
    strawberryMilk.rating = -1 // (not async)
    // save to the db (this part is the asynv update)
    await strawberryMilk.save()

    // findByIdAndUpdate/findOneAndUpdate both work similarly
    // findOneAndUpdate({ query to search for }, { fields to update }, { options })
    const updatedMilk = await db.Drink.findOneAndUpdate(
      { name: 'Choco Milk' }, // what we are searching for
      { name: 'Choco Milk', rating: 15 }, // what to update
      { new: true } // can you please show us the new values, not the old ones
    )
    console.log(updatedMilk)

    // upsert example
    const upsertedMilk = await db.Drink.findOneAndUpdate(
      { name: 'Banana Milk' }, // what is tries to find for the upsert
      { rating: 8 }, // this will be inserted if banana milk is not found
      { new: true, upsert: true } // tell mongoose to upsert, and show us the most recent values
    )

    console.log(upsertedMilk)
    // DESTROY
    // findByIdAndDelete findOneAndDelete
    // findOneAndDelete({ what to search for and delete })
    const wasDeleted = await db.Drink.findOneAndDelete({
      name: 'Strawberry Milk'
    })
    console.log(wasDeleted) // returns the thing that was deleted
    // process.exit()
  } catch (err) {
    console.log(err)
  }
}

drinkCRUD()
