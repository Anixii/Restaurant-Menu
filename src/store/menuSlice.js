import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"; 
import { storage, auth, db } from "../firebaseConfig";
import { ref, uploadBytes } from "firebase/storage";
const initialState = { 
    food: [],
} 
export const uploadDishPhotos = createAsyncThunk(
    'menu/uploadDishPhotos',  
    async ({fileList, id}) =>{ 
        try{ 
            const photomouseRef = ref(storage, id); // Замените на вашу коллекцию
            
            const promises = fileList.map(async (file) => {
                const fileRef = ref(photomouseRef, file.name);
                await uploadBytes(fileRef, file.originFileObj);
            });
            
            await Promise.all(promises);
        }catch(error){ 
            console.log(error);
        }
    }

)
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