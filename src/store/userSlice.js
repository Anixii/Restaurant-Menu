import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore"; 
const menuCollection = collection(db, 'menu') 

const initialState = { 
    email: null, 
    recomendationList: []
} 
export const signUserInAccount = createAsyncThunk( 
    'user/sign', 
    async ({email,password},{dispatch}) =>{ 
        try{ 
            const {user} = await signInWithEmailAndPassword(auth, email,password)  
            console.log(user);
            dispatch(setUser({email:user.email})) 
            return true
        }catch(error){  
            
            console.log(error);
            return 'error'
        }
    }
) 
export const getSelectOptions = createAsyncThunk( 
    'user/getSelectOptions', 
    async (_,{dispatch}) =>{ 
        try { 
            const querySnapshot = await getDocs(menuCollection)    
            
            if(!querySnapshot.empty){ 
                const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title })); 
                dispatch(setRecomendationList({dish: productsData}))
            } 
        } catch (error) {
            console.log(error);
        }
    }
)
const userSlice = createSlice({ 
    name: 'user', 
    initialState, 
    reducers:{ 
        setUser(state,action) { 
            state.email = action.payload.email
        }, 
        setRecomendationList(state,action) { 
            state.recomendationList = action.payload.dish
        }
    }
}) 
export const {setUser,setRecomendationList} = userSlice.actions 
export default userSlice.reducer