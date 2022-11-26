import axios from "axios";
import Swal from "sweetalert2";

export const getUser = async (id) => {
	const user = await axios.get(`http://localhost:8080/api/user/${id}/`);
	return user.data;
};

export const postCandidate = async (candidate, navigate) => {
	try {
		await axios.post(`http://localhost:3002/candidates`, candidate);
		Swal.fire({
			icon: "success",
			title: "Candidato agregado",
			text: "El candidato se agregó correctamente, ahora agregue su partido en la sección de editar",
		});
		navigate("/candidatos");
	} catch (error) {
		console.log(error);
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo agregar el candidato",
		});
	}
};

export const putCandidate = async ({ id, name, party, getApi, setIsOpen }) => {
	try {
		await axios.put(`http://localhost:3002/candidates/${id}`, {
			name,
		});
		await axios.put(`http://localhost:3002/candidates/${id}/party/${party}`);

		Swal.fire({
			icon: "success",
			title: "Actualizado con éxito",
			text: "Candidato Actualizado con éxito",
		});
		getApi();
		setIsOpen(false);
	} catch (e) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo actualizar el candidato",
		});
	}
};

export const deleteCandidate = async ({ id, results, getApi }) => {
	try {
		await axios.delete(`http://localhost:3002/candidates/${id}`);

		results.forEach(async (result) => {
			if (result.candidate._id === id) {
				await axios.delete(`http://localhost:3002/results/${result._id}`);
			}
		});

		getApi();

		Swal.fire({
			icon: "success",
			title: "Candidato eliminado",
			showConfirmButton: false,
			timer: 1500,
		});
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Algo salió mal!",
		});
	}
};

export const postParty = async ({ party, navigate }) => {
	try {
		await axios.post("http://localhost:3002/parties", party);
		Swal.fire({
			icon: "success",
			title: "Partido agregado",
			text: "El partido se agregó correctamente",
		});

		navigate("/partidos");
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo agregar el partido",
		});
	}
};

export const putParty = async ({ id, party, getApi, setIsOpen }) => {
	try {
		await axios.put(`http://localhost:3002/parties/${id}`, party);
		Swal.fire({
			icon: "success",
			title: "Actualizado con éxito",
			text: "Partido Actualizado con éxito",
		});
		getApi();
		setIsOpen(false);
	} catch (e) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo actualizar el partido",
		});
	}
};

export const deleteParty = async ({ id, candidates, getApi }) => {
	try {
		await axios.delete(`http://localhost:3002/parties/${id}`);

		candidates.forEach(async (candidate) => {
			if (candidate.party._id === id) {
				await axios.delete(`http://localhost:3002/candidates/${candidate._id}`);
			}
		});

		getApi();

		Swal.fire({
			icon: "success",
			title: "Partido eliminado",
			showConfirmButton: false,
			timer: 1500,
		});
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Algo salió mal!",
		});
	}
};

export const addResult = async ({ result, candidate, table, navigate }) => {
	try {
		await axios.post(
			`http://localhost:3002/results/${table}/candidate/${candidate}`,
			result
		);
		Swal.fire({
			icon: "success",
			title: "Resultado agregado",
			text: "El resultado se agregó correctamente",
		});

		navigate("/resultados");
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo agregar el resultado",
		});
	}
};

export const putResult = async ({
	id,
	result,
	table,
	candidate,
	getApi,
	setIsOpen,
}) => {
	try {
		await axios.put(
			`http://localhost:3002/results/${id}/table/${table}/candidate/${candidate}`,
			result
		);

		getApi();
		setIsOpen(false);
		Swal.fire({
			icon: "success",
			title: "Actualizado con éxito",
			text: "Resultado Actualizado con éxito",
		});
	} catch (e) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo actualizar el resultado",
		});
	}
};

export const deleteResult = async ({ id, getApi }) => {
	try {
		await axios.delete(`http://localhost:3002/results/${id}`);
		getApi();

		Swal.fire({
			icon: "success",
			title: "Resultado eliminado",
			showConfirmButton: false,
			timer: 1500,
		});
	} catch (error) {
		console.log(error);
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Algo salió mal!",
		});
	}
};

export const postTable = async ({ table, navigate, token }) => {
	try {
		await axios.post("http://localhost:7777/tables", table, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		Swal.fire({
			icon: "success",
			title: "Creado con éxito",
			text: "Mesa Creada con éxito",
		});

		navigate("/mesas");
	} catch (e) {
		console.log(e);
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo crear la mesa",
		});
	}
};

export const putTable = async ({ id, table, getApi, setIsOpen, token }) => {
	try {
		await axios.put(`http://localhost:7777/tables/${id}`, table, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		getApi();
		setIsOpen(false);
		Swal.fire({
			icon: "success",
			title: "Actualizado con éxito",
			text: "Mesa Actualizada con éxito",
		});
	} catch (e) {
		Swal.fire({
			icon: "error",
			title: "Error",
			text: "No se pudo actualizar la mesa",
		});
	}
};

export const deleteTable = async ({ id, getApi, token, results }) => {
	try {
		await axios.delete(`http://localhost:7777/tables/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		results.forEach(async (element) => {
			if (element.table._id === id) {
				await axios.delete(`http://localhost:3002/results/${element._id}`);
			}
		});
		getApi();

		Swal.fire({
			icon: "success",
			title: "Mesa eliminada",
			showConfirmButton: false,
			timer: 1500,
		});
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "Algo salió mal!",
		});
	}
};
