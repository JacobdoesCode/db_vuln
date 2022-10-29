import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv'
import postsRoutes from './routes/posts.js'

dotenv.config()
const app = express();

// Connecting our routes up to the app using express
app.use('/posts', postsRoutes)

// Sets up our parser to deal with images
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))

// Prevents CORS issues
app.use(cors())

// Connecting to our Mongo database and configuring the connection
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`connected on ${PORT}`)))
  .catch((err) => console.log(err.message));

