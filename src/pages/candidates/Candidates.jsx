import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "../../components";
import { AppContext } from "../../Context";
import { default as EditForm } from "./EditCandidate";
import {
	AdminCardOptions,
	Card,
	CardContainer,
	CardTitle,
	PageHeader,
	PageHeaderGroup,
} from "../../styles";
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { deleteCandidate } from "../../helpers";

const INITIAL_STATE = {
	name: "",
	party: {
		name: "",
		description: "",
	},
};

const Candidates = ({ className }) => {
	const { api, getApi, auth } = useContext(AppContext);
	const { candidates, results } = api;
	const { userRole } = auth;

	const [isOpen, setIsOpen] = useState(false);
	const [candidate, setCandidate] = useState(INITIAL_STATE);

	const navigate = useNavigate();

	useEffect(() => {
		getApi();
	}, [isOpen]);

	const handleDelete = async (id) => {};

	const handleClickEdit = (candidate) => {
		setIsOpen(true);
		setCandidate(candidate);
	};

	return (
		<div className={className}>
			<PageHeaderGroup>
				<PageHeader isAdmin={userRole === "Admin"}>Candidatos</PageHeader>
				<Button color="green" onClick={() => navigate("/admin/candidatos")}>
					Agregar
				</Button>
			</PageHeaderGroup>
			<CardContainer>
				{candidates?.map((res) => (
					<Card key={res._id}>
						<CardTitle>{res.name}</CardTitle>
						<div>Partido: {res.party?.name}</div>
						{userRole === "Admin" && (
							<AdminCardOptions>
								<Button color="green" onClick={() => handleClickEdit(res)}>
									Editar
								</Button>
								<Button
									color="red"
									onClick={() =>
										deleteCandidate({ id: res._id, results, getApi })
									}
								>
									Eliminar
								</Button>
							</AdminCardOptions>
						)}
					</Card>
				))}
			</CardContainer>
			{isOpen && (
				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<EditForm
						setIsOpen={setIsOpen}
						setCandidate={setCandidate}
						candidate={candidate}
					/>
				</Modal>
			)}
		</div>
	);
};

const StyledCandidates = styled(Candidates)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledCandidates;
