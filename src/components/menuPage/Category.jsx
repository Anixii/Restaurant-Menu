import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import s from './Menu.module.css'
import { setCategory } from '../../store/menuSlice'
const Category = () => {
    const {currentCategory} = useSelector(state => state.menu) 
    const dispatch = useDispatch()
    const onHandleChangeCategory = (e) =>{ 
        console.log(e); 
        dispatch(setCategory({category: e}))        
    }
    return (
    <>
        <Link 
        className={currentCategory === 'Кофе' ? s.active : s.category__link} onClick={() => onHandleChangeCategory('Кофе')}>Кофе</Link>
        <Link 
        className={currentCategory === 'Выпечка' ? s.active : s.category__link} onClick={() => onHandleChangeCategory('Выпечка')}>Выпечка</Link>
        <Link 
        className={currentCategory === 'Выпечка' ? s.active : s.category__link} onClick={() => onHandleChangeCategory('Все')}>Вce</Link>
    </>
  )
}

export default Category