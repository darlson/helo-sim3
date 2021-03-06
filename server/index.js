const express = require('express')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const app = express()
const ctrl = require('./controller')

const {serverPort, connectionString, secret} = process.env

app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 14},
        secret
    })
)

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.put('/auth/update', ctrl.update)
app.delete('/auth/logout', ctrl.logout)
app.get('/auth/user', ctrl.getUser)


massive({
    connectionString,
    ssl: { rejectUnauthorized: false }
}).then( db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(serverPort, () => console.log(`Listening on port ${serverPort}`))
}).catch( err => console.log(err))

