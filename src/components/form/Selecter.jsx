import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledSelect = styled.select`
  width: 112px;
  height: 47px;
  color: #474747c2;
  font-weight: 600;
  border-radius: 7px;
  background: transparent;
  border: none;
  border-right: 1px solid
    ${(props) => (props.isDark ? props.theme.textDark : "#696565")};
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
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
const StyledOption = styled.option`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  background: ${(props) =>
    props.isDark
      ? props.theme.backgroundContentDark
      : props.theme.backgroundContentLight};
`;

export const Selecter = ({ label, ...props }) => {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <StyledContainer {...props}>
      <StyledLabel isDark={DarkCondition}>{label}</StyledLabel>
      <StyledSelect isDark={DarkCondition} {...props}>
        <StyledOption isDark={DarkCondition} value="Instagram">
          Instagram
        </StyledOption>
        <StyledOption isDark={DarkCondition} value="Whatsapp">
          Whatsapp
        </StyledOption>
        <StyledOption isDark={DarkCondition} value="Facebook">
          Facebook
        </StyledOption>
        <StyledOption isDark={DarkCondition} value="Telegram">
          Telegram
        </StyledOption>
        <StyledOption isDark={DarkCondition} value="Linkedin">
          Linkedin
        </StyledOption>
      </StyledSelect>
    </StyledContainer>
  );
};
