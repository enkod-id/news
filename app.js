const express = require('express')
const { ObjectId } = require('mongodb')
const databaseMiddleware = require('./middleware/db-middleware.js')

const app = express()

app.use(express.json())

app.use(databaseMiddleware)


app.use('blogs', () => {
    console.log('blogs')
})


//crud
app.get('/', (req, res) => {
    res.send('my app')
})

app.get('/users', async (req, res) => {
    const users = await db.collection('users').find().toArray()

    res.status(200).json({
        message: 'success',
        data: users
    })
})


app.post('/users', async (req, res) => {
    const {username, email, password } = req.body

    const user = await db.collection('users').insertOne(req.body) 
    res.status(200).json({
        message: 'success',
        data:user
    })   
})


// get user by id
app.get('/users/:id', async (req, res) => {
    const id = req.params
    const user = await db.collection('users').findOne({_id: new ObjectId(id)})
    res.status(200).json({
        message: 'success',
        data: user
    })
})

app.put('/users/:id', async (req, res) => {
    const id = req.params
    const { username, email, password } = req.body
    const user = await db.collection('users').updateOne({_id: new ObjectId(id)}, { $set: {username, email, password}})

    res.status(200).json({
        message: 'success',
        data: user
    })    
    
})

app.delete('/users/:id', async (req, res) => {
    const id = req.params
    const user = await db.collection('users').deleteOne({_id: new ObjectId(id)})

    res.status(200).json({
        message: 'success',
        data: user
    })    
})


const port = 3000;

app.listen(port, () => {
    console.log(`Running on port http://locahost:${port}`)
})
