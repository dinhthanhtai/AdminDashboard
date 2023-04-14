import React from "react";
import { useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { authenticated, selectCurrentToken } from "./authSlice";

const RequireAuth = () => {
	const location = useLocation();
	const isAuthenticated = useSelector(authenticated, shallowEqual);

	return isAuthenticated ? (
		<Outlet />
	) : (
		<Navigate to='/login' state={{ from: location }} replace />
	);
};

export default RequireAuth;
