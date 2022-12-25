import React from "react"
import { useEffect } from "react"

import { RouterProvider } from "react-router-dom"

import router from "./routers/MainRouter"

import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useDispatch } from "react-redux"
import { getUserData } from "./app/reducers/userSlice"
import { useNavigate } from "react-router-dom"

const App = () => {

  const auth = getAuth()
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const data = {
          userName: user.email,
          type: 2,
          givenName: user.displayName.substring(0, user.displayName.indexOf(' ')),
          familyName: user.displayName.substring(user.displayName.indexOf(' ') + 1),
          displayName: user.displayName,
          avatar: user.photoURL,
          email: user.email,
          status: 1
        }
        dispatch(getUserData(data))
      }
    })
  }, [])

  return (
    <RouterProvider router={router} />
  )
}

export default App
