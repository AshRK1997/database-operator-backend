var pg = require('pg');

const getDataDb = async(req, res, next) => {
    try {
    
        let connString = req.body.connString;
        let query = req.body.query;
    
        console.log("getQueryData", connString, query)
    
        var client = new pg.Client(connString);
    
        await client.connect();
        var result = await client.query(query);

        console.log("getQueryData", result?.rows);
    
        await client.end();
        console.log("client closed")
        res.send({ success: true, data: result?.rows });
    
      } catch (e) {
        res.send({ success: false, error: e.message });
        console.log("client error", e)
      }
}

module.exports = { getDataDb }