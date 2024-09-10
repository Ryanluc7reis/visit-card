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
import React from "react";

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
export default function Home() {
  const { theme } = useTheme();
  const { messageType, showPopUp, setShowPopUp, setMessageType } = usePopUp();
  const [aboutData, setAboutData] = useState(null);
  const [linksData, setlinksData] = useState([]);

  const DarkCondition = theme === "dark" ? true : false;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;

  const getCard = async () => {
    try {
      const response = await axios.get(`${API_URL}/card/ryan1`);
      const data = response.data;
      setAboutData(data.about[0]);
      setlinksData(data.links[0].links);
    } catch (error) {
      console.error("Erro ao obter os dados do cartão:", error);
    }
  };
  useEffect(() => {
    getCard();
    setTimeout(() => {
      setShowPopUp(false);
    }, 3500);
  }, []);

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

      <Navigations />
      <Container isDark={DarkCondition}>
        {aboutData !== null && (
          <>
            <About
              id={aboutData._id}
              name={aboutData.name}
              companyName={aboutData.companyName}
              location={aboutData.location}
              description={aboutData.description}
            />
          </>
        )}

        <StyledFlexTitle>
          <TitleSection isDark={DarkCondition}>Redes Sociais</TitleSection>
          <Line isDark={DarkCondition} />
        </StyledFlexTitle>
        {linksData.length > 0 &&
          linksData.map((link) => (
            <Link key={link._id} app={link.app} url={link.url} />
          ))}
      </Container>
    </>
  );
}
