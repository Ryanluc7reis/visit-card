import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import Image from "../image/Image";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledSelect = styled.select`
  padding: 10px;
  width: 112px;
  height: 47px;
  color: #474747c2;
  font-weight: 600;
  border-radius: 7px;
  font-size: 15px;
  :focus {
    outline: none;
  }
`;

const StyledLabel = styled.p`
  padding: 10px 0px;
  font-weight: bold;
  font-size: 14px;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;

export const Selecter = ({ label, ...props }) => {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <StyledContainer {...props}>
      <StyledLabel isDark={DarkCondition}>{label}</StyledLabel>
      <StyledSelect>
        <option>Instagram</option>
        <option>Whatsapp</option>
        <option>Facebook</option>
        <option>Telegram</option>
        <option>Linkedin</option>
      </StyledSelect>
    </StyledContainer>
  );
};
