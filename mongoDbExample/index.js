const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

console.log("MongoDB Example running");


//With Callback Functions
// MongoClient.connect(url, (error, client) => {
//     assert.equal(error, null);
//
//     console.log('Connected to server');
//
//     const db = client.db(dbname);
//     const collection = db.collection('dishes');
//
//     collection.insertOne({"name": "Cigkofte", "description": "test"}, (error, result) => {
//         assert.equal(error, null);
//         console.log("After Insert:\n");
//         console.log(result.ops);
//
//         collection.find({}).toArray((error, docs) => {
//             assert.equal(error, null);
//             console.log('Found:\n');
//             console.log(docs);
//
//             // db.dropCollection('dishes', (error, result) => {
//             //     assert.equal(error, null);
//             //     client.close();
//             // })
//             client.close();
//         });
//
//     });
// });
//With Promises
var mClient;
MongoClient.connect(url)
    .then((client) => {
            console.log('Connected to server');
            const db = client.db(dbname);
            mClient = client;
            const collection = db.collection('dishes');
            return collection;
        }
    )
    .then(collection => {
            const result = collection.insertOne({"name": "Lahmacun", "description": "test"})
            console.log("After Insert:\n");
            console.log(result.insertedId);
            return collection;
        }
    ).then(collection => {
        return collection.find({}).toArray();
    }
).then(found => {
        console.log('Found:\n');
        console.log(found);
        return mClient.close();
    }
)
    .catch((err) => {
        console.log(err);
    });
