import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button, Modal } from "../../components";
import { AppContext } from "../../Context";
import { default as EditForm } from "./EditResult";
import {
	AdminCardOptions,
	Card,
	CardContainer,
	CardTitle,
	PageHeader,
	PageHeaderGroup,
} from "../../styles";
import axios from "axios";
import { deleteResult } from "../../helpers";

const Results = ({ className }) => {
	const { api, getApi, auth } = useContext(AppContext);
	const { results } = api;
	const { userRole } = auth;

	const [isOpen, setIsOpen] = useState(false);
	const [result, setResult] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getApi();
	}, [isOpen]);

	const handleDelete = async (id) => {};

	const handleClickEdit = (result) => {
		setIsOpen(true);
		setResult(result);
	};

	return (
		<div className={className}>
			<PageHeaderGroup>
				<PageHeader isAdmin={userRole === "Admin"}>Resultados</PageHeader>
				<Button color="green" onClick={() => navigate("/admin/resultados")}>
					Agregar
				</Button>
			</PageHeaderGroup>
			<CardContainer>
				{results.map((result) => (
					<Card key={result._id}>
						<CardTitle>{result.candidate?.name}</CardTitle>
						<div>
							Mesa: {result.table?.number} / {result.table?.location}
						</div>
						<div>Elecciones: {result.elections}</div>
						<div>Votos: {result.result}</div>
						<AdminCardOptions>
							<Button color="green" onClick={() => handleClickEdit(result)}>
								Editar
							</Button>
							<Button
								color="red"
								onClick={() => deleteResult({ id: result._id, getApi })}
							>
								Eliminar
							</Button>
						</AdminCardOptions>
					</Card>
				))}
			</CardContainer>
			{isOpen && (
				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<EditForm
						setIsOpen={setIsOpen}
						setResult={setResult}
						result={result}
					/>
				</Modal>
			)}
		</div>
	);
};

const StyledResults = styled(Results)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledResults;
