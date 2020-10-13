const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

let buildpath = __dirname + path.sep + '..' + path.sep + 'frontend';
let movepath = __dirname + path.sep + 'build';
let totaldir = 0;
let totalbuildfinished = 0;
let totalmoved = 0;

(async function() {
    let result = await fs.promises.readdir(buildpath, { withFileTypes: true });
    result.forEach((dir) => {
        if(dir.isDirectory()) {
            totaldir++;
            exec("npm run build", { cwd: (buildpath + path.sep + dir.name) } ,function(error, stdout, stderr) {
                if(error) {
                    console.log(`error: ${error.message}`);
                    return;
                }

                if(stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                totalbuildfinished++;
                console.log(`Build ${totalbuildfinished}/${totaldir} completed`);
                fs.rename((buildpath + path.sep + dir.name + path.sep + 'build'), (movepath + path.sep + dir.name), function(err) {
                    if(err) {
                        throw err
                    }
                    else {
                        totalmoved++;
                        console.log(`Moved ${totalmoved}/${totaldir}`);
                    }
                    if(totalmoved == totaldir) {
                        console.log("Task completed successfully");
                    }
                });
            });
        }
    });
})();
