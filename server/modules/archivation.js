const zipper = require("zip-local");

let archivation = function (req, res, next) {
    const dateCreateDoc = require('./createFolder');

    let obj = req.body;
    let zipName = 'EVA' + obj.shop + '_' + obj.ip.slice(-3);

    new Promise((resolve, reject) => {
        zipper.zip(`./upload/${dateCreateDoc}/EVA${obj.shop}`, function (error, zipped) {
            if (error) {
                reject(error);
            } else {
                // or save the zipped file to disk
                zipped.compress().save(`./upload/${dateCreateDoc}/${zipName}.zip`, function (error) {
                    if (!error) {
                        resolve();
                    }
                });
            }
        });
    }).then(() => {
        next();
    });

};

module.exports = archivation;