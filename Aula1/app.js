const express = require("express")
const mysql = require("mysql")

// Iniciando serviços da API
const app = express()
const port = 3000

// Criando conexão com banco de dados MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "positivo",
  database: "users"
})

// GET => CONSULTAR INFORMAÇÃO!
app.get("/", (req, res) => {
  const message = "Hello world"
  res.send(message)
})

app.get("/testJsonReturn", (req, res) => {
  res.json({
    name: "João Arthur",
    lastName: "Barp Begnini",
    age: 22,
    job: "QA Intern",
    preferences: [
      "travel",
      "stay safe",
      "learn new things"
    ]
  })
})

app.get("/learningQueryString", (req, res) => {
  const response = {
    name: req.query.name
  }

  res.json(response)
})

app.get("/user", (req, res) => {
  const query = `SELECT * FROM users WHERE name='${req.query.name}'`

  connection.query(query, function(err, result, fields){
    res.json(result)
  })
})

connection.connect(function(err) {
  if(err) throw err
  console.log("Connected")
})

app.listen(port, () => console.log(`app is up ${port}`))
