import React, { forwardRef } from 'react'
import s from './Categories.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setScrollPosition } from '../../../store/menuSlice'
import { motion } from 'framer-motion'
const CofeCategories =forwardRef( ({item,setScroll,...props},ref) => { 
  const nav = useNavigate()  
  const onHandleClick = (id) => {   
    setScroll(window.scrollY)  
    nav(`/menu/${id}`)
  }
  return (
    <>
      <motion.div whileHover={{cursor:'pointer', scale:0.9}} whileTap={{scale:1.1}} className={s.card} ref={ref} onClick={() => onHandleClick(item.id)}> 
        <div className={s.card__container}> 
          <div  className={s.card__img}>
            <img src={item?.photoURLs[0]} alt="" />
          </div>  
          <div className={s.card__text}>  
          <div className={s.card__subtext}> 
          <div className={s.card__title}>{item?.title}</div>
          <div className={s.card__subtitle}>{item?.subtitle}</div>
          </div>
          <div className={s.card__price}>{item?.price} с</div> 
          </div>
        </div>
      </motion.div>
    </>
  )
})
export default motion(CofeCategories)