import { createSlice } from "@reduxjs/toolkit";
const initialState = { 
    s: null
}
const menuSlice = createSlice({ 
    name: 'menu', 
    initialState, 
    reducers:{ 
        set(state,action){ 
            state.s = action.payload.l
        }
    }
}) 
export const {set} = menuSlice.actions 
export default menuSlice.reducer