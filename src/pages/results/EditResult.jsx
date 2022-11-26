import axios from "axios";
import React, { useRef, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AppContext } from "../../Context";
import { putResult } from "../../helpers";
import { FormInput, FormSection, FormSelect, FormTitle } from "../../styles";

const EditResult = ({ className, setIsOpen, setResult, result }) => {
	const { api, getApi } = useContext(AppContext);

	const { candidates, tables } = api;

	const tableRef = useRef();
	const candidateRef = useRef();
	const electionsRef = useRef();
	const resultRef = useRef();

	const handleEditResult = async (e) => {
		e.preventDefault();

		const table = tableRef.current.value;
		const candidate = candidateRef.current.value;

		const resultEdited = {
			elections: electionsRef.current.value,
			result: resultRef.current.value,
		};

		if (table === "" || candidate === "") {
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Todos los campos son obligatorios",
			});
		}

		putResult({
			result: resultEdited,
			id: result._id,
			table,
			candidate,
			setResult,
			setIsOpen,
			getApi,
		});
	};

	return (
		<form className={className} onSubmit={handleEditResult}>
			<FormTitle>Editar Resultado</FormTitle>
			<FormSection>
				<label>
					Mesa
					<FormSelect
						name="table"
						ref={tableRef}
						defaultValue={result.table?._id}
						required
					>
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
						defaultValue={result.candidate?._id}
						required
					>
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
						value={result.elections}
						onChange={(e) =>
							setResult({ ...result, elections: e.target.value })
						}
						required
					/>
				</label>
			</FormSection>
			<FormSection>
				<label>
					Resultado
					<FormInput
						type="number"
						name="result"
						ref={resultRef}
						value={result.result}
						onChange={(e) => setResult({ ...result, result: e.target.value })}
						required
					/>
				</label>
			</FormSection>
			<Button color="green" type="submit">
				Editar
			</Button>
		</form>
	);
};

const StyledEditResult = styled(EditResult)`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	max-width: 500px;
	margin: 0 auto;
	padding: 50px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default StyledEditResult;
