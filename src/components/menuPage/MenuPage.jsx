import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDishes } from '../../store/menuSlice'
import Category from './Category'
import { dishesFilter, recomendationFilter } from '../../helpers/menuHelper'
import CofeCategories from './Categories/Categories'
import s from './Menu.module.css'
import { Spin } from 'antd'
const MenuPage = () => {
  const dispatch = useDispatch()
  const {food,currentCategory} = useSelector(state => state.menu) 
  const [isFetch,setFetch] = useState(false)
  useEffect(() =>{  
    dispatch(getAllDishes({FC: setFetch}))
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
    <Spin spinning={isFetch}>
    <div className={s.main__container}>  
    <Category/>  
    <div className={s.menu__item}> 
      <div className={s.menu__title}>Рекомендуем попробовать</div> 
      <div className={s.menu__list}> 
      {recomendation.map((item,index) => <CofeCategories key={index} item={item}/>)} 
       
      </div> 
    </div> 

    {(currentCategory === 'Все' || currentCategory === 'Горячее') && hot.length !== 0 &&
    <div className={s.menu__item}>  
    <div className={s.menu__title}>Горячее</div> 
    <div className={s.menu__list}> 
    {hot.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div>
    </div>}

    {(currentCategory === 'Все' || currentCategory === 'Кофе')&& cofe.length !== 0  && 
    <div className={s.menu__item}>
    <div className={s.menu__title}>Кофе</div> 
    <div className={s.menu__list}> 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {/* {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    {cofe.map((item,index) => <CofeCategories key={index} item={item}/>)}  */}
    
    </div>
    </div>
    }

    {(currentCategory === 'Все' || currentCategory === 'Выпечка')&& bake.length !== 0   &&
    <div className={s.menu__item}>  
    <div className={s.menu__title}>Выпечка</div>
    <div className={s.menu__list}> 
    {bake.map((item,index) => <CofeCategories key={index} item={item}/>) } 
    </div>
    </div>} 


    {(currentCategory === 'Все' || currentCategory === 'Салаты')&& salat.length !== 0  &&
    <div className={s.menu__item}> 
    <div className={s.menu__title}>Салаты</div>
    <div className={s.menu__list}> 
    {salat.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div>
    </div>  
    }

    {(currentCategory === 'Все' || currentCategory === 'Для детей')&& child.length !== 0  &&
    <div className={s.menu__item}> 
    <div className={s.menu__title}>Для детей</div> 
    <div className={s.menu__list}> 
    {child.map((item,index) => <CofeCategories key={index} item={item}/>)} 
    </div> 
    </div>}

    {(currentCategory === 'Все' || currentCategory === 'Стейки')&& steak.length !== 0  && <div className={s.menu__item}> 
    <div className={s.menu__title}>Стейки</div>
    <div className={s.menu__list}> 
    {steak.map((item,index) => <CofeCategories key={index} item={item}/>)}
    </div>  
    </div>
    }
    </div>
    </Spin>
    </>
  )
}

export default MenuPage