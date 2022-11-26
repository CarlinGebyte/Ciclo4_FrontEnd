import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PublicRoutes = ({ isAuth }) => {
	if (isAuth) {
		return <Navigate to="/" />;
	}
	return <Outlet />;
};

export default PublicRoutes;
