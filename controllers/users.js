const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    console.error(users)
    if (users)
        response.json(users)
    else
        response.json([])
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (!password) {
        response.status(400).end()
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter