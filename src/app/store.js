import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/lib/persistReducer"
import persistStore from "redux-persist/es/persistStore"

import userReducer from "./reducers/userSlice"
import boardReducer from "./reducers/boardReducer"

export const store = configureStore({
    reducer: {
        userManagement: persistReducer(
            {
                key: "userManagement",
                storage
            },
            userReducer
        ),
        boardManagement: persistReducer(
            {
                key: "boardManagement",
                storage
            },
            boardReducer
        )
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)