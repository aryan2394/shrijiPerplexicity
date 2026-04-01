import React from 'react'
import { useSelector } from 'react-redux'
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    console.log(user);
  return (
    <div>
      <h1>Shri ji dashboard page</h1>
    </div>
  )
}

export default Dashboard
