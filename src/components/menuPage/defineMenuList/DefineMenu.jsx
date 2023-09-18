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
        // const rec = dishes[0].recomendation.map((item) => { 
        //    console.log(item);
        //   return item.filter(item => item.value === food.id)
        // })    
        // const rec = dishes[0].recomendation.filter((item,index) => { 
        //   return item.value === food.id
        // })  
        const rec = food.map((item,index) =>{  
          const recs = dishes[0].recomendation.filter((item,index) => { 
              return item.value === item.id
            })  
        })
        console.log(rec);
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
    rec
      {defineDishRecomendation?.map((item) => <div> 
        {item?.title}
        </div>)}
    </div>
    
    </>
  )
}

export default DefineMenu