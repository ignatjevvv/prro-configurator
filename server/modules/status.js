const fs = require("fs");

let getCheckStatusShop = (req, res, next) => {

    return new Promise(() => {
        const folderKey = "./data/key/";
    
        let shop = req.query.shop;
        let result = "no";
        let keys = [];
    
        fs.readdir(folderKey, (error, file) => {
            file.forEach(file => {
                if (file == shop) {
                    result = "ok";
                    fs.readdirSync(folderKey + shop).forEach(file => {
                        keys.push({key: file});
                    });
                }
            });
    
            res.setHeader('Content-Type', 'application/json');
            res.json({ status: result, keys: keys });
        });
    })
    .catch((err) => console.log(err));
};

module.exports = getCheckStatusShop;