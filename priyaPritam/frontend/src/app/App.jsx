import React from 'react'
import { RouterProvider } from 'react-router'
import { useEffect } from 'react'
import { useAuth } from '../features/auth/hooks/useAuth'
import { routes } from './app.routes'
const App = () => {
  const {handleGetMe}=useAuth()
  useEffect(()=>
  {
    handleGetMe()
  },[])
  return (
    <>
    <RouterProvider router={routes}/>
    </>
  )
}

export default App
