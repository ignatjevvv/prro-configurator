const fs = require('fs');
const fsPromises = require('fs').promises;


let copyCert = function (req, res, next) {
    const dateCreateDoc = require('./createFolder');
    const obj = req.body;
    const folderKeyShop = `./data/key/${obj.shop}/${obj.key}/`;
    const folderUploadShop = `./upload/${dateCreateDoc}/EVA${obj.shop}/${obj.key}/CurrentRegister/${obj.fiscalNumber}/`;
    const filesNamesToCopy = ['Key-6.dat', 'Key-6.pas'];

    new Promise((resolve) => {
        fs.readdir(folderKeyShop, (err, files) => {
            let arr = [{
                fileName: 'CACertificates.p7b',
                src: './files/CurrentRegister/000000000/Cert/CACertificates.p7b',
                dest: '/Cert/CACertificates.p7b',
            }];

            filesNamesToCopy.map(itemName => {
                for (let file of files) {
                    if (file.endsWith(itemName)) {
                        arr.push({
                            fileName: file,
                            src: folderKeyShop + file,
                            dest: file.split('.')[1] === 'cer' ? '/Cert/' + file : '/99/' + file,
                        });
                    }
                }
            });

            resolve(arr);
        });

    }).then((fileReferenceToCopy) => {
        
        let a = fileReferenceToCopy.map(item => {
            return fsPromises.copyFile(item.src, folderUploadShop + item.dest)
            .then(() => {
                console.log(`Файл ${item.fileName} успешно скопирован`);
            })
            .catch(function (error) {
                console.log(error);
            });
        });

        return a;

    }).then((a) => {
        Promise.all(a).then(() => {
            next();
        });
    });
};

module.exports = copyCert;
