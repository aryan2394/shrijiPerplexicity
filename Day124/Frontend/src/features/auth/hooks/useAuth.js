import { useDispatch } from "react-redux";
import { register,login,getMe } from "../services/auth.api.js";
import { setUser,setLoading,setError } from "../auth.slice.js";

export const useAuth=()=>
{
    const dispatch=useDispatch();
    async function handleRegister({username,email,password})
    {
        try {
            dispatch(setLoading(true));
            const data=await register({username,email,password})
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Register failed by shri ji" ))
        }finally{
            dispatch(setLoading(false))
        }
    }
    async function handleLogin({email,password})
    {
        try {
            dispatch(setLoading(true))
            const data=await login({email,password})
            setUser(data.user);
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Login failed by shri ji"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    async function handleGeteMe()
    {
        try {
            dispatch(setLoading(true))
            const data=await getMe()
            setUser(data.user)
        } catch (error) {
            dispatch(setError(error.response?.data?.message || "Failed to fetch user data by shri ji"))
        }finally{
            dispatch(setLoading(false))
        }
    }
    return{
        handleGeteMe,
        handleLogin,
        handleRegister
    }
}