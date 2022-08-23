import React, { useCallback } from 'react'
import { useState } from 'react'
import {useDispatch, useSelector } from 'react-redux'
import { updatePost } from '../redux/features/post/postSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from '../utils/axios'


export const EditPostPage = () => {

const [title, setTitle] = useState('')
const [text, setText] = useState('')
const [oldImage, setOldImage] = useState('')
const [newImage, setNewImage] = useState('')

const {user} = useSelector((state) => state.auth)
const dispatch = useDispatch()
const navigate = useNavigate()
const params = useParams()

const fetchPost = useCallback(async() => {
  const {data} = await axios.get(`/posts/${params.id}`)
  setTitle(data.title)
  setText(data.text)
  setOldImage(data.imgUrl)
}, [params.id])

useEffect(() => {
  fetchPost()
}, [fetchPost])

const submitHandler = () => {
  try {
    const  updatedPost = new FormData()
    updatedPost.append('title', title)
    updatedPost.append('text', text)
    updatedPost.append('id', params.id)
    updatedPost.append('image', newImage)
    dispatch(updatePost(updatedPost))
    navigate(`/posts`)
  } catch (error) {
    console.log(error)
  }
}

const clearFomrHandler = () => {
  setText('')
  setTitle('')
  setNewImage('')
  }

  return (
    <form 
    className='w-1/3 mx-auto py-10'
    onSubmit={(e) => e.preventDefault()}
    >
      <label 
      className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'
      >
        Прикрепить изображение:
      <input type="file" className='hidden' onChange={e => {
          setNewImage(e.target.files[0])
          setOldImage('')
        }}/>
      </label>
      <div className='flex object-cover py-2'>
              
        {oldImage && (
          <img src={`http://localhost:3002/${oldImage}`} alt="image" />
        )}
          {newImage && (
          <img src={URL.createObjectURL(newImage)} alt="image" />
        )}
      </div>

      <label className='text-xs text-white opacity-70'>
        Заголовок поста:
        <input 
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder='Заголовок'
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'
        />
      </label>
      <label className='text-xs text-white opacity-70'>
        Текст поста:
        <textarea 
        placeholder='текст поста'
        value={text}
        onChange={e => setText(e.target.value)}
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs resize-none h-40 outline-none placeholder:text-gray-700'
        />
      </label>
      <div className='flex gap-8 items-center justify-center mt-4'>
        <button 
        onClick={submitHandler}
        className='flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
        >
          Обновить
        </button>
        <button 
        onClick={clearFomrHandler}
        className='flex items-center justify-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
        >
          Очистить
        </button>
        <button 
        onClick={() => navigate(-1)}
        className='flex items-center justify-center bg-red-600 text-xs text-white rounded-sm py-2 px-4'
        >
          Отменить
        </button>
      </div>
    </form>
  )
}
