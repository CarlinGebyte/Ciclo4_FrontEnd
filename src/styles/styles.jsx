import styled from "styled-components";

export const PageHeaderGroup = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
`;

const PageHeader = styled.div`
	font-size: 30px;
	font-weight: 700;
	text-transform: uppercase;
	margin: ${({isAdmin}) => isAdmin ? "0" : "0 auto"};
`;

const CardContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
`;

const Card = styled.div`
	width: 300px;
	min-height: 180px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	text-align: center;
	padding: 15px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
	margin: 10px 0;
`;

const CardTitle = styled.div`
	font-size: 20px;
	font-weight: 700;
	text-transform: uppercase;
`;

const AdminCardOptions = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const FormTitle = styled.h1`
	font-size: 1.5rem;
	font-weight: 500;
	text-transform: uppercase;
`;

const FormSection = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
`;

const FormInput = styled.input`
	width: 100%;
	padding: 10px;
	margin-bottom: 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	outline: none;
	font-size: 1rem;
	transition: all 0.3s ease-in-out;
	&:focus {
		border-color: #000;
	}
`;

const FormSelect = styled.select`
	width: 100%;
	padding: 10px;
	margin-bottom: 1rem;
	border: 1px solid #ccc;
	border-radius: 5px;
	outline: none;
	font-size: 1rem;
	transition: all 0.3s ease-in-out;
	&:focus {
		border-color: #000;
	}
`;

const AddForm = styled.form`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 100%;
	min-height: 400px;
	max-width: 500px;
	margin: 0 auto;
	padding: 50px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export {
	CardContainer,
	Card,
	CardTitle,
	PageHeader,
	AdminCardOptions,
	FormTitle,
	FormSection,
	FormInput,
	FormSelect,
	AddForm,
};
