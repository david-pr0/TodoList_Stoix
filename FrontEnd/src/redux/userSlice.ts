// src/redux/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    id: number | null;
    username: string | null;
    token: string | null;
}

const initialState: UserState = {
    id: null,
    username: null,
    token: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ id: number; username: string; token: string }>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        clearUser: (state) => {
            state.id = null;
            state.username = null;
            state.token = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
