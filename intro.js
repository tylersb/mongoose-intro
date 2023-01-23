// like sequelize, we will mount our models on a db object
const db = require('./models')

const drinkCRUD = async () => {
    try {
        // CREATE 
        // 1. using the model as a constructor
        // (not async until you save to the db)
        // const newDrink = db.Drink({
        //     name: 'Chocolate milk',
        //     rating: 10
        // })
        // saving the model instance is when the db transaction occurs (async operation)
        // await newDrink.save()
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
        allDrinks.forEach(drink => console.log(`${drink.name} is rated ${drink.rating}`))

        // finding one
        const chocoDrink = await db.Drink.findOne({
            name: 'Chocolate milk'
        })
        // console.log(chocoDrink) 

        // finding by id
        const foundById = await db.Drink.findById("63ced55163534cbd86c3c89b")
        console.log(foundById)

        // UPDATE

        // DESTROY

        process.exit()
    } catch(err) {
        console.log(err)
    }
}

drinkCRUD()