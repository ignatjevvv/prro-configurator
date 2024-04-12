const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();


const fs = require("fs");
const fse = require("fs-extra");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static('public'));

app.keepAliveTimeout = 30 * 1000;
app.headersTimeout = 35 * 1000;


// GET status shop
const getCheckStatusShop = require('./server/modules/status');

// POST to upload module
const creatFolder = require('./server/modules/createFolder'),
      copyCert = require('./server/modules/copy'),
      creatConfigFilePRRO = require('./server/modules/config'),
      createSqlQueryFile = require('./server/modules/createSql'),
      archivation = require('./server/modules/archivation'),
      sendFile = require('./server/modules/sendFileConfig'),
      removeFile = require('./server/modules/remove');

// POST to receipt file
const creatFileReceiptJSON = require('./server/modules/createReceipt'),
      sendReceipt = require('./server/modules/sendReceipt');

app.get('/varification/', [getCheckStatusShop]);
// app.get('/query/', [querySQLcommand, sendResultStatus]);
app.post('/upload/', [creatFolder, copyCert, creatConfigFilePRRO, createSqlQueryFile, archivation, sendFile, removeFile]);
app.post('/receipt/', [creatFileReceiptJSON, sendReceipt]);

app.use(function (req, res) {
    res.sendFile(__dirname + "publick/index.html");
});

app.use(express.static(__dirname + '/public'));

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


// const folderDownload = './download/';
// const folderKey = './data/key/';
// const keyPrro = /[^()]+[(?=))]/g;

// fs.readdir(folderDownload, (err, files) => {
//     files.forEach(file => {
//         if (file != '.DS_Store') {

//             let folderShopName =
//                 file.split('(')[0].replace(/[^+\d]/g, '') +
//                 `/${file.split('(')[0].replace(/[^+\d]/g, '') + '_' +
//                 file.match(keyPrro)[1].split(')')[0].slice(8) + '_' +
//                 file.split('_')[2]}`;

//             fse.copy(`${folderDownload + file}`,
//                 `${folderKey + folderShopName}`, { overwrite: true }, err => {
//                     if (err) {
//                         console.log(`Не удалось скопировать ${file}`);
//                         return;
//                     }

//                     fs.writeFile(`${folderKey + folderShopName}/Key-6.pas`, '32007740' +
//                         folderShopName.split('_')[1], (error) => {
//                             if (error) {
//                                 throw error;
//                             } // не удалось скопировать файл
//                             console.log(`File Key-6.pas written successfully\n`);
//                         });

//                     fs.rmSync(folderDownload + file, { recursive: true, force: true }, (err) => {
//                         if (err) {
//                             console.log(`Не удалось удалить файл ${file}`);
//                             return;
//                         }
//                     });
//                 });

//         }
//     });
// });
