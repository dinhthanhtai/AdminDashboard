import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: "",
	expiresAt: null,
	userInfo: {}
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthInfo: (state, action) => {
			const { token, userInfo, expiresAt } = action.payload;

			if (action.payload) {
				localStorage.setItem("token", token);
				localStorage.setItem("userInfo", JSON.stringify(userInfo));
				localStorage.setItem("expiresAt", expiresAt);
			}

			return {
				token,
				expiresAt,
				userInfo
			};
		},
		logOut: (state) => {
			state.auth = {};
		}
	}
});

export const { setAuthInfo, logOut } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectCurrentToken = (state) => state.auth.token;
export const authenticated = (state) => {
	if (!state.auth.expiresAt) return false;

	return new Date() < new Date(state.auth.expiresAt);
};
