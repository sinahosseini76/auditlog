const MongoClient = require('mongodb').MongoClient
const Joi = require('joi');
const authenticate = require("./authenticate");



const auditLogPost = async (req, res) => {

    const token = req.headers['authorization']
    const checkedToken = await authenticate(token)

    if (checkedToken.code == 'failed') {
        return res.status(401).json({
            message: 'unauthorized',
            code: 'failed',
        })
    }



    const auditLog = {
        requestBody: JSON.stringify(req.body.requestBody),
        requestHeader: JSON.stringify(req.body.requestHeader),
        endPoint: JSON.stringify(req.body.endPoint),
        finished: req.body.finished,
        ip :  req.body.ip,
        action : req.body.action,
        statusCode : req.body.statusCode,
        userId : req.body.userId,
        userType : req.body.userType,
        modelType : req.body.modelType,
        modelId : req.body.modelId,
        changed : JSON.stringify(req.body.changed),
        metaData : JSON.stringify(req.body.metaData),
        createdAt: new Date()
    }


    const schema = Joi.object({
        requestBody: Joi.object().required(),
        requestHeader: Joi.object().required(),
        endPoint : Joi.object().keys(
            {
                path: Joi.string().required(),
                method: Joi.string().required()
            }
        ).required(),
        finished : Joi.boolean().required(),
        ip: Joi.string().required(),
        action: Joi.string().required(),
        statusCode: Joi.number().integer().required(),
        userId: Joi.number().integer().required(),
        userType: Joi.string().required(),
        modelType: Joi.string().required(),
        modelId: Joi.number().integer().required(),
        changed: Joi.object().keys(
            {
                before: Joi.object().required(),
                after: Joi.object().required()
            }
        ).required(),
        metaData: Joi.object().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            data: { },
            code: 'failed',
            message : error.details[0].message
        })
    }



    try {
        const db = await MongoClient.connect(process.env.MONGO_URL)
        const dbo = db.db(checkedToken.data.appName)
        await dbo.collection(checkedToken.data.collectionName).insertOne(auditLog)
        await db.close()
        return  res.status(200).json({
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