const express = require('express')
const massive = require('massive')
require('dotenv').config()
// const session = require('express-session')
const app = express()
const ctrl = require('./controller')

const {port, connectionString, secret} = process.env

app.use(express.json())

massive({
    connectionString, 
    ssl: { rejectUnauthorized: false }
}).then( db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(port, () => console.log(`Listening on port ${port}`))
})
