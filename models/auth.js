var bcrypt = require('bcrypt');
var { getclient } = require('../config');

async function login(username, password) {
    
    try {
        let client = getclient();
        let db = client.db('edamantinum');
        let collection = db.collection('users');
        const user = await collection.findOne({user: username});
        return await bcrypt.compare(password, user.password);
    }
    catch(err) {
        console.log(err);
    }
}

exports.login = login;