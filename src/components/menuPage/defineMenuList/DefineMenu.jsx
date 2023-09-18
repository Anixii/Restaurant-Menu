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
        const rec = dishes?.recomendation?.map((item) => { 
          return item.filter(item => item === food.id)
        })  
        dispatch(setDefineDishRecomendation({dish:rec}))
      }
      dispatch(setDefineDishRecomendation({dish:[]}))
    }else { 
      dispatch(getDefineDish({id:params.id}))
    } 

  },[dispatch,food,params])
  console.log(defineDish);
  return (
    <> 
    
    <div> 
      {defineDish?.title} 
      {defineDish?.subtitle} 
      {defineDish?.price}
    </div>
    
    </>
  )
}

export default DefineMenu