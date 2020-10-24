'use strict';

let app = require('./app.js');
let { env } = require('./config.js');

if(env === 'prod') {
    require('greenlock-express')
    .init({
        packageRoot: __dirname,

        // where to look for configuration
        configDir: './greenlock.d',

        // whether or not to run at cloudscale
        cluster: false,

        maintainerEmail: 'prashantkumarbarman@gmail.com'
    })
    // Serves on 80 and 443
    // Get's SSL certificates magically!
    .serve(app);
}
else {
    app.listen(80);
}

console.log('Server is listening');