import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom' 
import {useDispatch, useSelector} from 'react-redux'
import { getDefineDish, setDefineDish, setDefineDishRecomendation } from '../../../store/menuSlice' 
import s from './DefineMenu.module.css'
const DefineMenu = () => {
  const dispatch = useDispatch()
  const params = useParams() 
  const {food,defineDish,defineDishRecomendation} = useSelector(state => state.menu)
  useEffect(() =>{ 
    if(food.length !== 0){ 
      const dishes = food.filter((item)  => item.id === params.id) 
      dispatch(setDefineDish({dish: dishes[0]}))  
      if(dishes[0].recomendation.length !== 0){  
        const recommendedIds = dishes[0].recomendation.map(recommendation => recommendation.value); 
        console.log(recommendedIds);
        const recommendedDishes = food.filter(dish => recommendedIds.includes(dish.id)); 
        console.log(recommendedDishes);
        return dispatch(setDefineDishRecomendation({dish:recommendedDishes}))
      }
      dispatch(setDefineDishRecomendation({dish:[]}))
    }else { 
      dispatch(getDefineDish({id:params.id}))
    } 

  },[dispatch,food,params])

  return (
    <> 
    
    <div> 
      {defineDish?.title} 
      {defineDish?.subtitle} 
      {defineDish?.price} 
    rec
      {defineDishRecomendation?.map((item) => <div> 
        {item?.title}
        </div>)}
    </div>
    
    </>
  )
}

export default DefineMenu