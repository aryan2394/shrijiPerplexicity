import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import "./app/index.css"
import { routes } from './app/app.routes.jsx'
import { RouterProvider } from 'react-router'
import {Provider} from "react-redux"
import { store } from './app/app.store.js'
createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <RouterProvider router={routes}>
        <App/>
      </RouterProvider>
    </Provider>
)
