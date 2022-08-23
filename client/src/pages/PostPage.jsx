import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {AiFillEye, AiOutlineMessage, AiTwotoneDelete, AiTwotoneEdit} from 'react-icons/ai' 
import Moment from 'react-moment'
import { useCallback } from 'react'
import axios from '../utils/axios'
import { useState } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useEffect } from 'react'
import {removePost} from '../redux/features/post/postSlice'
import {toast} from 'react-toastify'
import { createComment, getPostComments } from '../redux/features/comments/commentSlice'
import { CommentItem } from '../components/CommentItem'

export const PostPage = () => {
  const [comment, setComment] = useState('')
  const [post, setPost] = useState(null)
  const {user} = useSelector((state) => state.auth)
  const {comments} = useSelector((state) => state.comment)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
       
  const removePostHandler = () => {
       try {
         dispatch(removePost(params.id))
         toast('Пост был удален')
         navigate('/')
       } catch (error) {
         console.log(error);
       }
  }

  const handleSubmit = () => {
     try {
       const postId = params.id
       dispatch(createComment({postId, comment}))
       setComment('')
     } catch (error) {
       console.log(error);
     }
  }
      
  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log(error);
    }
  }, [params.id, dispatch])

  const fetchPost = useCallback(async() => {
        const {data} = await axios.get(`/posts/${params.id}`)
        setPost(data)
      }, [params.id])
      
      useEffect(() => {
     fetchPost()
   }, [fetchPost])

   useEffect(() => {
    fetchComments()
  }, [fetchComments])

  if (!post) {
    return (
      <div className='text-xl text-center text-white py-10'>
            Loading...
          </div>
        )
      }  
     
  return (
    <div>
      <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        <Link to={'/'}>
          Назад
        </Link>
      </button>

      <div className='flex gap-10 py-8'>
      <div className="w-2/3">
            <div className={
                post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'
            }
            >              
                {post.imgUrl && (
                    <img src={`http://localhost:3002/${post.imgUrl}`} alt={post.title} className='w-full object-cover' />
                )}
            </div>
            <div className='flex justify-between items-center pt-2'>
            <div className='text-xs text-white opacity-50'>
                {post.username}
                </div>
            <div className='text-xs text-white opacity-50'>
                <Moment date={post.createdAt} format='D MMM YYYY - HH : mm' />
                </div>
        </div>
        <div className='text-xl text-white'>{post.title}</div>
        <p className='text-xs pt-4 text-white opacity-60'>{post.text}</p>

        <div className='flex gap-3 items-center mt-2 justify-between'>
            <div className='flex gap-3 mt-4'>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiFillEye /> <span>{post.views}</span>
              </button>
              <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
              </button>
            </div>
           
            {user?._id === post.author && (
                <div className='flex gap-3 mt-4'>
            <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                <Link to={`/${params.id}/edit`}>
                <AiTwotoneEdit /> 
                </Link>
            </button>
            <button 
              onClick={removePostHandler}
            className='flex items-center justify-center gap-2 text-white opacity-50'
            >
                <AiTwotoneDelete /> 
            </button>
            </div>
              )
            }

        </div>
      </div>
      <div className="w-1/3 bg-gray-700 flex flex-col gap-2 p-4 rounded-sm">
        <form 
        className='flex gap-2'
        onSubmit={e => e.preventDefault()}>
          <input 
          type="text" 
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder='Comment'
          className='w-full text-black rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
          />
          <button
          type='sumbit'
          onClick={handleSubmit}
          className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-smpy2
           px-4'> Отправить</button>
        </form>

        {
          comments?.map((cmt) => (
            <CommentItem key={cmt._id} cmt={cmt} />
          ))
        }
      </div>
      </div>
    </div>
  )
}
