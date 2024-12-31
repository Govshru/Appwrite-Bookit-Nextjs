import { createContext,useContext,useState,useEffect} from 'react'
import checkAuth from '@/app/actions/checkAuth'


const AuthConext=createContext();

export const AuthProvider=({children})=>{
    const [isAuthenticated,setIsAuthenticated]=useState(false);
    const [currentUser,setCurrentUser]=useState(null);


    useEffect(()=>{
        const checkAuthentication=async()=>{
const {isAuthenticated,user}=await checkAuth();

setIsAuthenticated(isAuthenticated);
setCurrentUser(user);
        }
        checkAuthentication();

    },[]);
    return(
        <AuthConext.Provider value={{
            isAuthenticated,setIsAuthenticated,currentUser,setCurrentUser
        }}>
            {children}
        </AuthConext.Provider>
    )
}
export const useAuth=()=>{
    const context=useContext(AuthConext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}