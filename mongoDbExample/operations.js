const assert = require('assert');

exports.insertDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.insertOne(document).then((result) => {
        console.log('Inserted' + result +
            'documents into the collection' + collection);
        callback(result);

    });

};
exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find({}).toArray()
        .then((docs) => callback(docs))
        .catch((err) => {
            console.error(err);
        })

};
exports.removeDocument = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document)
        .then(result => {
            console.log(`Removed the document ${document}`);
            callback(result);
        })
        .catch((err) => {
            console.error(err);
        })

};
exports.updateDocument = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, {$set: update}, null)
        .then((result) => {
            console.log(`Updated the document ${document}`);
            callback(result);
        })
        .catch((err) => {
            console.error(err);
        })

};
