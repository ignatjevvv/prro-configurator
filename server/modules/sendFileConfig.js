let sendFile = function (req, res, next) {
    const dateCreateDoc = require('./createFolder');

    const obj = req.body;
    const zipName = 'EVA' + obj.shop + '_' + obj.ip.slice(-3);
    const file = `./upload/${dateCreateDoc}/${zipName}.zip`;

    res.setHeader('Content-Disposition', 'attachment;filename=' + zipName);

    res.status(200).download(file, function (err) {
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
            console.log(res.headersSent);
            console.log(err);
        } else {
            // console.log(res.headersSent);
            // decrement a download credit, etc.
            console.log(`Архив ${zipName} отправлен пользователю`);
            next();
        }
    });
};

module.exports = sendFile;