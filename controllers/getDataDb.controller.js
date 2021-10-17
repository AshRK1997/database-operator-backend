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
        let data = result?.rows || [];
        let keys = Object.keys(data[0]);

        for (let i = 0; i < data?.length; i++){
            let obj = {...data[i]}
            for (let key=0; key < keys?.length; key++){
                console.log("obj[keys[key]]", data[i][keys[key]])
                if (typeof obj[keys[key]] === 'object' && obj[keys[key]] !== null  && obj[keys[key]] !== undefined && new Date(obj[keys[key]]).toString() === 'Invalid Date') {
                    
                    data[i][keys[key]] = JSON.stringify(obj[keys[key]])
                    console.log("Json stringified", obj[keys[key]]);
                }
            }

        }

        console.log("obj[keys[key]]", data)

        res.send({ success: true, data: data });
    
      } catch (e) {
        res.send({ success: false, error: e.message });
        console.log("client error", e)
      }
}

module.exports = { getDataDb }