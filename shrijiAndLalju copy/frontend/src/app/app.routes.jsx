import {createBrowserRouter} from "react-router"
import Login from "../features/auth/pages/Login"
import Register from "../features/auth/pages/Register"
import Dashboard from "../features/chat/pages/Dashboard"
export const routes=createBrowserRouter(
    [
        {
            path:"/register",
            element:<Register/>
        },
        {
            path:"/login",
            element:<Login/>
        },
        {
            path:"/",
            element:<Dashboard/>
        }
    ]
)
