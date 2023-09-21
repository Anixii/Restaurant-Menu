import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getDefineDish, setDefineDish, setDefineDishRecomendation } from '../../../store/menuSlice'
import s from './DefineMenu.module.css' 
import a from '../../../assets/img/arrow.svg'
import CofeCategories from '../Categories/Categories'
import Categories from './RecomendCategory/RecCategory'
import { AnimatePresence, motion } from 'framer-motion'
import { Spin } from 'antd' 
const variants = {
  visible: i => ({
    opacity: 1, 
    y:0,
    transition: {
      delay: i * 0.2, 
    },
  }),
  hidden: { opacity: 0,y:100, },
}
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
  const nav = useNavigate()
  const onHandleBack = () =>{  
    nav('/menu')
  }
  console.log(defineDish);
  return (
    <>
    <Spin spinning={isFetch}>
    <motion.div   
      layout
      initial={{x:100,opacity:0}} 
      animate={{x:0, opacity:1}} 
      exit={{x:100, opacity:0}}
    className={s.define}> 

      <motion.div variants={variants} className={s.define__container}> 
      
        <motion.div className={s.define__side}>
          <motion.div  animate={'visible'} custom={0} initial={'hidden'} variants={variants} className={s.define__back} onClick={onHandleBack}>
            <img src={a} alt="" />
            Назад к выбору блюд
          </motion.div> 
          <motion.div  animate={'visible'} custom={1} initial={'hidden'} variants={variants} className={s.define__img}>
            <img src={defineDish?.photoURLs[0]} alt="" />
          </motion.div> 
          <motion.div className={s.define__text}> 
            <motion.div  animate={'visible'} custom={3} initial={'hidden'}variants={variants} className={s.define__title}>{defineDish?.title}</motion.div>
            <motion.div   animate={'visible'} custom={4} initial={'hidden'} variants={variants} className={s.define__subtitle}>{defineDish?.description}</motion.div>
            <motion.div   animate={'visible'} custom={5} initial={'hidden'} variants={variants} className={s.define__price}>{defineDish?.price} с</motion.div>
          </motion.div>
        </motion.div>

        <motion.div className={s.define__rec}>
          <motion.div animate={'visible'} custom={1} initial={'hidden'}variants={variants} className={s.rec__title}> 
          Дополнительно к "{defineDish?.title}" берут
          </motion.div> 
          <motion.div className={s.rec__list}>  
          <AnimatePresence> 
            {defineDishRecomendation.map((item,index) => <Categories variants={variants} custom={index+1} initial={'hidden'} animate={'visible'} item={item} key={index}/>)}
          </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
      </motion.div>
      </Spin>
    </>
  )
}

export default DefineMenu