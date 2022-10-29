import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

export const fetchPosts = () => axios.get(`${process.env.DB}/posts`)