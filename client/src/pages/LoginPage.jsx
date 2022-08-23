import { useNavigate} from 'react-router-dom'
import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'


export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {status} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const isAuth = useSelector(checkIsAuth)
  const navigate = useNavigate()
  
  useEffect(() => {
    if (status) {
      toast(status);
    }
    {isAuth && navigate(-1)}
  }, [status, isAuth, navigate])

  const handleSumbit = () => {
    try {
      dispatch(loginUser({ username, password }))
        {isAuth && navigate(-1)}
    } catch (error) {
      console.log(error)
    }
  }

  const handleNavRegister = () => {
    navigate('/register', { replace: true })
  }

  return (
    <form 
    onSubmit={e => e.preventDefault()}
    className='w-1/4 h-60 mx-auto mt-40'
    >
    <h1 className='text-lg text-white text-center'>Авторизация</h1>
    <label className='text-xs text-gray-400'>
      UserName:
      <input 
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder='Username'
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
    </label>  
    <label className='text-xs text-gray-400'>
      Password:
      <input 
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder='Password'
        className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
    </label> 

    <div className='mt-4 flex gap-8 justify-center'>
      <button 
      type='submit'
      onClick={handleSumbit}
      className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
      >
        Войти
      </button>
      <button 
      onClick={handleNavRegister}
      className='flex justify-center items-center text-xs text-white'
      >Нет аккаунта?
      </button>
    </div>
      </form>
  )
}
