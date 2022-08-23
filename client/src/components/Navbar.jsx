import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const activeStyles = {
        color: 'white',
    }

const logoutHandler = () => {
    dispatch(logout())
    window.localStorage.removeItem('token')
    toast('Вы вышли из системы')
}

  return (
    <div className='flex py-4 px-8 justify-between items-center text-base'>
        <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-white rounded-sm'>
            E
        </span>

        { isAuth &&
        <ul className='flex text-center justify-evenly w-4/5 '>
            <li>
                <NavLink 
                to={'/'}
                className=' text-gray-400 hover:text-white'
                style={({isActive}) => isActive ? activeStyles : undefined}
                >
                    Главная
                </NavLink>
            </li>
            <li>
            <NavLink 
                to={'/posts'}
                className=' text-gray-400 hover:text-white'
                style={({isActive}) => isActive ? activeStyles : undefined}
                >
                    Мои посты
                </NavLink>
            </li>
            <li>
            <NavLink 
                to={'/new'}
                className=' text-gray-400 hover:text-white'
                style={({isActive}) => isActive ? activeStyles : undefined}
                >
                    Добавить пост
                </NavLink>
            </li>
        </ul>
        }

        <div className='flex justify-center items-center bg-gray-600 text-xs hover:text-white rounded-sm px-4 py-2'>
            { isAuth ? (
            <button onClick={logoutHandler}>Выйти</button>
            ) : (
            <Link to={'/login'}>Войти</Link> 
            )}
        </div>
    </div>
  )
}
