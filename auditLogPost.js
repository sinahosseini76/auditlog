const MongoClient = require('mongodb').MongoClient


const auditLogPost = async (req, res) => {

    const auditLog = {
        requestBody: JSON.stringify(req.body.requestBody),
        requestHeader: JSON.stringify(req.body.requestHeader),
        ip :  req.body.ip,
        action : req.body.action,
        statusCode : req.body.statusCode,
        userId : req.body.userId,
        userType : req.body.userType,
        modelType : req.body.modelType,
        modelId : req.body.modelId,
        metaData : JSON.stringify(req.body.metaData),
        createdAt: new Date()
    }



    try {
        const db = await MongoClient.connect(process.env.MONGO_URL)
        const dbo = db.db(process.env.DB_NAME)
        await dbo.collection("logs").insertOne(auditLog)
        await db.close()
        res.status(200).json({
            data: { },
            code: 'success',
            message : 'record created successfully'
        })
    } catch (err) {
        console.log(err)
        if (err) console.log(err)
    }
}

module.exports = auditLogPost