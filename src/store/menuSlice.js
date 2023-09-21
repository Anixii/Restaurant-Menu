import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"; 
import { storage, auth, db } from "../firebaseConfig"; 
import { collection, getDocs, query, where, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { generateRandomString } from "../helpers/menuHelper";

const menuCollection = collection(db, 'menu') 

const initialState = { 
    food: [], 
    defineDish: null, 
    defineDishRecomendation: [], 
    currentCategory: 'Все', 
    scrollPosition: 0,
} 
export const createNewDishes = createAsyncThunk( 
    'menu/createDish', 
    async({file,title,price,subtitle,description,pictogram, adds = [],recomendation = [], isRecomended = false},{dispatch}) =>{ 
        try{  
            const randomId = generateRandomString()
            await dispatch(uploadDishPhotos({file, id:randomId}))
            await setDoc(doc(menuCollection, randomId), { 
                id: randomId,
                title, 
                price: +price, 
                subtitle, 
                description, 
                pictogram,
                adds, 
                isRecomended,
                recomendation,
            }) 
            return true
        }catch(error){ 
            console.log(error);
        }
    }
)
export const getAllDishes = createAsyncThunk( 
    'menu/getAllDishes', 
    async ({FC = () =>{}},{dispatch}) =>{ 
        FC(true) 
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
        }finally{ 
            FC(false)
        }
        FC(false)

    }
) 
const getPhotoByDishID = createAsyncThunk(
    'menu/getPhotoByDishID', 
    async({id}) =>{ 
        try{  
            const query = doc(menuCollection, id) 
            const querySnapshot = await getDoc(query)  
            const collectionRef = ref(storage, querySnapshot.data().id)
            const files = await listAll(collectionRef)
            const fileURLs = await Promise.all(
                files.items.map(async (fileRef) => {
                    const downloadURL = await getDownloadURL(fileRef)
                    return downloadURL
                  })
                ) 
            const data = {...querySnapshot.data(), photoURLs: fileURLs}
            return data 
        }catch(error){ 

        }
    }
 )
 export const getDefineDish = createAsyncThunk( 
    'menu/getDefineDish', 
    async ({ id }, { dispatch }) => {  
        try {
            const query = doc(menuCollection, id);
            const querySnapshot = await getDoc(query);
            const collectionRef = ref(storage, querySnapshot.data().id);
            const files = await listAll(collectionRef);
            const fileURLs = await Promise.all(
                files.items.map(async (fileRef) => {
                    const downloadURL = await getDownloadURL(fileRef);
                    return downloadURL;
                })
            );

            const data = { ...querySnapshot.data(), photoURLs:fileURLs }; 

            dispatch(setDefineDish({ dish: data }));      

            if (data.recomendation.length !== 0) {  
                const recomendationPromises = data.recomendation.map((item) => {
                    return dispatch(getPhotoByDishID({ id: item.value }));
                });

                const recomendationResults = await Promise.all(recomendationPromises);   
                console.log(recomendationResults); 
                const res = recomendationResults.map((item) => {
                    return {...item.payload, id: item.meta.arg.id} })
                dispatch(setDefineDishRecomendation({ dish: res }));
            }
        } catch (error) {
            console.log(error);
        }
    }
);

export const uploadDishPhotos = createAsyncThunk(
    'menu/uploadDishPhotos',  
    async ({file, id}) =>{ 
        try{ 
            // const photomouseRef = ref(storage, id)
            
            // const promises = fileList.map(async (file) => {
            //     const fileRef = ref(photomouseRef, file.name)
            //     await uploadBytes(fileRef, file.originFileObj)
            // });
            
            // await Promise.all(promises)
            const photomouseRef = ref(storage, id);
            const fileRef = ref(photomouseRef, file.name);
            await uploadBytes(fileRef, file.originFileObj);
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
            console.log('hello');
            state.defineDish = action.payload.dish
        }, 
        setDefineDishRecomendation(state,action){ 
            state.defineDishRecomendation = action.payload.dish
        }, 
        setCategory(state,action) {
            state.currentCategory = action.payload.category
        }, 
        setScrollPosition(state, action){ 
            state.scrollPosition = action.payload.position
        }
    }
}) 
export const {setDishes,setDefineDish,setDefineDishRecomendation,setCategory,setScrollPosition} = menuSlice.actions 
export default menuSlice.reducer