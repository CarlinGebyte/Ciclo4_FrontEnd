import axios from "axios";
import React, { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AppContext } from "../../Context";
import { addResult } from "../../helpers";
import {
	AddForm,
	FormInput,
	FormSection,
	FormSelect,
	FormTitle,
} from "../../styles";

const AddResult = ({ className }) => {
	const { api } = useContext(AppContext);
	const { candidates, tables } = api;

	const tableRef = useRef();
	const candidateRef = useRef();
	const electionsRef = useRef();
	const resultRef = useRef();

	const navigate = useNavigate();

	const handleAddResult = async (e) => {
		e.preventDefault();
		const table = tableRef.current.value;
		const candidate = candidateRef.current.value;
		const elections = electionsRef.current.value;
		const result = resultRef.current.value;

		if (table === "" || candidate === "" || elections === "" || result === "") {
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Todos los campos son obligatorios",
			});
		}

		addResult({ result: { elections, result }, table, candidate, navigate });
	};

	return (
		<div className={className}>
			<AddForm onSubmit={handleAddResult}>
				<FormTitle>Agregar Resultado</FormTitle>
				<FormSection>
					<label>
						Mesa
						<FormSelect name="table" ref={tableRef} defaultValue="" required>
							<option value="" hidden>
								Seleccione una mesa
							</option>
							{tables.map((table) => (
								<option key={table._id} value={table._id}>
									{table.number}
								</option>
							))}
						</FormSelect>
					</label>
				</FormSection>
				<FormSection>
					<label>
						Candidato
						<FormSelect
							name="candidate"
							ref={candidateRef}
							defaultValue=""
							required
						>
							<option value="" hidden>
								Seleccione un candidato
							</option>
							{candidates.map((candidate) => (
								<option key={candidate._id} value={candidate._id}>
									{candidate.name}
								</option>
							))}
						</FormSelect>
					</label>
				</FormSection>
				<FormSection>
					<label>
						Elecciones
						<FormInput
							type="text"
							name="elections"
							ref={electionsRef}
							required
						/>
					</label>
				</FormSection>
				<FormSection>
					<label>
						Resultado
						<FormInput type="number" name="result" ref={resultRef} required />
					</label>
				</FormSection>
				<Button color="green" type="submit">
					Agregar
				</Button>
			</AddForm>
		</div>
	);
};

const SyledAddResult = styled(AddResult)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	padding: 50px;
`;

export default SyledAddResult;
