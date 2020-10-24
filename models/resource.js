let { getclient } = require('../config');
let ObjectID = require('mongodb').ObjectID;

async function insert(resource) {
    try {
        let client = getclient();
        let db = client.db('edamantinum');
        let collection = db.collection('resources');
        resource['created_at'] = new Date();
        resource['last_modified'] = new Date();
        await collection.insertOne(resource);
        return true;
    }
    catch(err) {
        return false;
    }
    finally {

    }
}

async function getAll() {
    try {
        let client = getclient();
        let db = client.db('edamantinum');
        let collection = db.collection('resources');
        let result = await collection.aggregate([ { $project: { _id: 0, id: "$_id", title: 1, link: 1, topics: 1 } } ]).toArray();
        return result;
    }
    catch(err) {
        return false;
    }
    finally {

    }
}

async function update(id, resource) {
    try {
        let client = getclient();
        let db = client.db('edamantinum');
        let collection = db.collection('resources');
        let filter = { _id: new ObjectID(id) };
        if('id' in resource) {
            delete resource.id;
        }
        resource['last_modified'] = new Date();
        let updateDocument = { $set: resource };
        let result = await collection.updateOne(filter, updateDocument);
        if(result.modifiedCount === 1 || result.matchedCount === 1) {
            return true;
        }
        else {
            return false;
        }
    }
    catch(err) {
        return false;
    }
    finally {

    }
}

async function deleteResource(id) {
    try {
        let client = getclient();
        let db = client.db('edamantinum');
        let collection = db.collection('resources');
        await collection.deleteOne({ _id: new ObjectID(id) });
        return true;
    }
    catch(err) {
        return false;
    }
    finally {

    }
}

exports.insert = insert;
exports.getAll = getAll;
exports.update = update;
exports.deleteResource = deleteResource;