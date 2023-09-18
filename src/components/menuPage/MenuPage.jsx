import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDishes } from '../../store/menuSlice'
import Category from './Category'
import { dishesFilter, recomendationFilter } from '../../helpers/menuHelper'
import CofeCategories from './Categories/Categories'
import s from './Menu.module.css'
const MenuPage = () => {
  const dispatch = useDispatch()
  const {food,currentCategory} = useSelector(state => state.menu) 

  useEffect(() =>{ 
    dispatch(getAllDishes())
  },[dispatch]) 
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
  console.log(currentCategory);
  return ( 
    <>
    <div> 

    <Category/>  
    <div className={s.menu__item}> 
      <div className={s.menu__title}>Рекомендуем попробовать</div> 
      <div className={s.menu__list}> 
      {recomendation.map((item,index) => <CofeCategories key={index} item={item}/>)} 
      </div> 
    </div> 

    {(currentCategory === 'Все' || currentCategory === 'Горячее') &&
    <div className={s.menu__item}>  
    <div className={s.menu__title}>Горячее</div> 
    <div className={s.menu__list}> 
    {hot.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div>
    </div>}

    {(currentCategory === 'Все' || currentCategory === 'Кофе') &&
    <div className={s.menu__item}>
    <div className={s.menu__title}>Кофе</div> 
    <div className={s.menu__list}> 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div>
    </div>
    }

    {(currentCategory === 'Все' || currentCategory === 'Выпечка') &&
    <div className={s.menu__item}>  
    <div className={s.menu__title}>Выпечка</div>
    <div className={s.menu__list}> 
    {bake.map((item,index) => <CofeCategories key={index} item={item}/>) } 
    </div>
    </div>} 


    {(currentCategory === 'Все' || currentCategory === 'Салаты') &&
    <div className={s.menu__item}> 
    <div className={s.menu__title}>Салаты</div>
    <div className={s.menu__list}> 
    {salat.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div>
    </div>  
    }

    {(currentCategory === 'Все' || currentCategory === 'Для детей') &&
    <div className={s.menu__item}> 
    <div className={s.menu__title}>Для детей</div> 
    <div className={s.menu__list}> 
    {child.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div> 
    </div>}

    {(currentCategory === 'Все' || currentCategory === 'Стейки') && <div className={s.menu__item}> 
    <div className={s.menu__title}>Стейки</div>
    <div className={s.menu__list}> 
    {steak.map((item,index) => <CofeCategories key={index} item={item}/>)}
    </div>  
    </div>
    }
    </div>

    </>
  )
}

export default MenuPage