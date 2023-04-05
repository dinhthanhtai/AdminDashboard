import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
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

ReactDOM.render(
	<Provider store={store}>
		<React.StrictMode>
			<BrowserRouter>
				<AuthProvider>
					<FetchProvider>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/signup' element={<SignUp />} />
							<Route path='/login' element={<Login />} />
							<Route element={<Layout />}>{Routers()}</Route>
							<Route path='*' element={<FourOFour />} />
						</Routes>
					</FetchProvider>
				</AuthProvider>
			</BrowserRouter>
		</React.StrictMode>
	</Provider>,
	document.getElementById("root")
);
