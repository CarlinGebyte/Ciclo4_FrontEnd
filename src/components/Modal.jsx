import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";

const ModalContainer = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  min-width: 200px;
  min-height: 200px;
	padding: 20px;
	background-color: #fff;
	border-radius: 10px;
	box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  margin: 0 auto;
`;

const ButtonClose = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;
  border: 2px solid red;
  background-color: red;
  cursor: pointer;
  border-radius: 50%;
  line-height: 1;
  font-size: 15px;
  height: 25px;
  width: 25px;
  font-weight: 700;
  color: #fff;
`;

const Modal = ({ className, children, isOpen, setIsOpen }) => {
	if (!isOpen) return null;
	return ReactDom.createPortal(
		<div className={className}>
			<ModalContainer>
        <ButtonClose onClick={() => setIsOpen(false)}>X</ButtonClose>
        {children}
      </ModalContainer>
		</div>,
    document.getElementById("portal")
	);
};

const StyledModal = styled(Modal)`
	display: flex;
	text-align: center;
	flex-direction: column;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.7);
	padding: 0 40px;
	z-index: 100;
`;

export default StyledModal;
