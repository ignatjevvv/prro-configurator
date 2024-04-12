const fs = require("fs");
const fse = require('fs-extra');

const folderDownload = './download/';
const folderKey = './data/key/';
const keyPrro = /[^()]+[(?=))]/g;

fs.readdir(folderDownload, (err, files) => {
    files.forEach(file => {
        if (file != '.DS_Store') {

            let folderShopName =
                file.split('(')[0].replace(/[^+\d]/g, '') +
                `/${file.split('(')[0].replace(/[^+\d]/g, '') + '_' +
                file.match(keyPrro)[1].split(')')[0].slice(8) + '_' +
                file.split('_')[2]}`;

            fse.copy(`${folderDownload + file}`,
                `${folderKey + folderShopName}`, { overwrite: true }, err => {
                    if (err) {
                        console.log(`Не удалось скопировать ${file}`);
                        return;
                    }

                    fs.writeFile(`${folderKey + folderShopName}/Key-6.pas`, '32007740' +
                        folderShopName.split('_')[1], (error) => {
                            if (error) {
                                throw error;
                            } // не удалось скопировать файл
                            console.log(`File Key-6.pas written successfully\n`);
                        });

                    fs.rmSync(folderDownload + file, { recursive: true, force: true }, (err) => {
                        if (err) {
                            console.log(`Не удалось удалить файл ${file}`);
                            return;
                        }
                    });
                });

        }
    });
});