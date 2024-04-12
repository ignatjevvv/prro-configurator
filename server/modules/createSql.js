const fs = require("fs");

let createSqlQueryFile = function (req, res, next) {
    const dateCreateDoc = require('./createFolder');

    let obj = req.body;
    let fileNameSQL = 'terminal.sql';

    if (!obj.terminal) {
        return next();
    } else {

        let sqlCommand =
            `USE GMSData` +
            `\nGO\n` +
            `UPDATE GMSData.dbo.r_CRs SET CashType=50, NetPort=9100, IP='${obj.ip}' WHERE CRID = ${obj.crid}` +
            `\nGO\n` +
            `INSERT INTO GMSData.dbo.r_CRPosPays VALUES (${obj.crid}, ${obj.terminal}, 1, 1, '\\home\\cashier\\PDF\\')`
                .trim();

        new Promise((resolve, reject) => {
            fs.writeFile(`./upload/${dateCreateDoc}/EVA${obj.shop}/${fileNameSQL}`, sqlCommand, 'utf8', function (err) {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    reject(err);
                    return console.log(err);
                } else {
                    resolve();
                }
            });
        }).then(() => {
            console.log(`********* File ${fileNameSQL} has been saved for ${'EVA' + obj.shop} *********`);
            next();
        });
    }
};

module.exports = createSqlQueryFile;