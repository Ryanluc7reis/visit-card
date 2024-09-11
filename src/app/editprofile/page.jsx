"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useSWRConfig } from "swr";
import { useState, useEffect } from "react";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import EditAbout from "@/components/about/EditAbout";
import EditLink from "@/components/links/EditLink";
import Image from "@/components/image/Image";
import PopUpMessage from "@/components/popupmessage/PopUpMessage";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";

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

const Title = styled.h3`
  font-weight: bold;
  margin: 7px 0;
  text-align: center;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function EditProfilePage() {
  const { theme } = useTheme();
  const { showPopUp, messageType, setShowPopUp, setMessageType } = usePopUp();
  const { mutate } = useSWRConfig();

  const [aboutData, setAboutData] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [linksData, setlinksData] = useState([]);
  const [linkId, setLinkId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [newLinks, setNewLinks] = useState([{ app: "-", url: "-" }]);
  const links = newLinks.map((link) => ({
    app: link.app,
    url: link.url,
  }));

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

  const handleSaveEditCard = () => {
    mutate(`${API_URL}/card/getAbout`);
    mutate(`${API_URL}/card/getLinks`);
  };
  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      const createLink = await axios.post(
        `${API_URL}/card/createLink`,
        { links },
        configAuth
      );

      if (createLink.status === 201) {
        handleSaveEditCard();
        setMessageType("created");
        setShowPopUp(true);
      }
    } catch (err) {
      if (
        err.response.data.message === "Token não fornecido" ||
        "Falha ao autenticar token"
      ) {
        setShowPopUp(true);
        setMessageType("notAuthenticated");
      }
      console.erro(err.message);
      setShowPopUp(true);
      setMessageType("error");
    }
  };

  const getAbout = async () => {
    try {
      const response = await axios.get(`${API_URL}/card/getAbout`, configAuth);
      const data = response.data;
      setAboutData(data.about[0]);
    } catch (error) {
      console.error("Erro ao obter os dados do cartão:", error);
    }
  };
  const getLinks = async () => {
    try {
      const response = await axios.get(`${API_URL}/card/getLinks`, configAuth);
      const data = response.data;

      setLinkId(data[0]._id);
      setlinksData(data[0].links);
    } catch (error) {
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
    verifyUser();
    getAbout();
    getLinks();
    setLoadingScreen(false);
    setTimeout(() => {
      setShowPopUp(false);
    }, 2500);
  }, [showPopUp]);

  if (loadingScreen) {
    return <LoadingScreen />;
  }

  return (
    <>
      {showPopUp && (
        <PopUpMessage
          error={messageType === "error" ? true : false}
          error2={messageType === "notAuthenticated" ? true : false}
        >
          {messageType === "created" && "Link criado com sucesso"}
          {messageType === "notAuthenticated" && "Usuário não autenticado"}
          {messageType === "deleted" && "Link deletado com sucesso"}
          {messageType === "edited" && "Perfil editado com sucesso"}
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>{fullName && `Editando perfil / ${fullName} `}</title>
      <Navigations />
      <Container isDark={DarkCondition}>
        <Title isDark={DarkCondition}> Detalhes de sobre </Title>
        {aboutData && (
          <>
            <EditAbout
              id={aboutData._id}
              name={aboutData.name}
              companyName={aboutData.companyName}
              location={aboutData.location}
              description={aboutData.description}
              onSave={handleSaveEditCard}
            />
          </>
        )}

        <Title isDark={DarkCondition}> Detalhes de links</Title>
        {linksData.length > 0 &&
          linksData.map((link) => (
            <EditLink
              key={link._id}
              linkId={link._id}
              id={linkId}
              app={link.app}
              url={link.url}
              onSave={handleSaveEditCard}
            />
          ))}
        <Image
          isDark={DarkCondition}
          imageDark="plusDark.png"
          image="plusLight.png"
          alt=""
          onClick={handleCreateLink}
        />
      </Container>
    </>
  );
}
