import React from 'react'
import s from './Categories.module.css'
import { useNavigate } from 'react-router-dom'
const CofeCategories = ({item}) => { 
  const nav = useNavigate()
  const onHandleClick = (id) => {  
    nav(`/menu/${id}`)
  }
  return (
    <>
      <div className={s.card} onClick={() => onHandleClick(item.id)}> 
        <div className={s.card__container}> 
          <div  className={s.card__img}>
            <img src={item?.photoURLs[0]} alt="" />
          </div>  
          <div className={s.card__text}> 
          <div className={s.card__tilte}>{item?.title}</div>
          <div className={s.card__subtitle}>{item?.subtitle}</div>
          <div className={s.card__price}>{item?.price} с</div> 
          </div>
        </div>
      </div>
    </>
  )
}

export default CofeCategories