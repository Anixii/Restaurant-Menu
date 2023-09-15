import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate} from 'react-router-dom'

const WithAdminAuth = ({children}) => { 
    const {email} = useSelector((state) => state.user)

    if(!email){ 
        return <Navigate to={'/'}/>
    }
    return children
}

export default WithAdminAuth