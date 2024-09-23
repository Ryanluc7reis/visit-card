"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useState, useEffect } from "react";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import About from "@/components/about/About";
import Link from "@/components/links/Link";
import PopUpMessage from "@/components/popupmessage/PopUpMessage";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";
import Image from "@/components/image/Image";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 25px;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
`;

const Line = styled.div`
  width: 170px;
  height: 2px;
  background-color: ${(props) =>
    props.isDark ? props.theme.textDark : "#696565"};
`;
const StyledFlexTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
const TitleSection = styled.h3`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const ErrorMessage = styled.h3`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const StyledFlexErrorMessage = styled.div`
  display: flex;
  gap: 7px;
`;
export default function Home() {
  const { theme } = useTheme();
  const { messageType, showPopUp, setShowPopUp, setMessageType } = usePopUp();
  const [aboutData, setAboutData] = useState(null);
  const [error, setError] = useState(false);
  const [linksData, setlinksData] = useState([]);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [userData, setUserData] = useState(null);

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

  const fullName = userData && userData.fullName;

  const getCard = async () => {
    try {
      const response = await axios.get(`${API_URL}/card/ryan1`);
      const data = response.data;

      setAboutData(data.about[0]);
      setlinksData(data.links[0].links);
    } catch (error) {
      setError(true);
      console.error("Erro ao obter os dados do cartão:", error);
    }
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

  useEffect(() => {
    getCard();
    verifyUser();
    setLoadingScreen(false);

    setTimeout(() => {
      setShowPopUp(false);
    }, 3500);
  }, []);

  if (loadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <>
      {showPopUp && (
        <PopUpMessage error={messageType === "error" ? true : false}>
          {messageType === "hasProfile" && "Você já possui um perfil"}
          {messageType === "createdUser" && "Conta criada com sucesso"}
          {messageType === "createdProfile" && "Perfil criado com sucesso"}
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>{fullName ? `HelloVisit / ${fullName}` : `HelloVisit `}</title>
      <Navigations hasUser={fullName} />
      <Container isDark={DarkCondition}>
        {aboutData === null ? (
          <>
            {error ? (
              <StyledFlexErrorMessage>
                <ErrorMessage isDark={DarkCondition}>
                  Erro ao obter dados
                </ErrorMessage>
                <Image
                  isDark={DarkCondition}
                  imageDark="badEmoji-dark.png"
                  image="badEmoji-white.png"
                  alt=""
                />
              </StyledFlexErrorMessage>
            ) : (
              <LoadingScreen loadingContent />
            )}
          </>
        ) : (
          <About
            id={aboutData._id}
            name={aboutData.name}
            companyName={aboutData.companyName}
            location={aboutData.location}
            description={aboutData.description}
            number={userData.number}
          />
        )}

        <StyledFlexTitle>
          <TitleSection isDark={DarkCondition}>Redes Sociais</TitleSection>
          <Line isDark={DarkCondition} />
        </StyledFlexTitle>
        {linksData.length === 0 ? (
          <>
            {error ? (
              <StyledFlexErrorMessage>
                <ErrorMessage isDark={DarkCondition}>
                  Erro ao obter dados
                </ErrorMessage>
                <Image
                  isDark={DarkCondition}
                  imageDark="badEmoji-dark.png"
                  image="badEmoji-white.png"
                  alt=""
                />
              </StyledFlexErrorMessage>
            ) : (
              <LoadingScreen loadingContent />
            )}
          </>
        ) : (
          linksData.map((link) => (
            <Link key={link._id} app={link.app} url={link.url} />
          ))
        )}
      </Container>
    </>
  );
}
