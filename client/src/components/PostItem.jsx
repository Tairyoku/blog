import React from 'react'
import {AiFillEye, AiOutlineMessage} from 'react-icons/ai' 
import Moment from 'react-moment'
import { Link } from 'react-router-dom'


export const PostItem = ({post}) => {

    if (!post) {
        return (
          <div className='text-xl text-center text-white py-10'>
            Постов не существует
          </div>
        )
        }

  return (
    <Link to={`/${post._id}`}>
    <div className='flex flex-col basis-1/4 flex-grow'>
        <div 
            className={
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
        <p className='text-xs pt-4 text-white opacity-60 line-clamp-4'>{post.text}</p>

        <div className='flex gap-3 items-center mt-2'>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiFillEye /> <span>{post.views}</span>
            </button>
            <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
            </button>
        </div>
   </div>
   </Link>
  )
}
