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
import { reviewApi } from "./api/reviewApi";
import { reportApi } from "./api/reportApi";
import { locationApi } from "./api/locationApi";
import { pagesApi } from "./api/pagesApi";

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
        [reviewApi.reducerPath]: reviewApi.reducer,
        [reportApi.reducerPath]: reportApi.reducer,
        [locationApi.reducerPath]: locationApi.reducer,
        [pagesApi.reducerPath]: pagesApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, adminApi.middleware, modelApi.middleware, cloudinaryApi.middleware, pricingApi.middleware, masterApi.middleware, settingsApi.middleware, agencyApi.middleware, clientApi.middleware, reviewApi.middleware, reportApi.middleware, locationApi.middleware, pagesApi.middleware]),
})