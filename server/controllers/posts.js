import PostMessage from "../models/postMessage.js"


export const getPosts = async (req, res) => {
    try {
        const allMessages = await PostMessage.find()

        res.status(200).json(allMessages)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    const post = req.body

    const newPost = new PostMessage(post)

    try {
        await newPost.insertOne()
        res.status(200).json(newPost)
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }
}
