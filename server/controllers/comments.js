import Comment from '../models/comment.js'
import Post from '../models/post.js'

export const createComment = async(req, res) => {
    try {
        const { postId, comment } = req.body

        if (!comment)
            return res.json({ message: 'dfsfsdfs' })

        const newComment = new Comment({ comment })
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {

        }

        res.json(newComment)
    } catch (error) {
        res.json({ message: "oups" })
    }
}