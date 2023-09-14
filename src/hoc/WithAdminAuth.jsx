import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const WithAdminAuth = () => { 
    const {email} = useSelector((state) => state.user)
    const nav = useNavigate()
    if(!email){ 
        return nav('/')
    }
    return (
    <div>WithAdminAuth</div>
  )
}

export default WithAdminAuth