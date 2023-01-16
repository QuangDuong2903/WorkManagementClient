import { createBrowserRouter } from "react-router-dom"

import LoginPage from "../pages/LoginPage/LoginPage"
import HomePage from "../pages/HomePage/HomePage"
import Boards from "../pages/HomePage/BoardsOutlet/BoardsOutlet"
import HomeOutlet from "../pages/HomePage/HomeOutlet/HomeOutlet"
import MyWorkOutlet from "../pages/HomePage/MyWorkOutlet/MyWorkOutlet"

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
                path: 'board/:boardId',
                element: <Boards/>
            },
            {
                path: 'board/',
                element: <Boards/>
            },
            {
                path: 'my-work',
                element: <MyWorkOutlet/>
            }
        ]
    },
    {
        path: '/authentication',
        element: <LoginPage/>,
    }
])

export  default router