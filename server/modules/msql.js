let querySQLcommand = (req, res, next) => {

    console.log(req.query);

    let shop = res.shop;
    let keys = req.query.keys.split(',');

    let data = [];

  
    let config = {
        user: 'sa',
        password: '123',
        server: `${'10.0.1.16'}\\kassa`,
        database: 'GMSData',
        options: {
            trustServerCertificate: true // change to true for local dev / self-signed certs
        }
    };


    (async function () {
        try {
            let pool = await sql.connect(config);
            let a;

            for (let key in keys) {
                a = await pool.request().query(`select crID, finID from r_Crs where Notes like '%${keys[key].split('_')[2]}%'`);
                await data.push(Object.assign({"key": keys[key]}, ...a.recordset));
            }
            
            res.dataQuerySQL = await data;
            await next();
      
          
        } catch (err) {
            // ... error checks
            res.dataQuerySQL = { keys: keys };
            await next();
        }
    })();
    
    sql.on('error', err => {
        // ... error handler
    });
    
};

let sendResultStatus = (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(res.dataQuerySQL);
};