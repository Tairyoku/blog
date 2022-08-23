import Post from '../models/post.js'
import User from '../models/user.js'
import Comment from '../models/comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

// Create post
export const createPost = async(req, res) => {
    try {
        const { title, text } = req.body
        const user = await User.findById(req.userId)

        if (req.files) {
            let filename = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(
                import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', filename))

            const newPostWithImg = new Post({
                username: user.username,
                title,
                text,
                imgUrl: filename,
                author: req.userId,
            })

            await newPostWithImg.save()
            await User.findByIdAndUpdate(req.userId, {
                $push: { posts: newPostWithImg },
            })

            return res.json(newPostWithImg)
        }

        const newPostWithoutImg = new Post({
            username: user.username,
            title,
            text,
            imgUrl: '',
            author: req.userId,
        })

        await newPostWithoutImg.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { posts: newPostWithoutImg },
        })
        return res.json(newPostWithoutImg)
    } catch (error) {
        res.json({ message: 'Что то пошло не так' })
    }
}

// Get all posts
export const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort('-createdAt')
        const popularPosts = await Post.find().limit(5).sort('-views')
        if (!posts) {
            return res.json('постов нет')
        }

        res.json({ posts, popularPosts })

    } catch (error) {
        console.log(error)
    }
}

// Get post by id
export const getById = async(req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            $inc: { views: 1 },
        })

        res.json(post)

    } catch (error) {
        console.log(error)
    }
}

// Get my posts
export const getMyPosts = async(req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map(post => {
                return Post.findById(post._id)
            })
        )

        res.json(list)

    } catch (error) {
        console.log(error)
    }
}

// Remove post
export const removePost = async(req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if (!post) return res.json({ message: 'no post' })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { posts: req.params.id },
        })

        res.json({ message: 'post deleted' })

    } catch (error) {
        console.log(error)
    }
}

// Update post
export const updatePost = async(req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let filename = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(
                import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', filename))
            post.imgUrl = filename || ''
        }

        post.title = title
        post.text = text
        await post.save()

        res.json(post)

    } catch (error) {
        console.log(error)
    }
}

// Get post comments
export const getPostComments = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comment) => {
                return Comment.findById(comment)
            })
        )

        res.json(list)

    } catch (error) {
        console.log(error)
    }
}