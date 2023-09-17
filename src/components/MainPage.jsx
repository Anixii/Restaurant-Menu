import React from 'react'
import { Link } from 'react-router-dom'

const MainPage = () => {
  return (
    <>  
        Добро пожаловать! 
        <Link to='/menu'>Меню</Link>
    </>
  )
}

export default MainPage