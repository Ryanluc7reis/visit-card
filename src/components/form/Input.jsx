import styled from "styled-components";

import { useTheme } from "@/context/ContextTheme";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledLabel = styled.p`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 7px 0px;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  :focus {
    outline: none;
  }
`;

export const Input = ({ label, ...props }) => {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <InputContainer>
      <StyledLabel isDark={DarkCondition}>{label}</StyledLabel>
      <StyledInput isDark={DarkCondition} {...props} />
    </InputContainer>
  );
};
