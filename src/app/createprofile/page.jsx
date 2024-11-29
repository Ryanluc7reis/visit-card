"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useRouter } from "next/navigation";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import { Input } from "@/components/form/Input";
import { Selecter } from "@/components/form/Selecter";
import { Button } from "@/components/form/Button";
import Image from "@/components/image/Image";
import PopUpMessage from "@/components/popupmessage/PopUpMessage";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";

const Form = styled.form`
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
const BoxContainer = styled.div`
  width: 90%;
  min-height: 180px;
  padding: 20px;
  background: ${(props) =>
    props.isDark
      ? props.theme.backgroundContentDark
      : props.theme.backgroundContentLight};
  border: 1px solid
    ${(props) =>
      props.isDark ? props.theme.borderDark : props.theme.borderLight};
  border-radius: 6px;
  @media (min-width: 768px) {
    width: 600px;
  }
`;
const InputAlt = styled(Input)`
  background: transparent;
  width: 100%;
  border: none;
  border-bottom: 2px solid
    ${(props) => {
      const isEmptyObject = (obj) => Object.keys(obj).length === 0;

      if (props.error && !isEmptyObject(props.error)) {
        return props.theme.error;
      }

      return props.isDark ? props.theme.textDark : props.theme.textDark;
    }};
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const InputLink = styled(InputAlt)`
  @media (min-width: 425px) {
    width: 200px;
  }
  @media (min-width: 570px) {
    width: 347px;
  }
  @media (min-width: 768px) {
    width: 367px;
  }
`;

