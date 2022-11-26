import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { postCandidate } from "../../helpers";
import { AddForm, FormInput, FormSection, FormTitle } from "../../styles";

const AddCandidate = ({ className }) => {
	const nameRef = React.useRef();
	const navigate = useNavigate();

	const handleSubmit = (evt) => {
		evt.preventDefault();
		const name = nameRef.current.value;

		if (name === "") {
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Todos los campos son obligatorios",
			});
		}

		postCandidate({ name }, navigate);
	};

	return (
		<div className={className}>
			<AddForm onSubmit={handleSubmit}>
				<FormTitle>Agregar Candidato</FormTitle>
				<FormSection>
					<label>
						Nombre
						<FormInput type="text" name="name" ref={nameRef} required />
					</label>
				</FormSection>
				<Button color="green" type="submit">
					Agregar
				</Button>
			</AddForm>
		</div>
	);
};

const StyledAddCandidate = styled(AddCandidate)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledAddCandidate;
