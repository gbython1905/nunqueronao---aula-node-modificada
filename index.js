const express = require('express')
const exphbs = require('express-handlebars')
const mysql = require('mysql2')

const app = express()

app.engine('handlebars',exphbs.engine())
app.set('view engine','handlebars')

app.use(express.static('public'))
app.use(express.urlencoded({
    extended:true
}))
app.use(express.json())

const conn = mysql.createConnection({
    host : 'localhost',
    user:'root',
    password: '',
    database: 'gps'
})

app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/amigos',(req,res)=>{
    const sql = 'SELECT * FROM amigos'
    conn.query(sql,(err,data)=>{
        if (err) {
            console.log(err)
            return
        }
        const amigos = data
        res.render('amigos', {amigos})
    })
})

app.post('/adicionar',(req,res)=>{
    const nome = req.body.nome
    const idade = req.body.idade

    const sql = `INSERT INTO amigos (nome, idade) VALUES ('${nome}' , '${idade}')`
    
    conn.query(sql,(err)=>{
        console.log(err)
        return
    })
    res.redirect('/')
})


conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Conectou')
        app.listen(3000,()=>{
            console.log('http://localhost:3000')
        })
    }
})