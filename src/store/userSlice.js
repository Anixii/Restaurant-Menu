import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
const initialState = { 
    email: null
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
const userSlice = createSlice({ 
    name: 'user', 
    initialState, 
    reducers:{ 
        setUser(state,action) { 
            state.email = action.payload.email
        }
    }
}) 
export const {setUser} = userSlice.actions 
export default userSlice.reducer