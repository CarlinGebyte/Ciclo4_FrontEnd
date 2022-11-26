import axios from "axios";
import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AppContext } from "../../Context";
import { putCandidate } from "../../helpers";
import { FormInput, FormSection, FormSelect, FormTitle } from "../../styles";

const EditCandidate = ({ className, candidate, setCandidate, setIsOpen }) => {
	const { api, getApi } = useContext(AppContext);
	const { parties } = api;

	const nameRef = useRef();
	const partyRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		const party = partyRef.current.value;
		if (name === "" || party === "") {
			return Swal.fire({
				icon: "error",
				title: "Error",
				text: "Todos los campos son obligatorios",
			});
		}
		putCandidate({ id: candidate._id, name, party, getApi, setIsOpen });
	};
	return (
		<form className={className} onSubmit={handleSubmit}>
			<FormTitle>Editar Candidato</FormTitle>
			<FormSection>
				<label>
					Nombre
					<FormInput
						type="text"
						name="name"
						ref={nameRef}
						value={candidate.name}
						onChange={(e) =>
							setCandidate({ ...candidate, name: e.target.value })
						}
						required
					/>
				</label>
			</FormSection>
			<FormSection>
				<label>
					Partido
					<FormSelect
						type="text"
						name="party"
						ref={partyRef}
						value={candidate.party?._id}
						onChange={(e) =>
							setCandidate({ ...candidate, party: e.target.value })
						}
						required
					>
						<option value="" hidden>
							Selecciona un partido
						</option>
						{parties?.map((res) => (
							<option key={res._id} value={res._id}>
								{res.name}
							</option>
						))}
					</FormSelect>
				</label>
			</FormSection>
			<Button color="green" type="submit">
				Editar
			</Button>
		</form>
	);
};

const StyledEditCandidate = styled(EditCandidate)``;

export default StyledEditCandidate;
