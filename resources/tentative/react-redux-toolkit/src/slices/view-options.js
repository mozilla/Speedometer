import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    scrollToItemValue: 0,
};

export const viewOptionsSlice = createSlice({
    name: "viewOptions",
    initialState,
    reducers: {
        setScrollToItemValue: (state, { payload }) => {
            state.scrollToItemValue = payload;
        },
    },
});

export const { setScrollToItemValue } = viewOptionsSlice.actions;
export default viewOptionsSlice.reducer;
