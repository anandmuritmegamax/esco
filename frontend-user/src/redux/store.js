import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import authReducer from "./slices/authSlice";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { adminApi } from "./api/adminApi";
import { flightApi } from "./api/flightApi";
import { flightTypeApi } from "./api/flightTypeApi";
import { airportApi } from "./api/airportApi";
import { bookingApi } from "./api/bookingApi";
import { leadApi } from "./api/leadApi";
import { facilityApi } from "./api/facilityApi";
import { flightCategoryApi } from "./api/flightCategoryApi";
import { pilotApi } from "./api/pilotApi"; // Import the pilotApi
import { priceSettingApi } from "./api/priceSettingApi"; // Import the priceSettingApi
import searchReducer from "./slices/searchSlice";
import { emptyLegApi } from "./api/emptyLegApi";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        search: searchReducer,
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [adminApi.reducerPath]: adminApi.reducer,
        [flightApi.reducerPath]: flightApi.reducer,
        [flightTypeApi.reducerPath]: flightTypeApi.reducer,
        [airportApi.reducerPath]: airportApi.reducer,
        [bookingApi.reducerPath]: bookingApi.reducer,
        [leadApi.reducerPath]: leadApi.reducer,
        [facilityApi.reducerPath]: facilityApi.reducer,
        [flightCategoryApi.reducerPath]: flightCategoryApi.reducer,
        [pilotApi.reducerPath]: pilotApi.reducer,
        [priceSettingApi.reducerPath]: priceSettingApi.reducer, // Add the priceSettingApi reducer
        [emptyLegApi.reducerPath]: emptyLegApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([authApi.middleware, userApi.middleware, adminApi.middleware, flightApi.middleware, flightTypeApi.middleware, airportApi.middleware, bookingApi.middleware, leadApi.middleware, facilityApi.middleware, flightCategoryApi.middleware, pilotApi.middleware, priceSettingApi.middleware, emptyLegApi.middleware])
})