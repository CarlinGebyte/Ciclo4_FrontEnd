import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AddForm, FormInput, FormSection, FormTitle } from "../../styles";
import { postParty } from "../../helpers";

const AddParty = ({ className }) => {
	const nameRef = React.useRef();
	const descriptionRef = React.useRef();

	const navigate = useNavigate();

	const handleAddParty = async (evt) => {
		evt.preventDefault();
		const name = nameRef.current.value;
		const description = descriptionRef.current.value;

		if (name === "" || description === "") {
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Todos los campos son obligatorios",
			});
		}

		postParty({ party: { name, description }, navigate });
	};

	return (
		<div className={className}>
			<AddForm onSubmit={handleAddParty}>
				<FormTitle>Agregar Partido</FormTitle>
				<FormSection>
					<label>
						Nombre
						<FormInput type="text" name="name" ref={nameRef} required />
					</label>
				</FormSection>
				<FormSection>
					<label>
						Descripción
						<FormInput
							type="text"
							name="description"
							ref={descriptionRef}
							required
						/>
					</label>
				</FormSection>
				<Button type="submit" color="green">
					Agregar
				</Button>
			</AddForm>
		</div>
	);
};

const StyledAddParty = styled(AddParty)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledAddParty;
