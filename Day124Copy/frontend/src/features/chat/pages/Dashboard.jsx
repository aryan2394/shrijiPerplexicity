import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(user);
    const chat=useChat()
    useEffect(()=>
    {
        chat.initSocketConnection()
    },[])
  return (
    <div>
      <h1>Shri ji dashboard page</h1>
    </div>
  )
}

export default Dashboard
