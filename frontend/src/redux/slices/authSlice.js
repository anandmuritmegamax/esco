import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token"),
        role: null,
        isAuthenticated: false,
        loading: !!localStorage.getItem("token"), // Start as loading if token exists
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.role = null;
            state.isAuthenticated = false;
            state.loading = false;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            // Pending state for getProfile
            .addMatcher(authApi.endpoints.getProfile.matchPending, (state) => {
                state.loading = true;
            })
            // ✅ LOGIN SUCCESS
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                state.role = action.payload.user.role;
                state.isAuthenticated = true;
                state.loading = false;

                localStorage.setItem("token", action.payload.token);
            })

            // ✅ /ME SUCCESS
            .addMatcher(authApi.endpoints.getProfile.matchFulfilled, (state, action) => {
                state.user = action.payload.user;
                state.role = action.payload.role;
                state.isAuthenticated = true;
                state.loading = false;
            })

            // Rejected for getProfile
            .addMatcher(authApi.endpoints.getProfile.matchRejected, (state) => {
                state.user = null;
                state.role = null;
                state.isAuthenticated = false;
                state.loading = false;
                localStorage.removeItem("token");
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;