import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"; 
import { storage, auth, db } from "../firebaseConfig"; 
import { collection, getDocs, query, where, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { generateRandomString } from "../helpers/menuHelper";

const menuCollection = collection(db, 'menu') 

const initialState = { 
    food: [], 
    defineDish: null,
} 
export const createNewDishes = createAsyncThunk( 
    'menu/createDish', 
    async({fileList,title,price,subtitle,description,pictogram = {}, adds = [],recomendation = []},{dispatch}) =>{ 
        try{  
            const randomId = generateRandomString()
            await dispatch(uploadDishPhotos({fileList, id:randomId}))
            setDoc(doc(menuCollection, randomId), {
                title, 
                price, 
                subtitle, 
                description, 
                pictogram,
                adds, 
                recomendation,
            }); 
        }catch(error){ 
            console.log(error);
        }
    }
)
export const getAllDishes = createAsyncThunk( 
    'menu/getAllDishes', 
    async (_,{dispatch}) =>{ 
        try{ 
            const q = query(menuCollection, where('id', '!=', ''))
            const querySnapshot = await getDocs(q)
            const dataFromFirestore = []

            querySnapshot.forEach((doc) => {
                dataFromFirestore.push({ id: doc.id, ...doc.data() })
              });  

            const dataWithPhotos = [];
    
            for (const item of dataFromFirestore) {
              const collectionRef = ref(storage, item.id)
              const files = await listAll(collectionRef)
              const fileURLs = await Promise.all(
                files.items.map(async (fileRef) => {
                  const downloadURL = await getDownloadURL(fileRef)
                  return downloadURL
                })
              );
    
              item.photoURLs = fileURLs
              dataWithPhotos.push(item)
            } 
            dispatch(setDishes({dish: dataWithPhotos}))
        }catch(error){ 
            console.log(error)
        }
    }
) 

export const getDefineDish = createAsyncThunk( 
    'menu/getDefineDish', 
    async ({id},{dispatch}) =>{  
        try {
            const query = doc(menuCollection, id) 
            const querySnapshot = await getDoc(query) 
    
            dispatch(setDefineDish({dish: querySnapshot.data()}))    
        } catch (error) {
            console.log(error);
        }

    }
)

export const uploadDishPhotos = createAsyncThunk(
    'menu/uploadDishPhotos',  
    async ({fileList, id}) =>{ 
        try{ 
            const photomouseRef = ref(storage, id)
            
            const promises = fileList.map(async (file) => {
                const fileRef = ref(photomouseRef, file.name)
                await uploadBytes(fileRef, file.originFileObj)
            });
            
            await Promise.all(promises)
        }catch(error){ 
            console.log(error);
        }
    }

)
const menuSlice = createSlice({ 
    name: 'menu', 
    initialState, 
    reducers:{ 
        setDishes(state,action) {
            state.food = action.payload.dish
        }, 
        setDefineDish(state,action){ 
            state.defineDish = action.payload.dish
        }
    }
}) 
export const {setDishes,setDefineDish} = menuSlice.actions 
export default menuSlice.reducer