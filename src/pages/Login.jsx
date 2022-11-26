import axios from "axios";
import React, { useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../components";
import { AppContext } from "../Context";
import { FormInput, FormSection, FormTitle } from "../styles";

const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	height: 400px;
	max-width: 500px;
	margin: 0 auto;
	padding: 50px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Login = ({ className }) => {
	const emailRef = React.useRef();
	const passwordRef = React.useRef();
	const [error, setError] = React.useState("");
	const { login } = useContext(AppContext);
	const navigate = useNavigate();

	const handleSubmit = async (evt) => {
		evt.preventDefault();
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		if (email === "" || password === "") {
			setError("Todos los campos son obligatorios");
		}

		try {
			const res = await axios.post("http://localhost:7777/login", {
				email,
				password,
			});

			if (res) {
				Swal.fire({
					icon: "success",
					title: "Bienvenido",
					text: "Ingreso exitoso",
				});
				login(res.data);
				navigate("/");
			}
		} catch (e) {
			setError("Usuario o contraseña incorrectos");
		}
		evt.target.reset();
	};

	useEffect(() => {
		if (error) {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: error,
			});
			setError("");
		}
	}, [error]);

	return (
		<div className={className}>
			<LoginForm onSubmit={handleSubmit}>
				<FormTitle>Iniciar Sesión</FormTitle>
				<FormSection>
					<label>
						Email
						<FormInput
							type="email"
							name="email"
							ref={emailRef}
							pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
							autoComplete="off"
							required
						/>
					</label>
				</FormSection>
				<FormSection>
					<label>
						Password
						<FormInput
							type="password"
							name="password"
							minLength={3}
							ref={passwordRef}
							required
						/>
					</label>
				</FormSection>
				<Button color="green" type="submit">
					Iniciar Sesión
				</Button>
			</LoginForm>
		</div>
	);
};

const StyledLogin = styled(Login)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledLogin;
