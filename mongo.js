const mongoose = require('mongoose')
const process = require('process')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const URL = `mongodb+srv://wngtk:${password}@fullstack.1ptpmv8.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(URL)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
//     content: 'Browser can execute only Javascript',
//     date: new Date(),
//     important: true
// })

// note.save().then(result => {
//     console.log(result);
//     console.log('note saved!');
//     mongoose.connection.close();
// });

Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})