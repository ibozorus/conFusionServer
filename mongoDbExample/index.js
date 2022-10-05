const MongoClient = require('mongodb').MongoClient;
const dbop = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

console.log("MongoDB Example running");


/**
 * With Callback Functions
 * */
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


/**
 * With Promises
 * */
//
// var mClient;
// MongoClient.connect(url)
//     .then((client) => {
//             console.log('Connected to server');
//             const db = client.db(dbname);
//             mClient = client;
//             const collection = db.collection('dishes');
//             return collection;
//         }
//     )
//     .then(collection => {
//             const result = collection.insertOne({"name": "Icli Kofte", "description": "test"})
//             console.log("After Insert:\n");
//             console.log(result.insertedId);
//             return collection;
//         }
//     ).then(collection => {
//         return collection.find({}).toArray();
//     }
// ).then(found => {
//         console.log('Found:\n');
//         console.log(found);
//         return mClient.close();
//     }
// )
//     .catch((err) => {
//         console.log("ERRORRR!");
//         console.log(err);
//     });

/**
 * With imported DB-Operations from operations.js
 *
 *
 * */
MongoClient.connect(url)
    .then((client) => {
            console.log('Connected to server');
            const db = client.db(dbname);
            const usedVars = {"coll": "dishes", "db": db, "client": client};
            return usedVars;
        }
    )
    .then(uV => {
            dbop.insertDocument(uV.db, {name: "Donut", description: "Example Zort"}, uV.coll, (err, result) => {
                console.log('Insert Document:\n', result);
            });
            return uV;
        }
    )
    .then(uV => {
            dbop.findDocuments(uV.db, uV.coll, (docs) => {
                console.log("Found Documents:\n", docs);
            });
            return uV;
        }
    )
    .then(uV => {
            dbop.updateDocument(uV.db, {name: "Donut"}, {description: "Updated Description"}, uV.coll, (result) => {
                console.log('Updated Document:\n', result);
            });
            return uV;
        }
    )
    .then((uV) => {
        dbop.findDocuments(uV.db, uV.coll, (docs) => {
            console.log("Found Documents(2):\n", docs);
            uV.client.close()
        });

        return null;
    })
    .catch((err) => {
        console.log("ERRORRR!");
        console.log(err);
    });
