import { configureStore } from "@reduxjs/toolkit"; 
import menuSlice from "./menuSlice";

const store = configureStore({ 
    reducer:{ 
        menu: menuSlice
    }
})  
window.store = store
export default store 