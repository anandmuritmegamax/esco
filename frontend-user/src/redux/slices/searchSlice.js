import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: {
        results: [],
        form: null,
    },
    reducers: {
        setSearchResults: (state, action) => {
            state.results = action.payload.results;
            state.form = action.payload.form;
        },
        clearSearch: (state) => {
            state.results = [];
            state.form = null;
        },
        setSelectedReturnFlight: (state, action) => {
            state.selectedReturnFlight = action.payload;
        },

        setSelectedFlight: (state, action) => {
            state.selectedFlight = action.payload;
        },
    },
});

export const { setSearchResults, clearSearch, setSelectedReturnFlight, setSelectedFlight } = searchSlice.actions;
export default searchSlice.reducer;
