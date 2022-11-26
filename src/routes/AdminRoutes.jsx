import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const AdminRoutes = ({ isAuth }) => {
	if (isAuth) {
		return <Outlet />;
	}
	return <Navigate to="/login" />;
};

export default AdminRoutes;
