const fs = require("fs");

let creatFolder = function (req, res, next) {
    const obj = req.body;
    const dateCreateDoc = new Date().getTime();

    console.log(obj);

    const path = `./upload/${dateCreateDoc}/EVA${obj.shop}/${obj.key}/CurrentRegister/${obj.fiscalNumber}`;

    let pathMap = new Map([
        ['fiscalNumber', path],
        ['99', path + '/99'],
        ['cert', path + '/Cert'],
    ]);

    new Promise(() => {
        const promises = Array.from(pathMap.values()).map((pathItem) => {
            return new Promise((resolve, reject) => {
                fs.mkdir(pathItem, { recursive: true }, (error) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve();
                    }
                });
            });
        });

    Promise.all(promises)
        .then(() => {
            next();
        })
        .catch((err) => {
            throw err;
        });
    });

    module.exports = dateCreateDoc;
};

module.exports = creatFolder;