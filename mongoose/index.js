const mongoose = require("mongoose");

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const conn = mongoose.connect(url);
conn.then((db) => {
    console.log('Conected to Server');

    var newDish = Dishes({
        name: 'Uthapizza',
        description: 'test'
    });
    newDish.save().then((dish) => {
        console.log(dish);

        return Dishes.find({}).exec();
    })
        .then((dishes) => {
            console.log(dishes);
            return Dishes.remove({});
        })
        .then(() => {
            return mongoose.disconnect()
        })
    console.log(db.readyState);
});
