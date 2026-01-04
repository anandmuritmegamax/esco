// features/models/modelsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = process.env.REACT_APP_API_URL || "http://localhost:4001/api";

// Async thunks
export const fetchModels = createAsyncThunk("models/fetch", async (params = {}) => {
    const res = await axios.get(`${API}/models`, { params });
    return res.data;
});

export const fetchModel = createAsyncThunk("models/fetchOne", async (id) => {
    const res = await axios.get(`${API}/models/${id}`);
    return res.data;
});

export const createModel = createAsyncThunk("models/create", async (payload) => {
    const res = await axios.post(`${API}/models`, payload);
    return res.data;
});

export const updateModel = createAsyncThunk("models/update", async ({ id, payload }) => {
    const res = await axios.put(`${API}/models/${id}`, payload);
    return res.data;
});

export const deleteModel = createAsyncThunk("models/delete", async (id) => {
    await axios.delete(`${API}/models/${id}`);
    return id;
});

const modelsSlice = createSlice({
    name: "models",
    initialState: {
        items: [],
        total: 0,
        loading: false,
        current: null,
        error: null,
    },
    reducers: {
        clearCurrent(state) { state.current = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchModels.pending, (s) => { s.loading = true; })
            .addCase(fetchModels.fulfilled, (s, a) => {
                s.loading = false;
                s.items = a.payload.items;
                s.total = a.payload.total;
            })
            .addCase(fetchModels.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

            .addCase(fetchModel.fulfilled, (s, a) => { s.current = a.payload; })

            .addCase(createModel.fulfilled, (s, a) => { s.items.unshift(a.payload); })
            .addCase(updateModel.fulfilled, (s, a) => {
                s.items = s.items.map(i => i._id === a.payload._id ? a.payload : i);
                if (s.current && s.current._id === a.payload._id) s.current = a.payload;
            })
            .addCase(deleteModel.fulfilled, (s, a) => {
                s.items = s.items.filter(i => i._id !== a.payload);
            });
    }
});

export const { clearCurrent } = modelsSlice.actions;
export default modelsSlice.reducer;
