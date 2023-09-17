import React from 'react'
import s from './Categories.module.css'
const CofeCategories = ({item}) => {
  console.log(item); 
  return (
    <>
      <div className={s.card}> 
        <div className={s.card__container}> 
          <div className={s.card__img}><img src={item?.photoURLs[0]} alt="" /></div>
          <div className={s.card__tilte}>{item?.title}</div>
          <div className={s.card__subtitle}>{item?.subtitle}</div>
          <div className={s.card__price}>{item?.price} с</div> 
        </div>
      </div>
    </>
  )
}

export default CofeCategories