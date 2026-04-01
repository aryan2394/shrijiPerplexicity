import React from 'react'
import {useSelector} from "react-redux"
const Dashboard = () => {
    const {user}=useSelector(state=>state.auth)
    console.log(user)
    // lekin jab user refresh karega tab null ho jayega beacuse refresh ke baad saare state initail pe chale gaye toh inistatl stte of user-null 
    // toh humien ye take care karna hai ki refresh ke baad wo state initail pe n jaaye usski state store rahe 
    // these is calledhydration matlba humein ky karna hoga ki app jaise hi render ho wapas se uski value and stet store kar de 
    // go to APP.JSX and there do one thing call handleGetMe
  return (
    <div>
      <h1>Dashboard by shri ji</h1>
    </div>
  )
}

export default Dashboard
