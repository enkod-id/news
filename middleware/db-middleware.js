const { MongoClient} = require('mongodb')

const databaseMiddleware = async (req, res, next) => {
    const mongoClient = await new MongoClient ("mongodb://mongo:7SrVXhXt35C1CnkGHJo7@containers-us-west-61.railway.app:5475").connect()
    db = mongoClient.db('blogs')

    req.db = db

    next()
}

module.exports =  databaseMiddleware