import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AppContext } from "../../Context";
import { putTable } from "../../helpers";
import { FormInput, FormSection, FormTitle } from "../../styles";

const EditTable = ({ className, setIsOpen, setTable, table }) => {
	const { getApi, auth } = useContext(AppContext);
	const { token } = auth;

	const numberRef = useRef();
	const locationRef = useRef();

	const handleEditTablle = async (e) => {
		e.preventDefault();

		const tableEdited = {
			number: numberRef.current.value,
			location: locationRef.current.value,
		};

		putTable({
			table: tableEdited,
			id: table._id,
			setTable,
			setIsOpen,
			getApi,
			token,
		});
	};

	return (
		<form className={className} onSubmit={handleEditTablle}>
			<FormTitle>Editar Mesa</FormTitle>
			<FormSection>
				<label>
					Número
					<FormInput
						type="number"
						name="number"
						ref={numberRef}
						defaultValue={table.number}
						required
					/>
				</label>
			</FormSection>
			<FormSection>
				<label>
					Ubicación
					<FormInput
						type="text"
						name="location"
						ref={locationRef}
						defaultValue={table.location}
						required
					/>
				</label>
			</FormSection>
			<Button color="blue" type="submit">
				Editar
			</Button>
		</form>
	);
};

const StyledEditTable = styled(EditTable)`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	max-width: 500px;
	margin: 0 auto;
	padding: 50px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default StyledEditTable;
