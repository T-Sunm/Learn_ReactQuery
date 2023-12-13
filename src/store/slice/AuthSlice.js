import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    authenticated: localStorage.getItem('UserInfo') ? true : false,
    toggleAuthenticated: false,
    userInfo: localStorage.getItem('UserInfo') ?
        JSON.parse(localStorage.getItem('UserInfo')) :
        null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthModalFalse: (state) => {
            state.authenticated = false
        },
        setAuthModalTrue: (state) => {
            state.authenticated = true
        },
        setToggleModal: (state, action) => {
            state.toggleAuthenticated = action.payload
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload
        },
    }
})
export const { setAuthModalFalse, setAuthModalTrue, setToggleModal, setUserInfo } = authSlice.actions
export default authSlice.reducer