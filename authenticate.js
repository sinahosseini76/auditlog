const moment = require("moment-jalaali");
const MongoClient = require('mongodb').MongoClient
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authenticate(token) {
    if (token == undefined || token == '') {
        return  {
            data: {},
            code: 'failed',
            message: 'Unauthorized'
        };
    }
    try {
        // Verify the token and extract the payload (i.e. the hash)
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        // Retrieve the collection name and database name from the payload
        const appName = payload.appName;
        const collectionName = payload.collectionName;
        // Perform additional validation as needed (e.g. check if the user has access to the specified collection)

        // Store the collection name and database name in the request object for use in subsequent middleware or route handlers
        return  {
            data: {
                appName : appName,
                collectionName : collectionName
            },
            code: 'success',
            message: 'Unauthorized'
        };

    } catch (err) {
        console.log(err)
        return  {
            data: {},
            code: 'failed',
            message: 'Unauthorized'
        };
    }

}

module.exports = authenticate
