const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

async function createToken(req, res)
{
    const apiToken = req.headers['x-api-key'];
    const data = {
        appName : req.body.appName,
        collectionName : req.body.collectionName,
    }
    const schema = Joi.object({
        appName: Joi.string().required(),
        collectionName: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            data: { },
            code: 'failed',
            message : error.details[0].message
        })
    }


    if (apiToken !== process.env.API_TOKEN) {
        return  res.status(401).json({
            data: {},
            code: 'failed',
            message: 'invalid API token'
        });
    }

    try {
        let appName = data.appName;
        let collectionName = data.collectionName;
        // const hash = await bcrypt.hash(`${appName}:${collectionName}`, 10);
        const payload = {
            appName: appName,
            collectionName: collectionName
        };

        const secret = process.env.JWT_SECRET;
        const options = { expiresIn: '365d' };

        const token =  jwt.sign(payload, secret, options);
        return  res.status(200).json({
            data: {
                token : token,
                appName : appName,
                collectionName : collectionName
            },
            code: 'success',
            message: 'token generated'
        });
    } catch (err) {
        console.error(err);
        return  res.status(401).json({
            data: {},
            code: 'failed',
            message: 'invalid API token'
        });
    }
}

module.exports = createToken


