import React from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { useEffect } from 'react'
const App = () => {
  const {handleGetMe}=useAuth()
  useEffect(()=>
  {
    handleGetMe()
  },[])
  return (
    <>
    <h1 className='text-3xl'>Shri ji</h1>
    </>
  )
}

export default App
