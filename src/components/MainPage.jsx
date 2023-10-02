import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from './Main.module.css'
import imgge from '../assets/img/icon.svg'
import { Image, QRCode } from 'antd'
import { motion} from 'framer-motion' 
import inst from '../assets/img/instagram.png' 
import whats from '../assets/img/whatsapp.png'
const MainPage = () => { 
  const nav = useNavigate()
  const onHandleClick = () => { 
    nav('/menu')
  }
  return (
    <>  
    <div className={s.main}>
 
      <img className={s.main__img} src={imgge} alt="" />
      <div className={s.main__title}> 
        Добро пожаловать в наше заведение
      </div> 
      <div className={s.main__link}> 
        <motion.button className={s.main__button} whileTap={{scale:1.1}} onClick={onHandleClick}>Меню</motion.button>
      </div>
      <div className={s.main__contacts}>
        <img src={whats} alt="" />   +996 508 333 007      <img className={s.inst}src={inst} alt="" />   <Link to={'https://www.instagram.com/talas_daamy/'}>  talas_daamy</Link>
      </div>
    </div>
    </>
  )
}

export default MainPage