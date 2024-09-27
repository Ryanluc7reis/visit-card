import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ContextTheme";

import Image from "../image/Image";

const MenuContainer = styled.header`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundDark};
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 15px;
  z-index: 5;
`;
const Option = styled.h3`
  color: ${(props) => props.theme.textDark};
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
      background-color: ${(props) => props.theme.hoverLight};
    }
  }
`;
const OptionAlt = styled(Option)`
  flex-direction: column;
`;
const OptionColor = styled.p`
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textDark};
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
  position: fixed;
  background-color: ${(props) => props.theme.backgroundDark};
  margin-top: 190px;
  animation: ${(props) => (props.showOptions ? slideDown : slideUp)} 0.3s
    forwards;
  transform-origin: top;
  border-bottom: 1px solid #a3a3a379;
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
const ImageAlt = styled(Image)`
  position: absolute;
  right: 38%;
  @media (min-width: 768px) {
    right: 44%;
  }
  @media (min-width: 1024px) {
    right: 46%;
  }
  @media (min-width: 1349px) {
    right: 47%;
  }
`;
const NameUser = styled.h2`
  color: white;
  margin-bottom: 15px;
`;
export default function Options({ hasUser, hasAbout, logOut }) {
  const router = useRouter();
  const { theme, toggleThemeLight, toggleThemeDark } = useTheme();
  const [showSelectColor, setShowSelectColor] = useState(false);

  const DarkCondition = theme === "dark" ? true : false;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const AUTH_NAME = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const configAuth = {
    headers: {
      [AUTH_NAME]: token,
    },
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/user/logout`,
        {},
        configAuth
      );
      if (response.status === 200) {
        logOut();
      }
    } catch (error) {
      console.error("Erro durante o logout:", error);
    }
  };
  const handleOutsideClick = () => {
    setShowSelectColor(false);
  };
  const handleColorClick = (e) => {
    setShowSelectColor(!showSelectColor);
    e.stopPropagation();
  };
  return (
    <MenuContainer onClick={handleOutsideClick} isDark={DarkCondition}>
      {hasUser ? (
        <>
          <NameUser isDark={DarkCondition}>Olá, {hasUser}</NameUser>
          <div
            style={{
              borderBottom: "1px solid #a3a3a379",
              borderTop: "1px solid #a3a3a379",
            }}
          >
            <Option isDark={DarkCondition}>Sobre nós</Option>
            {hasAbout ? (
              <>
                <Option
                  isDark={DarkCondition}
                  onClick={() => router.push("/editprofile")}
                >
                  Editar perfil
                </Option>
                <Option isDark={DarkCondition} onClick={() => router.push("/")}>
                  Minha página
                </Option>
              </>
            ) : (
              <Option
                isDark={DarkCondition}
                onClick={() => router.push("/createprofile")}
              >
                Criar meus links
              </Option>
            )}

            <OptionAlt isDark={DarkCondition} onClick={handleColorClick}>
              Modo escuro
              <p style={{ color: "#707070", fontSize: "16px" }}>
                {theme === "dark" ? "Ativado" : "Desativado"}
              </p>
              {showSelectColor && (
                <MenuColorContainer
                  isDark={DarkCondition}
                  showOptions={showSelectColor}
                >
                  <OptionColor isDark={DarkCondition} onClick={toggleThemeDark}>
                    On
                    {theme === "dark" && <ImageAlt image="/check.png" alt="" />}
                  </OptionColor>
                  <Line />
                  <OptionColor
                    isDark={DarkCondition}
                    onClick={toggleThemeLight}
                  >
                    Off
                    {theme === "light" && (
                      <ImageAlt image="/check.png" alt="" />
                    )}
                  </OptionColor>
                </MenuColorContainer>
              )}
            </OptionAlt>
            <Option
              isDark={DarkCondition}
              onClick={handleLogout}
              style={{ color: "red" }}
            >
              <Image image="/sair.png" alt="" />
              Sair
            </Option>
          </div>
        </>
      ) : (
        <div
          style={{
            borderBottom: "1px solid #a3a3a379",
            borderTop: "1px solid #a3a3a379",
          }}
        >
          <Option isDark={DarkCondition}>Comprar cartão</Option>
          <Option isDark={DarkCondition}>Sobre nós</Option>
          <Option isDark={DarkCondition} onClick={() => router.push("/signup")}>
            Cadastrar-se
          </Option>
          <OptionAlt isDark={DarkCondition} onClick={handleColorClick}>
            Modo escuro
            <p style={{ color: "#707070", fontSize: "16px" }}>
              {theme === "dark" ? "Ativado" : "Desativado"}
            </p>
            {showSelectColor && (
              <MenuColorContainer
                isDark={DarkCondition}
                showOptions={showSelectColor}
              >
                <OptionColor isDark={DarkCondition} onClick={toggleThemeDark}>
                  On
                  {theme === "dark" && <ImageAlt image="/check.png" alt="" />}
                </OptionColor>
                <Line />
                <OptionColor isDark={DarkCondition} onClick={toggleThemeLight}>
                  Off
                  {theme === "light" && <ImageAlt image="/check.png" alt="" />}
                </OptionColor>
              </MenuColorContainer>
            )}
          </OptionAlt>
          <Option isDark={DarkCondition} onClick={() => router.push("/login")}>
            Entrar
            <Image image="/entrar.png" alt="" />
          </Option>
        </div>
      )}
    </MenuContainer>
  );
}
