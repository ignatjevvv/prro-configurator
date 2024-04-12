const fs = require("fs");

let creatFileReceiptJSON = function (req, res, next) {
    let obj = req.body;
    let file = `./upload/memory.json`;

    const config = `{
    "Products": [],
    "Operators": [],
    "FiscalReceiptCount": 0,
    "ReturnReceiptCount": 0,
    "NonFiscalReceiptCount": 1,
    "TotalSumIn": 0,
    "Receipt": null,
    "ReturnReceipt": null,
    "NonFiscalReceipt": null,
    "TotalSumOut": 0,
    "DfsLink": null,
    "Header": [
        "ТОВ \\"РУШ\\" Магазин \\"EVA\\"",
        "${obj.Text1}",
        "${obj.Text2}",
        "${obj.Text3}",
        "${obj.Text4}",
        ""
    ],
    "Footer": [
        "",
        ""
    ],
    "LastAddedProduct": null,
    "ReceiptSum": 0.00,
    "LastFiscalNumber": null
}`.trim();

    fs.writeFile(`./upload/memory.json`, config, 'utf8', function (err) {
        if (err) {
            console.log("An error occured while writing JSON Object to File.");
            return console.log(err);
        }

        console.log(`************ memory.json has been saved. ************`);
        next();
    });
};

module.exports = creatFileReceiptJSON;