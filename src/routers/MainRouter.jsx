import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage/HomePage"
import Broads from "../pages/HomePage/BroadsOutlet/BroadsOutlet"
import HomeOutlet from "../pages/HomePage/HomeOutlet/HomeOutlet"

const router = createBrowserRouter([
    {
        path: '',
        element: <HomePage/>,
        children: [
            {
                index: true,
                element: <HomeOutlet/>
            },
            {
                path: 'broads',
                element: <Broads/>
            }
        ]
    },
    {
        path: '/authentication',
        element: <LoginPage/>,
    }
])

export  default router