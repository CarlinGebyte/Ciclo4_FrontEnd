import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { NavBar } from "../components";
import { AppContext } from "../Context";
import {
	AddCandidate,
	AddParty,
	AddResult,
	AddTable,
	Candidates,
	Home,
	Login,
	Parties,
	Results,
	Tables,
} from "../pages";
import AdminRoutes from "./AdminRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
	const { auth } = useContext(AppContext);
	const { isAuth } = auth;

	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route element={<PublicRoutes isAuth={isAuth} />}>
					<Route path="/login" element={<Login />} />
				</Route>
				<Route element={<AdminRoutes isAuth={isAuth} />}>
					<Route path="/admin/partidos" element={<AddParty />} />
					<Route path="/admin/candidatos" element={<AddCandidate />} />
					<Route path="/admin/mesas" element={<AddTable />} />
					<Route path="/admin/resultados" element={<AddResult />} />
					<Route path="/partidos" element={<Parties />} />
					<Route path="/candidatos" element={<Candidates />} />
					<Route path="/mesas" element={<Tables />} />
					<Route path="/resultados" element={<Results />} />
				</Route>
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRoutes;
