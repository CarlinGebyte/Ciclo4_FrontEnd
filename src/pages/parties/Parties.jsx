import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { Button, Modal } from "../../components";
import { AppContext } from "../../Context";
import { default as EditForm } from "./EditParty";
import {
	CardContainer,
	Card,
	PageHeader,
	AdminCardOptions,
	CardTitle,
	PageHeaderGroup,
} from "../../styles";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { deleteParty } from "../../helpers";

export const Parties = ({ className }) => {
	const { api, getApi, auth } = useContext(AppContext);
	const { parties, candidates } = api;
	const { userRole } = auth;
	const [isOpen, setIsOpen] = useState(false);
	const [party, setParty] = useState({ name: "", description: "" });

	const navigate = useNavigate();

	useEffect(() => {
		getApi();
	}, [isOpen]);

	const handleClickEdit = (party) => {
		setIsOpen(true);
		setParty(party);
	};

	return (
		<div className={className}>
			<PageHeaderGroup>
				<PageHeader isAdmin={userRole === "Admin"}>Partidos</PageHeader>
				{userRole === "Admin" && (
					<Button color="green" onClick={() => navigate("/admin/partidos")}>
						Agregar
					</Button>
				)}
			</PageHeaderGroup>
			<CardContainer>
				{parties?.map((res) => (
					<Card key={res._id}>
						<CardTitle>{res.name}</CardTitle>
						<div>{res.description}</div>
						{userRole === "Admin" && (
							<AdminCardOptions>
								<Button color="green" onClick={() => handleClickEdit(res)}>
									Editar
								</Button>
								<Button
									color="red"
									onClick={() =>
										deleteParty({ id: res._id, getApi, candidates })
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
					<EditForm setIsOpen={setIsOpen} setParty={setParty} party={party} />
				</Modal>
			)}
		</div>
	);
};

const StyledParties = styled(Parties)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledParties;
