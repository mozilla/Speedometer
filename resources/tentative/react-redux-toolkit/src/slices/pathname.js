import { createSlice } from "@reduxjs/toolkit";

export const pathnameSlice = createSlice({
    name: "pathname",
    initialState: "/",
    reducers: {
        setPathname: (state, { payload }) => {
            return payload;
        },
    },
});

export const { setPathname } = pathnameSlice.actions;
export default pathnameSlice.reducer;
