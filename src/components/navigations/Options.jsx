import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "@/context/ContextTheme";

import Image from "../image/Image";

const MenuContainer = styled.header`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundMenuDark};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 15px;
  z-index: 5;
`;
const Option = styled.h3`
  color: white;
  gap: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 1px solid #a3a3a379;
  cursor: pointer;
  :active {
    background-color: #3a3a3b7a;
    transition: 0.5s;
  }

  @media (min-width: 615px) {
    :hover {
      background-color: ${(props) => props.theme.hoverDark};
    }
  }
`;
const OptionAlt = styled(Option)`
  flex-direction: column;
`;
const OptionColor = styled.p`
  font-size: 16px;
  color: grey;
  padding: 7px;
`;
const MenuColorContainer = styled.div`
  width: 80%;
  height: 70px;
  position: absolute;
  background: red;
  bottom: 18%;
`;
export default function Options({ hasUser }) {
  const [showSelectColor, setIsShowSelectColor] = useState(false);
  const { theme, toggleThemeLight, toggleThemeDark } = useTheme();

  return (
    <MenuContainer>
      {hasUser ? (
        <div
          style={{
            borderBottom: "1px solid #a3a3a379",
            borderTop: "1px solid #a3a3a379",
          }}
        >
          <Option>Sobre nós</Option>
          <Option>Editar meus links </Option>
          <Option isDark={theme}>Meus links</Option>
          <OptionAlt onClick={() => setIsShowSelectColor(!showSelectColor)}>
            Modo escuro
            <OptionColor>
              {theme === "dark" ? "Ativado" : "Desativado"}
            </OptionColor>
            {showSelectColor && (
              <MenuColorContainer>
                <OptionColor onClick={toggleThemeDark}>On</OptionColor>
                <OptionColor onClick={toggleThemeLight}>Off</OptionColor>
              </MenuColorContainer>
            )}
          </OptionAlt>
          <Option style={{ color: "red" }}>
            <Image image="/sair.png" alt="" />
            Sair
          </Option>
        </div>
      ) : (
        <div
          style={{
            borderBottom: "1px solid #a3a3a379",
            borderTop: "1px solid #a3a3a379",
          }}
        >
          <Option>Comprar cartão</Option>
          <Option>Sobre nós</Option>
          <Option>Criar meus links</Option>
          <Option>Me cadastrar</Option>
        </div>
      )}
    </MenuContainer>
  );
}
