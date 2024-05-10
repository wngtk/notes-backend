const { default: mongoose } = require('mongoose')
const {describe, beforeEach, after, test } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { hash } = require('bcrypt')
const helper = require('./test_helper')
const assert = require('assert')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti luukkainen',
            password: 'salainen'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length+1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
})

after(async () => {
    mongoose.connection.close()
})
