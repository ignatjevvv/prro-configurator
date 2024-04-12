let sendFileJson = function (req, res, next) {
    let obj = req.body;
    let file = `./upload/memory.json`;

    res.download(file, function (err) {
        if (err) {
            // Handle error, but keep in mind the response may be partially-sent
            // so check res.headersSent
        } else {
            // decrement a download credit, etc.
            next();
        }
    });
};

module.exports = sendFileJson;