import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("userToken") || null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            localStorage.setItem("userToken", action.payload)
        },
        removeToken: (state) => {
            state.token = null
            localStorage.removeItem("userToken")
        }
    }
})

export const { setToken, removeToken } = authSlice.actions
export const authReducer = authSlice.reducer
