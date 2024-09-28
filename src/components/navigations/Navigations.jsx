import styled from "styled-components";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ContextTheme";
import { useRouter } from "next/navigation";
import axios from "axios";

import Options from "./Options";
import Image from "../image/Image";

const NavContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
`;
const ImageAlt = styled(Image)`
  z-index: 5;
`;
const Logo = styled.h3`
  font-style: italic;
  cursor: pointer;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function Navigations({ hasUser }) {
  const [isMenu, setIsMenu] = useState(false);
  const [hasAbout, setHasAbout] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const { theme } = useTheme();

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

  const verifyUser = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user/verify-session`,
        configAuth
      );

      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      setUserData(false);
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
    verifyUser();
    getAbout();
  }, [isMenu]);

  return (
    <NavContainer isDark={DarkCondition}>
      <Logo onClick={() => router.push("/")} isDark={DarkCondition}>
        HelloVisit
      </Logo>
      {isMenu && (
        <>
          {hasUser ? (
            <Options
              hasUser={userData && userData.fullName}
              hasAbout={hasAbout && hasAbout.createdBy}
              logOut={() => setUserData(null)}
            />
          ) : (
            <Options logOut={() => setUserData(null)} />
          )}
        </>
      )}
      <ImageAlt
        onClick={() => setIsMenu(!isMenu)}
        isMenu={isMenu}
        image={theme === "dark" ? "/menu.png" : "/menuLight.png"}
        alt=""
      />
    </NavContainer>
  );
}
