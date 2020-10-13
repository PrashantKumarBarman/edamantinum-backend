// for generate random secure strings
/* var srs = require('secure-random-string');

srs(function(err, sr) {
    console.log(sr);
}) */

// for password hashing hash generation and verification
// bcrypt is used

const bcrypt = require('bcrypt');
const saltRounds = 10;
const plaintextPassword = "4GKkIA1PvXMERE6rNuVij8DfyWxpxO-k";

/*bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
    console.log(hash);
});*/

bcrypt.compare(plaintextPassword, "$2b$10$a//7JsK1NbvqaRLnour58uh77EOPDvS88nCoxR/yNW9NA.OjKIRNS", function(err, result) {
    if(err) throw err;

    console.log(result);
});