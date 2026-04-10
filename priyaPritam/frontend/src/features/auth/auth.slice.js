import { createSlice } from "@reduxjs/toolkit";
const initialState={
    user:null,
    loading:true,
    error:null
}
export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setUser:(state,action)=>
        {
            state.user=action.payload
        },
        setLoading:(state,action)=>
        {
            state.loading=action.payload
        },
        setError:(state,action)=>
        {
            state.error=action.payload
        }
    }
})

export const {setError,setLoading,setUser}=authSlice.actions
export default authSlice.reducer;