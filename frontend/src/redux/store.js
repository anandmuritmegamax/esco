import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/authSlice"
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { adminApi } from "./api/adminApi";
import { modelApi } from "./api/modelApi";
import { cloudinaryApi } from "./api/cloudinaryApi";
import { pricingApi } from "./api/pricingApi";
import { masterApi } from "./api/masterApi";
import { settingsApi } from "./api/settingsApi";
import { agencyApi } from "./api/agencyApi";
import { clientApi } from "./api/clientApi";

export const store = configureStore({
    reducer: {
        auth: userReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [modelApi.reducerPath]: modelApi.reducer,
        [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
        [pricingApi.reducerPath]: pricingApi.reducer,
        [masterApi.reducerPath]: masterApi.reducer,
        [settingsApi.reducerPath]: settingsApi.reducer,
        [agencyApi.reducerPath]: agencyApi.reducer,
        [clientApi.reducerPath]: clientApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, adminApi.middleware, modelApi.middleware, cloudinaryApi.middleware, pricingApi.middleware, masterApi.middleware, settingsApi.middleware, agencyApi.middleware, clientApi.middleware]),
})