var express = require('express');
var router = express.Router();
var authModel = require('./models/auth');
var resourceModel = require('./models/resource');

router.get('/resources', function(req, res) {
    let limit = 30;
    resourceModel.getAll().then((resources) => {
        res.statusCode = 200;
        res.send(JSON.stringify(resources));
    });
});

router.post('/resource', function(req, res) {
    if(req.session.user === 'admin' && req.session.loggedIn === true) {
        resourceModel.insert(req.body).then((result) => {
            if(result === true) {
                res.sendStatus(200)
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
});

router.put('/resource/:id', function(req, res) {
    if(req.session.user === 'admin' && req.session.loggedIn === true) {
        resourceModel.update(req.params.id, req.body).then((result) => {
            if(result === true) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
});

router.delete('/resource/:id', function(req, res) {
    if(req.session.user === 'admin' && req.session.loggedIn === true) {
        resourceModel.deleteResource(req.params.id).then((result) => {
            if(result === true) {
                res.sendStatus(200);
            }
            else {
                res.sendStatus(400);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
});

router.post('/auth/login', function(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    if(username === 'admin') {
        authModel.login(username, password).then(function(result) {
            if(result === true) {
                req.session.user = 'admin';
                req.session.loggedIn = true;
                req.session.cookie.maxAge = (7 * 24 * 60 * 60 * 1000);
                res.statusCode = 200;
                res.send(req.session.cookie.maxAge.toString());
            }
            else {
                res.sendStatus(401);
            }
        });
    }
    else {
        res.sendStatus(401);
    }
});

router.get('/auth/logout', function(req, res) {
    req.session.destroy(function(err) {
        if(err) throw err;

        res.clearCookie('connect.sid', { path: '/' });
        res.sendStatus(200);
    });
});

module.exports = router;