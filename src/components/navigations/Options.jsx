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
      background-color: ${(props) => props.theme.hoverLight};
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
  background: ${(props) =>
    props.isDark
      ? props.theme.backgroundMenuDark
      : props.theme.backgroundMenuLight};
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

const NameUser = styled.h2`
  color: white;
  margin-bottom: 15px;
`;
export default function Options({ hasUser, logOut }) {
  const router = useRouter();
  const { theme, toggleThemeLight, toggleThemeDark } = useTheme();
  const [showSelectColor, setIsShowSelectColor] = useState(false);
  const [hasAbout, setHasAbout] = useState(null);

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
  const getAbout = async () => {
    try {
      const response = await axios.get(`${API_URL}/card/getAbout`, configAuth);
      const data = response.data;
      setHasAbout(data.about[0]);
    } catch (error) {
      console.error("Erro ao obter os dados do cartão:", error);
    }
  };
  useEffect(() => {
    getAbout();
  }, []);

  return (
    <MenuContainer>
      {hasUser ? (
        <>
          <NameUser isDark={DarkCondition}>Olá, {hasUser}</NameUser>
          <div
            style={{
              borderBottom: "1px solid #a3a3a379",
              borderTop: "1px solid #a3a3a379",
            }}
          >
            <Option>Sobre nós</Option>
            {hasAbout !== null ? (
              <>
                <Option onClick={() => router.push("/editprofile")}>
                  Editar perfil
                </Option>
                <Option onClick={() => router.push("/")}>Minha página</Option>
              </>
            ) : (
              <Option onClick={() => router.push("/createprofile")}>
                Criar meus links
              </Option>
            )}

            <OptionAlt onClick={() => setIsShowSelectColor(!showSelectColor)}>
              Modo escuro
              <p style={{ color: "#707070", fontSize: "16px" }}>
                {theme === "dark" ? "Ativado" : "Desativado"}
              </p>
              {showSelectColor && (
                <MenuColorContainer
                  isDark={DarkCondition}
                  showOptions={showSelectColor}
                >
                  <OptionColor onClick={toggleThemeDark}>On</OptionColor>
                  <Line />
                  <OptionColor onClick={toggleThemeLight}>Off</OptionColor>
                </MenuColorContainer>
              )}
            </OptionAlt>
            <Option onClick={handleLogout} style={{ color: "red" }}>
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
          <Option>Comprar cartão</Option>
          <Option>Sobre nós</Option>
          <Option onClick={() => router.push("/signup")}>Cadastrar-se</Option>
          <OptionAlt onClick={() => setIsShowSelectColor(!showSelectColor)}>
            Modo escuro
            <p style={{ color: "#707070", fontSize: "16px" }}>
              {theme === "dark" ? "Ativado" : "Desativado"}
            </p>
            {showSelectColor && (
              <MenuColorContainer
                isDark={DarkCondition}
                showOptions={showSelectColor}
              >
                <OptionColor onClick={toggleThemeDark}>On</OptionColor>
                <Line />
                <OptionColor onClick={toggleThemeLight}>Off</OptionColor>
              </MenuColorContainer>
            )}
          </OptionAlt>
          <Option onClick={() => router.push("/login")}>
            Entrar
            <Image image="/entrar.png" alt="" />
          </Option>
        </div>
      )}
    </MenuContainer>
  );
}
