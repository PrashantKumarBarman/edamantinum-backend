const { get } = require('./apiRoutes');

const MongoClient = require('mongodb').MongoClient;

let client = null;

async function connect() {
    try {
        client = await MongoClient.connect('mongodb://mongo-root:rooteight@localhost:27017/edamantinum?authSource=admin', { useUnifiedTopology : true });
        return client;
    }
    catch(err) {
        console.log(err);
    }
    
}

function getclient() {
    return client;
}

module.exports.connect = connect;
module.exports.getclient = getclient;
module.exports.env = 'dev';