import styled, { keyframes } from "styled-components";
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
  color: #f3f3f3;
  padding: 14px 10px;

  @media (min-width: 768px) {
    :hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.hoverDark};
    }
  }
`;
const MenuColorContainer = styled.div`
  width: 100%;
  height: 100px;
  position: absolute;
  background: ${(props) => props.theme.backgroundMenuDark};
  bottom: 11%;
  animation: ${(props) => (props.showOptions ? slideDown : slideUp)} 0.3s
    forwards;
  transform-origin: top;
  @media (min-width: 1300px) {
    bottom: 17%;
  }
`;
const slideDown = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: scaleY(1);
    opacity: 1;
  }
  to {
    transform: scaleY(0);
    opacity: 0;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background: #a3a3a379;
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
          <Option>Meus links</Option>
          <OptionAlt onClick={() => setIsShowSelectColor(!showSelectColor)}>
            Modo escuro
            <h5 style={{ color: "#707070" }}>
              {theme === "dark" ? "Ativado" : "Desativado"}
            </h5>
            {showSelectColor && (
              <MenuColorContainer
                isDark={theme === "dark" ? true : false}
                showOptions={showSelectColor}
              >
                <OptionColor onClick={toggleThemeDark}>On</OptionColor>
                <Line />
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
