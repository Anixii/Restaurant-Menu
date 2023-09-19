import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDefineDish, setDefineDish, setDefineDishRecomendation } from '../../../store/menuSlice'
import s from './DefineMenu.module.css' 
import a from '../../../assets/img/arrow.svg'
import CofeCategories from '../Categories/Categories'
import Categories from './RecomendCategory/RecCategory'
import { Spin } from 'antd'
const DefineMenu = () => {
  const dispatch = useDispatch()
  const params = useParams()
  console.log('reee');
  const { food, defineDish, defineDishRecomendation } = useSelector(state => state.menu) 
  const [isFetch, setFetch] = useState(false)
  useEffect(() => { 
    setFetch(true)
    if (food.length !== 0) {
      const dishes = food.filter((item) => item.id === params.id)
      dispatch(setDefineDish({ dish: dishes[0] }))
      if (dishes[0].recomendation.length === 0) {
        dispatch(setDefineDishRecomendation({ dish: [] }))
      }else{ 

        const recommendedIds = dishes[0].recomendation.map(recommendation => recommendation.value);
        console.log(recommendedIds);
        const recommendedDishes = food.filter(dish => recommendedIds.includes(dish.id));
        console.log(recommendedDishes);
        dispatch(setDefineDishRecomendation({ dish: recommendedDishes }))
      }
    } else {
      dispatch(getDefineDish({ id: params.id }))
    } 
    setFetch(false)
  }, [params])
  console.log(defineDish);
  return (
    <>
    <Spin spinning={isFetch}>
    <div className={s.define}> 

      <div className={s.define__container}>
        <div className={s.define__side}>
          <div className={s.define__back}>
            <img src={a} alt="" />
            Назад к выбору блюд
          </div> 
          <div className={s.define__img}>
            <img src={defineDish?.photoURLs[0]} alt="" />
          </div> 
          <div className={s.define__text}> 
            <div className={s.define__title}>{defineDish?.title}</div>
            <div className={s.define__subtitle}>{defineDish?.description}</div>
            <div className={s.define__price}>{defineDish?.price} с</div>
          </div>
        </div>

        <div className={s.define__rec}>
          <div className={s.rec__title}> 
          Дополнительно к "{defineDish?.title}" берут
          </div> 
          <div className={s.rec__list}> 
            {defineDishRecomendation.map((item,index) => <Categories item={item} key={index}/>)}
          </div>
        </div>
      </div>
      </div>
      </Spin>
    </>
  )
}

export default DefineMenu