import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #56648f;
  padding: 10px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  width: 180px;
  margin: 8px 0;
  transition: all 200ms ease-in-out;
  :disabled {
    background-color: ${(props) => props.theme.disabled};
  }
  ${(props) => !props.disabled && "cursor: pointer"};
  :hover {
    background-color: ${(props) => !props.disabled && "#677db7"};
  }
`;

export const Button = ({ children, disabled, loading, ...props }) => {
  return (
    <StyledButton disabled={disabled || loading} {...props}>
      {children}
    </StyledButton>
  );
};
