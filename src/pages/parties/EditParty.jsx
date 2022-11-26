import axios from "axios";
import React, { useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Button } from "../../components";
import { AppContext } from "../../Context";
import { putParty } from "../../helpers";
import { FormInput, FormSection, FormTitle } from "../../styles";

const EditParty = ({ className, setIsOpen, setParty, party }) => {
	const { getApi } = useContext(AppContext);

	const nameRef = React.useRef();
	const descriptionRef = React.useRef();

	const handleSubmmit = async (evt) => {
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
		putParty({
			id: party._id,
			party: { name, description },
			setIsOpen,
			getApi,
		});
	};

	return (
		<form className={className} onSubmit={handleSubmmit}>
			<FormTitle>Editar Partido</FormTitle>
			<FormSection>
				<label>
					Nombre
					<FormInput
						type="text"
						name="name"
						ref={nameRef}
						value={party.name}
						onChange={(e) => setParty({ ...party, name: e.target.value })}
						requires
					/>
				</label>
			</FormSection>
			<FormSection>
				<label>
					Descripción
					<FormInput
						type="text"
						name="description"
						ref={descriptionRef}
						value={party.description}
						onChange={(e) =>
							setParty({ ...party, description: e.target.value })
						}
						requires
					/>
				</label>
			</FormSection>
			<Button type="submit" color="green">
				Guardar
			</Button>
		</form>
	);
};

const StyledEditParty = styled(EditParty)`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	max-width: 500px;
	margin: 0 auto;
	padding: 50px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export default StyledEditParty;
