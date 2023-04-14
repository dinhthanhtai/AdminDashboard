import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthInfo, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3001/api",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;

		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	}
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);

	if (result?.error?.originalStatus === 401) {
		console.log("send Refresh token");

		const refreshResult = await baseQuery("/token/refresh", api, extraOptions);
		console.log("refreshResult", refreshResult);

		if (refreshResult?.data) {
			const authState = api.getState().auth;
			const { token } = refreshResult.data;

			localStorage.setItem("token", token);

			api.dispatch(setAuthInfo({ ...authState, token }));

			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(logOut());
		}
	}

	return result;
};

export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: (builder) => ({
		getDashboard: builder.query({
			query: () => "/dashboard-data",
			keepUnusedDataFor: 5
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: "/authenticate",
				method: "POST",
				body: { ...credentials }
			})
		}),
		signup: builder.mutation({
			query: (credentials) => ({
				url: "/signup",
				method: "POST",
				body: { ...credentials }
			})
		})
	})
});

export const { useLoginMutation, useSignupMutation, useGetDashboardQuery } =
	apiSlice;
