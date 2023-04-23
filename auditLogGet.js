const MongoClient = require('mongodb').MongoClient
const moment = require('moment-jalaali');



const auditLogGet = async (req, res) => {
    try {
        const db = await MongoClient.connect(process.env.MONGO_URL)
        const dbo = db.db(process.env.DB_NAME)
        const logsCollection = dbo.collection('logs');

        const page = parseInt(req.query.page) || 1; // Default to page 1
        const limit = parseInt(req.query.limit) || 10; // Default to 10 logs per page
        const skip = (page - 1) * limit;



    
        // Retrieve all logs
        // const logs = await collection.find().sort({ _id: -1 }).skip(skip).limit(limit).toArray();
        const [logs, count] = await Promise.all([
            logsCollection.find().skip(skip).limit(limit).toArray(),
            logsCollection.countDocuments()
        ]);

        const formattedLogs = logs.map(log => ({
            requestBody: JSON.parse(log.requestBody),
            requestHeader: JSON.parse(log.requestHeader),
            ip: log.ip,
            action: log.action,
            statusCode: log.statusCode,
            userId: log.userId,
            userType: log.userType,
            modelType: log.modelType,
            modelId: log.modelId,
            metaData: JSON.parse(log.metaData),
            createdAt : log.createdAt,
            createdAtJalali: moment(log.createdAt).format('jYYYY/jMM/jDD HH:mm:ss')
          }));
    
        // Send response with logs
        res.status(200).json({
          data: {
            logs: formattedLogs,
            count,
            page,
            limit 
          },
          code: 'success',
        });
      } catch (err) {
        console.log('Error retrieving logs', err);
        res.status(500).json({
          error: {
            message: 'Failed to retrieve logs',
          },
          code: 'error',
        });
      }
}

module.exports = auditLogGet