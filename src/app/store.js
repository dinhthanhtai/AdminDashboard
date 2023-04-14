import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "../features/theme/themeSlice";
import AuthReducer from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";

export default configureStore({
	reducer: {
		theme: ThemeReducer,
		auth: AuthReducer,
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiSlice.middleware),
	devTools: true
});
