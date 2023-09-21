import { Spinner } from "@chakra-ui/react"; 
export const Preloader = () =>{ 
    return( 
        <div> 
            <div className='spinner' > 
            <Spinner className='spin' color='blue' colorScheme='cyan'/>
            </div> 
        </div>
    )
}