const express = require('express')
const app = express()
const mysql = require('mysql2')
const cors = require('cors')

const dataBase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "clebson",
})

app.use(cors())
app.use(express.json())

app.post("/register", (req, res) => {
    const { englishWord } = req.body
    const { portugueseWord } = req.body

    let postDataBase = "INSERT INTO flashcards ( englishWord, portugueseWord ) VALUES ( ?, ? )"

    dataBase.query( postDataBase, [englishWord, portugueseWord], (err, result) => {
        console.log( err )
    })

    console.log( englishWord )
    console.log( portugueseWord )
})

app.get("/get", (req, res) => {
    let getDataBase = "SELECT * FROM flashcards"
    dataBase.query( getDataBase, (err, result) => {
        if(err) console.log( err )
        else res.send(result)
    })
    //console.log( req )
})

app.delete("/delete/:id", (req, res) => {
    let deleteDataBase = "DELETE FROM flashcards WHERE idflashcards = ?"
    dataBase.query(deleteDataBase, [req.params.id], (err, result) => {
        if(err) console.log( err )
        else res.send( result )
    })
})

app.listen('3001', ()=> {
    console.log( "rodando servidor" )
})
