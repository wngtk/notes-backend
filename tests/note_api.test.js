const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helper = require('./test_helper')

const api = supertest(app)

// const initialNotes = [
//     {
//         content: 'HTML is easy',
//         important: false,
//         date: new Date()
//     },
//     {
//         content: 'Browser can execute only JavaScript',
//         important: true,
//         date: new Date()
//     },
// ]

beforeEach(async () => {
    await Note.deleteMany({})
    let noteObject = new Note(helper.initialNotes[0])
    await noteObject.save()
    noteObject = new Note(helper.initialNotes[1])
    await noteObject.save()
})

test.only('notes are returned as json', async () => {
  await api
    .get('/api/notes')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two notes', async () => {
    // const response = await api.get('/api/notes')
    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, 2)
})

test('the first note is about HTTP methods', async () => {
    // const response = await api.get('/api/notes')
    // const contents = response.body.map(e => e.content)
    const notesAtEnd = await helper.notesInDb()
    const contents = notesAtEnd.map(r => r.content)

    assert(contents.includes('HTML is easy'))
})

test('a valid note can be added ', async () => {
    const newNote = {
        content: 'async/await simplifies making async calls',
        important: true
    }

    await api
        .post('/api/notes')
        .send(newNote)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)
    const contents = notesAtEnd.map(r => r.content)

    // const response = await api.get('/api/notes')
    // const contents = response.body.map(r => r.content)
    // assert.strictEqual(response.body.length, helper.initialNotes.length + 1)
    assert(contents.includes('async/await simplifies making async calls'))
})

test('note without content is not added', async () => {
    const newNote = {
        important: false
    }

    await api
        .post('/api/notes')
        .expect(400)

    // const response = await api.get('/api/notes')
    const notesAtEnd = await helper.notesInDb()
    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
})

test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(resultNote.body, noteToView)
})

after(async () => {
  await mongoose.connection.close()
})