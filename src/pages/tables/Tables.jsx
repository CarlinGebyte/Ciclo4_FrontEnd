import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button, Modal } from "../../components";
import { default as EditForm } from "./EditTable";
import { AppContext } from "../../Context";
import {
	AdminCardOptions,
	Card,
	CardContainer,
	CardTitle,
	PageHeader,
	PageHeaderGroup,
} from "../../styles";
import { deleteTable } from "../../helpers";

const Tables = ({ className }) => {
	const { api, getApi, auth } = useContext(AppContext);
	const { tables, results } = api;
	const { userRole, token } = auth;

	const [isOpen, setIsOpen] = useState(false);
	const [table, setTable] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getApi();
	}, [isOpen]);

	const handleClickEdit = (table) => {
		setIsOpen(true);
		setTable(table);
	};

	return (
		<div className={className}>
			<PageHeaderGroup>
				<PageHeader isAdmin={userRole === "Admin"}>Tables</PageHeader>
				<Button color="green" onClick={() => navigate("/admin/mesas")}>
					Agregar
				</Button>
			</PageHeaderGroup>
			<CardContainer>
				{tables.map((obj) => (
					<Card key={obj._id}>
						<CardTitle>{obj.number}</CardTitle>
						<div>{obj.location}</div>
						<AdminCardOptions>
							<Button color="blue" onClick={() => handleClickEdit(obj)}>
								Editar
							</Button>
							<Button
								color="red"
								onClick={() =>
									deleteTable({ id: obj._id, getApi, token, results })
								}
							>
								Eliminar
							</Button>
						</AdminCardOptions>
					</Card>
				))}
			</CardContainer>
			{isOpen && (
				<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
					<EditForm table={table} setTable={setTable} setIsOpen={setIsOpen} />
				</Modal>
			)}
		</div>
	);
};

const StyledTables = styled(Tables)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledTables;
