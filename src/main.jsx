import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider, useDispatch } from "react-redux";
import store from "./app/store";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/SignIn";
import Layout from "./components/layout/Layout";
import FourOFour from "./pages/FourOFour";
import Routers from "./components/Routers";
import { AuthProvider } from "./context/AuthContext";
import { FetchProvider } from "./context/FetchContext";

import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./assets/css/grid.css";
import "./assets/css/theme.css";
import "./assets/css/index.css";
import "./tailwind.css";
import RequireAuth from "./features/auth/RequireAuth";
import { setAuthInfo } from "./features/auth/authSlice";

const App = ({ children }) => {
	const dispatch = useDispatch();

	const token = localStorage.getItem("token");
	const userInfo = localStorage.getItem("userInfo");
	const expiresAt = localStorage.getItem("expiresAt");

	dispatch(
		setAuthInfo({
			token,
			userInfo: userInfo ? JSON.parse(userInfo) : {},
			expiresAt
		})
	);

	return <>{children}</>;
};

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<AuthProvider>
					<FetchProvider>
						<App>
							<Routes>
								<Route path='/' element={<Home />} />
								<Route path='/signup' element={<SignUp />} />
								<Route path='/login' element={<Login />} />
								<Route element={<RequireAuth />}>
									<Route element={<Layout />}>{Routers()}</Route>
								</Route>
								<Route path='*' element={<FourOFour />} />
							</Routes>
						</App>
					</FetchProvider>
				</AuthProvider>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
