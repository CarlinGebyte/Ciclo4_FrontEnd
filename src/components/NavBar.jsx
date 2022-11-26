import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../Context";
import Button from "./Button";

const Nav = styled.nav`
	display: flex;
	padding: 0 50px;
	background-color: #fff;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const NavList = styled.ul`
	width: 100%;
	display: flex;
	list-style: none;
	justify-content: space-between;
	align-items: center;
	margin: 0;
	padding: 0;
	flex-wrap: wrap;
`;

const NavListItem = styled.li`
	margin: 0 10px;
	text-transform: uppercase;
	border: 1px solid transparent;
	transition: all 0.3s ease-in-out;
	height: 40px;
	a {
		display: flex;
		align-items: center;
		padding: 0 10px;
		height: 100%;
	}
	&:hover {
		background-color: #f5f5f5;
	}
`;

const NavLogoutItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const NavBar = ({ className }) => {
	const { auth, logout } = useContext(AppContext);
	return (
		<header className={className}>
			<Nav>
				<NavList>
					<NavListItem>
						<Link to="/">Registraduría</Link>
					</NavListItem>
					{auth.isAuth && (
						<>
							<NavListItem>
								<Link to="/partidos">Partidos</Link>
							</NavListItem>
							<NavListItem>
								<Link to="/candidatos">Candidatos</Link>
							</NavListItem>
							<NavListItem>
								<Link to="/mesas">Mesas</Link>
							</NavListItem>
							<NavListItem>
								<Link to="/resultados">Resultados</Link>
							</NavListItem>
							<NavLogoutItem>
								<Button color="red" onClick={() => logout()}>
									Cerrar sesión
								</Button>
							</NavLogoutItem>
						</>
					)}

					{!auth.isAuth && (
						<NavListItem>
							<Link to="/login">Iniciar sesión</Link>
						</NavListItem>
					)}
				</NavList>
			</Nav>
		</header>
	);
};

const StyledNavBar = styled(NavBar)``;

export default StyledNavBar;
