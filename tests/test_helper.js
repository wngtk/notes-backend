const { hash } = require('bcrypt')
const Note = require('../models/note')
const User = require('../models/user')
const { sign } = require('jsonwebtoken')

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

const nonExistingId = async () => {
  const note = new Note({ content: 'willremovethissoon' })
  await note.save()
  await note.deleteOne()

  return note._id.toString()
}

const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map(note => note.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const addRootUser = async () => {
  const users = await usersInDb()
  const usernames = users.map(u => u.username)
  if (!usernames.includes('root')) {
    const passwordHash = await hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})
    user.save()
  }
}

const rootUserId = async () => {
  const users = await usersInDb()
  return users.find(u => u.username === 'root').id
}

const rootUserToken = async () => {
  const token = sign({username: root, id: await rootUserId()}, process.env.SECRET)
  return token
}


module.exports = {
  initialNotes, nonExistingId, notesInDb,
  usersInDb, addRootUser, rootUserId, rootUserToken
}