import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDishes } from '../../store/menuSlice'
import Category from './Category'
import { dishesFilter, recomendationFilter } from '../../helpers/menuHelper'
import CofeCategories from './Categories/Categories'
import s from './Menu.module.css'
import { Spin } from 'antd' 
import { AnimatePresence } from 'framer-motion'
import { Preloader } from '../Preloader/Preloader'

const variants = {
  visible: i => ({
    opacity: 1, 
    x:0,
    transition: {
      delay: i * 0.2,
    },
  }),
  hidden: { opacity: 0,x:-100, },
}
const MenuPage = () => {
  const dispatch = useDispatch()
  const {food,currentCategory,} = useSelector(state => state.menu) 
  const [isFetch,setFetch] = useState(false) 
  const [scroll, setScroll] = useState(0)
  useEffect(() => { 
    window.scrollTo(0, scroll); 
  }, [scroll])

  useEffect(() =>{   
    if(food.length === 0){ 
      dispatch(getAllDishes({FC: setFetch}))
    }
  },[dispatch,food]) 
  const [hot, sethot] = useState([]) 
  const [cofe, setCofe] = useState([]) 
  const [bake, setBake] = useState([])
  const [salat,setSalat] = useState([])
  const [child,setchild] = useState([]) 
  const [steak, setSteak] = useState([]) 
  const [recomendation, setRecomend] = useState([])
  useEffect(() =>{ 
    setBake(dishesFilter(food, 'Выпечка')) 
    sethot(dishesFilter(food, 'Горячее'))
    setCofe(dishesFilter(food, 'Кофе'))
    setSalat(dishesFilter(food, 'Салат')) 
    setchild(dishesFilter(food, 'Для детей'))
    setSteak(dishesFilter(food, 'Стейки')) 
    setRecomend(recomendationFilter(food))
  },[food])  
  if(isFetch){ 
    return <Preloader/>
  }
  return ( 
    <> 
    <Spin spinning={isFetch}>
    <div className={s.main__container}>  
    <Category/>   
    <div className={s.menu__item}> 
      <div className={s.menu__title}>Рекомендуем попробовать</div> 
      <div className={s.menu__list}>  
      <AnimatePresence > 
    {recomendation.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>
      </div> 
    </div> 

    {(currentCategory === 'Все' || currentCategory === 'Горячее') && hot.length !== 0 &&
    <div className={s.menu__item}>  
    <div className={s.menu__title}>Горячее</div> 
    <div className={s.menu__list}> 
    <AnimatePresence > 
    {hot.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>
    </div>
    </div>}

    {(currentCategory === 'Все' || currentCategory === 'Кофе')&& cofe.length !== 0  && 
    <div className={s.menu__item}>
    <div className={s.menu__title}>Кофе</div> 
    <div className={s.menu__list}>  
    <AnimatePresence > 
    {cofe.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>
    </div>
    </div>
    }

    {(currentCategory === 'Все' || currentCategory === 'Выпечка')&& bake.length !== 0   &&
    <div className={s.menu__item}>  
    <div className={s.menu__title}>Выпечка</div>
    <div className={s.menu__list}> 
    <AnimatePresence > 
    {bake.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>
    </div>
    </div>} 
   
    {(currentCategory === 'Все' || currentCategory === 'Салаты')&& salat.length !== 0  &&
    <div className={s.menu__item}> 
    <div className={s.menu__title}>Салаты</div>
    <div className={s.menu__list}> 
    <AnimatePresence > 
    {salat.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>
    </div>
    </div>  
    }

    {(currentCategory === 'Все' || currentCategory === 'Для детей')&& child.length !== 0  &&
    <div className={s.menu__item}> 
    <div className={s.menu__title}>Для детей</div> 
    <div className={s.menu__list}> 
    <AnimatePresence > 
    {child.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>    </div> 
    </div>}

    {(currentCategory === 'Все' || currentCategory === 'Стейки')&& steak.length !== 0  && <div className={s.menu__item}> 
    <div className={s.menu__title}>Стейки</div>
    <div className={s.menu__list}> 
    <AnimatePresence > 
    {steak.map((item,index) => <CofeCategories  whileInView={'visible'} viewport={{once:true,amount:0.2}} variants={variants} custom={index} initial={'hidden'} exit={'hidden'} setScroll={setScroll} key={index + item.id} item={item}/>)} 
    </AnimatePresence>    </div>  
    </div>
    } 
    </div>
    </Spin>
    </>
  )
}

export default MenuPage