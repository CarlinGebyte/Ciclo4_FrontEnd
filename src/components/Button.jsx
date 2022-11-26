import React from "react";
import styled from "styled-components";

const Button = ({className, children, ...props}) => {
	return <button className={className} {...props}>{children}</button>;
};

const StyledButton = styled(Button)`
	background-color: ${(props) => props.color};
  border: 2px solid ${(props) => props.color};
  cursor: pointer;
  padding: 5px 20px;
  border-radius: 10px;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: transparent;
    color: ${(props) => props.color};
  }
`;

export default StyledButton;
