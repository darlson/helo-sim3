const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        console.log('hit');
        const db = req.app.get('db')
        const {username, password} = req.body

        const user = (await db.check_user(username))[0]

        if(!user){
            return res.status(404).send('User does not exist')
        }
        const authenticated = bcrypt.compareSync(password, user.password)
        if (authenticated || password === user.password) {
            req.session.user = {
                userId: user.id,
                username: user.username
            }
            res.status(200).send(req.session.user)
            console.log('controller: logged in!')
        }
        res.status(403).send('Username or password incorrect')
    },
    register: async (req, res) => {
        const db = req.app.get('db')
        const {username, password} = req.body

        const existingUser = (await db.check_user(username))[0]
        if(existingUser){
            return res.status(409).send('User already exists')
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const profilePic = `https://robohash.org/${username}`

        const newUser = (await db.register([username, hash, profilePic]))[0]

        req.session.user = {
            userId: newUser.id,
            username: newUser.username 
        }
        res.status(200).send(req.session.user)
        // console.log('registered!')
    },
    logout: (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser  : (req, res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404)
        }
    }
}