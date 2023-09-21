import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './Main.module.css'
import { Image, QRCode } from 'antd'
import { motion} from 'framer-motion'
const MainPage = () => { 
  const nav = useNavigate()
  const onHandleClick = () => { 
    nav('/menu')
  }
  return (
    <>  
    <div className={s.main}>
      <div className={s.main__title}>
        Добро пожаловать! 
      </div> 
      <div className={s.main__link}> 
        <motion.button whileTap={{scale:1.1}} onClick={onHandleClick}>Открыть меню</motion.button>
      </div> 
      <div className={s.main__qr}>   
      <QRCode type='svg' value='https://www.instagram.com/itacademy_kb/'/>

      </div>
    </div>
    </>
  )
}

export default MainPage