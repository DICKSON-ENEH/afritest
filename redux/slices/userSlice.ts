import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface iUser {
	id: string;
	name: string;
	email: string;

}

interface UserState {
	isLoggedIn: boolean;
	user?: iUser | null;
}

const userSlice = createSlice({
	name: "user",
	initialState: {
		isLoggedIn: false,
		user: null,
	} as UserState,
	reducers: {
		setUserStatus: (
			state,
			action: PayloadAction<{
				isLoggedIn: boolean;
				user: iUser | null;
			}>
		) => {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.user = action.payload.user;
		},
	},
});

export const { setUserStatus } = userSlice.actions;
export const userReducer = userSlice.reducer;
