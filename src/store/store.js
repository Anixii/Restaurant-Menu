import { configureStore } from "@reduxjs/toolkit"; 
import menuSlice from "./menuSlice";
import userSlice from "./userSlice";

const store = configureStore({ 
    reducer:{ 
        menu: menuSlice, 
        user: userSlice
    }
})  
window.store = store
export default store 