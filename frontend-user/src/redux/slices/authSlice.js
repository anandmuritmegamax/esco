import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

/* ================================
   🔹 Send OTP (Email or Phone)
================================ */
export const sendOtp = createAsyncThunk(
    "auth/sendOtp",
    async ({ email, phone }, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/send-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone }),
            });

            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);

            return {
                message: data.message,
                email: email || null,
                phone: phone || null,
            };
        } catch (error) {
            return rejectWithValue("Failed to send OTP");
        }
    }
);

/* ================================
   🔹 Verify OTP (Email or Phone)
================================ */
export const verifyOtp = createAsyncThunk(
    "auth/verifyOtp",
    async ({ email, phone, otp }, { rejectWithValue }) => {
        try {
            const res = await fetch("/api/auth/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, phone, otp }),
            });

            const data = await res.json();
            if (!data.success) return rejectWithValue(data.message);

            // ✅ Always clear old data before saving new user info
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");

            const newUser = data.user;
            localStorage.setItem("userInfo", JSON.stringify(newUser));
            if (newUser.token) localStorage.setItem("token", newUser.token);

            return newUser;
        } catch (error) {
            return rejectWithValue("Failed to verify OTP");
        }
    }
);

/* ================================
   🔹 Auth Slice
================================ */
const authSlice = createSlice({
    name: "auth",
    initialState: {
        userInfo: userInfoFromStorage,
        isAuthenticated: !!userInfoFromStorage,
        loading: false,
        error: null,
        otpSent: false,
        email: null,
        phone: null,
    },
    reducers: {
        // ✅ For normal email/password login
        loginSuccess: (state, action) => {
            // Clear any previous data
            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");

            const newUser = action.payload;
            state.userInfo = newUser;
            state.isAuthenticated = true;

            localStorage.setItem("userInfo", JSON.stringify(newUser));
            if (newUser.token) {
                localStorage.setItem("token", newUser.token);
            }
        },

        // ✅ Logout user
        logout: (state) => {
            state.userInfo = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.otpSent = false;
            state.email = null;
            state.phone = null;

            localStorage.removeItem("userInfo");
            localStorage.removeItem("token");
        },

        updateUserAvatar: (state, action) => {
            if (state.userInfo) {
                state.userInfo.avatar = action.payload;
            }
        },
    },

    /* ===========================
       🔹 Async Reducers
    ============================ */
    extraReducers: (builder) => {
        builder
            // Send OTP
            .addCase(sendOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(sendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.otpSent = true;
                state.email = action.payload.email;
                state.phone = action.payload.phone;
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Verify OTP
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
                state.isAuthenticated = true;
                state.otpSent = false;
                state.email = null;
                state.phone = null;
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { loginSuccess, logout, updateUserAvatar } = authSlice.actions;
export default authSlice.reducer;
