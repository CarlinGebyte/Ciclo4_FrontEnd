import axios from "axios";
import React, { useRef } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AppContext } from "../../Context";
import { postTable } from "../../helpers";
import { AddForm, FormInput, FormSection, FormTitle } from "../../styles";

const AddTable = ({ className }) => {
	const { auth } = useContext(AppContext);
	const { token } = auth;

	const numberRef = useRef();
	const locationRef = useRef();

	const navigate = useNavigate();

	const handleAddTable = async (evt) => {
		evt.preventDefault();
		const table = {
			number: numberRef.current.value,
			location: locationRef.current.value,
		};

		postTable({ table, token, navigate });
	};

	return (
		<div className={className}>
			<AddForm onSubmit={handleAddTable}>
				<FormTitle>Agregar Mesa</FormTitle>
				<FormSection>
					<label>
						Número
						<FormInput type="number" name="number" ref={numberRef} required />
					</label>
				</FormSection>
				<FormSection>
					<label>
						Ubicación
						<FormInput type="text" name="section" ref={locationRef} required />
					</label>
				</FormSection>
				<Button color="blue" type="submit">
					Agregar
				</Button>
			</AddForm>
		</div>
	);
};

const StyledAddTable = styled(AddTable)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default StyledAddTable;
