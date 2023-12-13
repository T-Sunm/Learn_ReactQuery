import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../store/slice/AuthSlice'
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})