const fs = require("fs");

let removeFile = function (req, res, next) {
    const dateCreateDoc = require('./createFolder');
    
    let obj = req.body;
    let zipName = 'EVA' + obj.shop + '_' + obj.ip.slice(-3);

    let pathZip = `./upload/${dateCreateDoc}/${zipName}.zip`;
    let pathFolder = `./upload/${dateCreateDoc}`;

    fs.unlink((pathZip), (err) => {
        if (err) {
            console.error(err);
        }
    });

    fs.rmSync(pathFolder, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error(err);
        }
    });
};

module.exports = removeFile;