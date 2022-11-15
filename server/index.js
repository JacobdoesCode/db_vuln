import express from "express";
import cors from 'cors';
import dotenv from 'dotenv'
import mysql from 'mysql'
import multer from 'multer'
import yauzl from 'yauzl'

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

app.post('/api/insecure/login', (req,res) => {
  db.query(`SELECT * FROM users WHERE username = '${req.query.username}' AND password = '${req.query.password}'`, 
  (err,result)=>
  {
    if(result.length==0)
    {
      res.status(400)
      res.send({error: "INVALID_CREDENTIALS"})
    }
    else if(err)
    {
      res.status(401)
      res.send(err)
    }
    else{
      res.status(200)
      res.send(result)
    }
  }); 
})

app.post('/api/secure/login', (req,res) => {
  db.query(`SELECT * FROM users WHERE username = ? AND password = ?`,[req.query.username,req.query.password], 
  (err,result)=>
  {
  if(result.length==0)
  {
    res.status(400)
    res.send({error: "INVALID_CREDENTIALS"})
  }
  else if(err)
  {
    res.status(401)
    res.send(err)
  }
  else{
    res.status(200)
    res.send(result)
  }
  }); 
})

// Idea is the following, we take a file if it is zipped then we unzip it and then read it as a string into the database
const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
      callBack(null, 'uploads')
  },
  filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`)
  }
})

let upload = multer({ dest: 'uploads/' })


app.post('/api/insecure/upload', upload.single('file'), (req,res) => {
  const file = req.file
  yauzl.open(file.path, {lazyEntries: true}, function(err, zipfile) {
    zipfile.readEntry();
    zipfile.on("entry", function(entry) {
        zipfile.readEntry();
    });
  })
  console.log(file)
})

app.listen(PORT, ()=>{
  console.log(`Running on Port ${PORT}`)}
)

