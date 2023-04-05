import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token,
	expiresAt,
	userInfo: userInfo ? JSON.parse(userInfo) : {}
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthInfo: (state, action) => {
			const { token, userInfo, expiresAt } = action;

			localStorage.setItem("token", token);
			localStorage.setItem("userInfo", JSON.stringify(userInfo));
			localStorage.setItem("expiresAt", expiresAt);

			return {
				...state,
				token,
				userInfo,
				expiresAt
			};
		}
	}
});
