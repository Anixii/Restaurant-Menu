import React, { forwardRef } from 'react'
import s from './Categories.module.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setScrollPosition } from '../../../store/menuSlice'
import { motion } from 'framer-motion'
const CofeCategories =forwardRef( ({item,setScroll,...props},ref) => { 
  const nav = useNavigate()  
  console.log(props);
  const dispatch = useDispatch()
  const onHandleClick = (id) => {   
    setScroll(window.scrollY)  
    nav(`/menu/${id}`)
  }
  return (
    <>
      <div className={s.card} ref={ref} onClick={() => onHandleClick(item.id)}> 
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
      </div>
    </>
  )
})
export default motion(CofeCategories)