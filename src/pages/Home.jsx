import React, { useContext } from "react";
import { Button } from "../components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Card, CardContainer, CardTitle, PageHeader } from "../styles";
import { useApi } from "../hooks";
import { AppContext } from "../Context";

const HomeDescription = styled.div`
	font-size: 20px;
	font-weight: 400;
	margin: 20px 0;
`;

const Home = ({className}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<PageHeader>Software de Registro y Conteo Electoral</PageHeader>
			<HomeDescription>
				Software dedicado para realizar el registro y conteo de votos en las
				elecciones en Colombia, con el fin de garantizar la transparencia y la
				seguridad de los procesos electorales.
			</HomeDescription>
			<CardContainer>
				<Card>
					<CardTitle>Partidos</CardTitle>
					<div>
						Para ver los partidos electorales registrados en las elecciones
					</div>
					<Button color={"green"} onClick={() => navigate("/partidos")}>
						Partidos
					</Button>
				</Card>
				<Card>
					<CardTitle>Candidatos</CardTitle>
					<div>
						<div>
							Para ver los candidatos electorales registrados en las elecciones
						</div>
					</div>
					<Button color={"green"} onClick={() => navigate("/candidatos")}>
						Candidatos
					</Button>
				</Card>
				<Card>
					<CardTitle>Mesas</CardTitle>
					<div>
						<div>
							Para ver los puestos de votación registrados en las elecciones
						</div>
					</div>
					<Button color={"green"} onClick={() => navigate("/mesas")}>
						Mesas
					</Button>
				</Card>
				<Card>
					<CardTitle>Resultados</CardTitle>
					<div>
						<div>
							Para ver los resultados electorales registrados en las elecciones
						</div>
					</div>
					<Button color={"green"} onClick={() => navigate("/resultados")}>
						Resultados
					</Button>
				</Card>
			</CardContainer>
		</div>
	);
};

const StyledHome = styled(Home)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledHome;
