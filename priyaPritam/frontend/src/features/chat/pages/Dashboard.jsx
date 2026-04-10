import React from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useChat';
import { useEffect } from 'react';
const Dashboard = () => {
    const {user}=useSelector((state)=>state.auth);
    console.log(user);
    const {initSocketConnection}=useChat()
    useEffect(()=>
    {
        initSocketConnection()
    })
  return (
    <div>
      <h1>Shri ji Dashboard</h1>
    </div>
  )
}

export default Dashboard
