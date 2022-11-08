import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import mysql from 'mysql'

dotenv.config()

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 5000;


// Prevents CORS issues
app.use(cors())

// Connecting to our MySQL database and configuring the connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sql_injection_test"
})
db.connect(function(err) {
  if (err) throw err;
      console.log("Connected!");
  });   


// Connecting our routes up to the app using express
app.post('/api/login', (req,res) => {
  console.log(req.params)
  console.log(req.query)
  db.query(`SELECT * FROM users WHERE username = '${req.query.username}' AND password = '${req.query.password}'`, 
(err,result)=>{
    if(err) {
    console.log(err)
    }

console.log(result)
res.send(result)
}
    ); 
})

app.listen(PORT, ()=>{
  console.log(`Running on Port ${PORT}`)}
)

