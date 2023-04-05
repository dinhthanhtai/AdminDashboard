import React, { createContext, useState } from "react";
import { publicFetch } from "../utils/fetch";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
	const navigate = useNavigate();

	const token = localStorage.getItem("token");
	const userInfo = localStorage.getItem("userInfo");
	const expiresAt = localStorage.getItem("expiresAt");

	const [authState, setAuthState] = useState({
		token,
		expiresAt,
		userInfo: userInfo ? JSON.parse(userInfo) : {}
	});

	const setAuthInfo = ({ token, userInfo, expiresAt }) => {
		localStorage.setItem("token", token);
		localStorage.setItem("userInfo", JSON.stringify(userInfo));
		localStorage.setItem("expiresAt", expiresAt);

		setAuthState({
			token,
			userInfo,
			expiresAt
		});
	};

	const logout = async () => {
		try {
			await publicFetch.delete("/token/invalidate");
			localStorage.removeItem("token");
			localStorage.removeItem("userInfo");
			localStorage.removeItem("expiresAt");
			setAuthState({});
			navigate("/login");
		} catch (err) {
			console.log(err);
		}
	};

	const getAccessToken = () => {
		return localStorage.getItem("token");
	};

	return (
		<Provider
			value={{
				authState,
				setAuthState: (auInfo) => setAuthInfo(auInfo),
				getAccessToken,
				logout
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
