const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const fs = require('fs')


let notes =''
var count = 0
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.render('index.ejs')
})
app.post('/', (req, res)=>{
    console.log(req.body.title)
    newNote = req.body
    newNote = JSON.stringify(newNote)
    if (count == 0){
        notes += newNote
    } else {
        notes += ',' + newNote  
    }
    fs.writeFile('notes.txt', notes, (err)=>{
        if(err) throw err
        console.log('File Updated')
    })
    res.render('thankyou.ejs')
    console.log(notes)
    console.log(count)
    count++
})

console.log('Server Listening')
app.listen(3000)