const TitleSection = styled.h2`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const LinkItem = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 10px;
  gap: 15px;
  @media (min-width: 425px) {
    gap: 25px;
  }

  @media (min-width: 768px) {
    gap: 78px;
  }
`;
const ErrorMessage = styled.span`
  color: ${(props) => props.theme.error};
  font-weight: bold;
  font-size: 13px;
`;
const StyledFlexErroMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 15px;
`;
export default function CreateProfilePage() {
  const { theme } = useTheme();
  const { showPopUp, setShowPopUp, setMessageType, messageType } = usePopUp();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [error, setError] = useState({});
  const [linksArray, setLinksArray] = useState([{ id: 1, app: "", url: "" }]);
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    description: "",
    image: null,
  });

  const DarkCondition = theme === "dark" ? true : false;
  const fullName = userData && userData.fullName;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const AUTH_NAME = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const URL = process.env.NEXT_PUBLIC_URL;
  const configAuth = {
    headers: {
      [AUTH_NAME]: token,
    },
  };
  const links = linksArray.map((link) => ({
    app: link.app,
    url: link.url,
  }));

  const handleAddLink = () => {
    setLinksArray([
      ...linksArray,
      { id: linksArray.length + 1, app: "", url: "" },
    ]);
  };

  const handleRemoveLink = (id) => {
    setLinksArray(linksArray.filter((link) => link.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setLinksArray(
      linksArray.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    let adjustedValue = value;
    if (name === "location") {
      adjustedValue = value.replace(/,(\S)/g, ", $1");
    }

    if (name) {
      const isValidValue = [!adjustedValue];
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: isValidValue === true && null,
      }));
    }

    setFormData({
      ...formData,
      [name]: adjustedValue,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    } else {
      console.log("Imagem não encontrada!");
    }
    try {
      const createAbout = await axios.post(
        `${API_URL}/card/createAbout`,
        formDataToSend,
        configAuth
      );
      if (createAbout.status === 201) {
        const createLink = await axios.post(
          `${API_URL}/card/createLink`,
          { links },
          configAuth
        );
        if (createLink.status === 201) {
          router.push(`${URL}/${userData.user}`);
          setShowPopUp(true);
          setMessageType("createdProfile");
        }
      }
    } catch (err) {
      if (
        err.response.data.message === "Token não fornecido" ||
        err.response.data.message === "Falha ao autenticar token"
      ) {
        setShowPopUp(true);
        setMessageType("notAuthenticated");
      }
      if (err.response.data.errors && err.response.data.errors[0].message) {
        const fieldErrors = err.response.data.errors.reduce(
          (acc, currentError) => {
            const field = currentError.field;
            const message = currentError.message;

            if (field.startsWith("links.")) {
              const [_, index, key] = field.split(".");
              if (!acc.links) acc.links = [];
              acc.links[parseInt(index)] = {
                ...(acc.links[parseInt(index)] || {}),
                [key]: message,
              };
            } else {
              acc[field] = message;
            }

            return acc;
          },
          {}
        );

        setError(fieldErrors);
      }
      setShowPopUp(true);
      setMessageType("error");

      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  const getAbout = async () => {
    try {
      const response = await axios.get(`${API_URL}/card/getAbout`, configAuth);
      const data = response.data;
      if (data) {
        router.push(`${URL}/${userData.user}`);
        setTimeout(() => {
          setMessageType("hasProfile");
          setShowPopUp(true);
        }, 1500);
      }
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
    setLoadingScreen(false);
    setTimeout(() => {
      setShowPopUp(false);
    }, 2500);
  }, [showPopUp]);

  if (loadingScreen) {
    return <LoadingScreen />;
  }
  if (userData && userData) {
    getAbout();
  }
  return (
    <>
      {showPopUp && (
        <PopUpMessage
          error={messageType === "error" ? true : false}
          error2={messageType === "notAuthenticated" ? true : false}
        >
          {messageType === "notAuthenticated" && "Usuário não autenticado"}
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>Novo perfil</title>
      <Navigations hasUser={fullName} />
      <Form onSubmit={handleForm} isDark={DarkCondition}>
        <TitleSection isDark={DarkCondition}>Crie seu sobre</TitleSection>
        <BoxContainer isDark={DarkCondition}>
          <InputAlt
            label="Nome ou @ da empresa"
            placeholder="Hello visit"
            isDark={DarkCondition}
            name="companyName"
            onChange={handleChange}
            value={formData.companyName}
            required
          />
          <InputAlt
            label="Localização"
            placeholder="Uberlândia-MG, Brasil"
            isDark={DarkCondition}
            name="location"
            onChange={handleChange}
            value={formData.location}
            error={error.location}
            required
          />
          {error.location && <ErrorMessage>{error.location}</ErrorMessage>}
          <InputAlt
            label="Descrição"
            placeholder="Hello visit é uma empresa..."
            isDark={DarkCondition}
            name="description"
            onChange={handleChange}
            value={formData.description}
            required
          />
          <InputAlt
            isDark={DarkCondition}
            label="Imagem de sobre"
            type="file"
            name="image"
            onChange={handleFileChange}
            required
          />
        </BoxContainer>
        <TitleSection isDark={DarkCondition}>Crie seus links</TitleSection>
        <BoxContainer isDark={DarkCondition}>
          {linksArray.map((link, index) => (
            <LinkItem key={link.id}>
              <Selecter
                label="Selecione seu aplicativo"
                isDark={DarkCondition}
                name="app"
                onChange={(e) =>
                  handleInputChange(link.id, "app", e.target.value)
                }
                value={link.app}
                required
              />
              <StyledFlexErroMessage>
                <div
                  style={{ display: "flex", alignItems: "end", width: "100%" }}
                >
                  <InputLink
                    label={link.app === "Pix" ? "Chave Pix " : "Link"}
                    placeholder={
                      link.app === "Pix"
                        ? "Cole sua chave PIX aqui"
                        : "Cole sua URL aqui"
                    }
                    isDark={DarkCondition}
                    name="url"
                    value={link.url}
                    onChange={(e) =>
                      handleInputChange(link.id, "url", e.target.value)
                    }
                    required
                  />
                  <Image
                    isDark={DarkCondition}
                    imageDark="xDark.png"
                    image="xLight.png"
                    alt=""
                    onClick={handleRemoveLink}
                  />
                </div>
                {error?.links &&
                  error.links[index] &&
                  error.links[index].url && (
                    <ErrorMessage>{error.links[index].url}</ErrorMessage>
                  )}
              </StyledFlexErroMessage>
            </LinkItem>
          ))}

          <Image
            isDark={DarkCondition}
            imageDark="plusDark.png"
            image="plusLight.png"
            alt=""
            onClick={handleAddLink}
          />
        </BoxContainer>
        <Button type="submit" loading={loading}>
          Create profile
        </Button>
      </Form>
    </>
  );
}
