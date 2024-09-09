"use client";

import styled from "styled-components";
import { useState } from "react";
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
  min-height: 200px;
  padding: 18px;
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
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.isDark ? props.theme.textDark : "#696565")};
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;

const TitleSection = styled.h2`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const LinkItem = styled.div`
  display: flex;
  align-items: end;
  margin-bottom: 10px;
  @media (min-width: 428px) {
    align-items: center;
    justify-content: space-between;
  }
`;

export default function CreateProfilePage() {
  const { theme } = useTheme();
  const { showPopUp, setShowPopUp, setMessageType, messageType } = usePopUp();
  const router = useRouter();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [linksArray, setLinksArray] = useState([{ id: 1, app: "", url: "" }]);
  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    description: "",
  });

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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const createLink = await axios.post(
        `${API_URL}/card/createLink`,
        { links },
        configAuth
      );

      const createAbout = await axios.post(
        `${API_URL}/card/createAbout`,
        formData,
        configAuth
      );

      if (createLink.status && createAbout.status === 201) {
        router.push("/");
        setShowPopUp(true);
        setMessageType("createdProfile");
      }
    } catch (err) {
      setShowPopUp(true);
      setMessageType("error");
      throw err.message;
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAbout();
    getLinks();
    setTimeout(() => {
      setShowPopUp(false);
    }, 2500);
  }, [showPopUp]);

  return (
    <>
      {showPopUp && (
        <PopUpMessage error={messageType === "error" ? true : false}>
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>Crie seu perfil</title>
      <Navigations />
      <Form onSubmit={handleForm} isDark={DarkCondition}>
        <TitleSection isDark={DarkCondition}>Crie seu sobre</TitleSection>
        <BoxContainer isDark={DarkCondition}>
          <InputAlt
            label="Nome ou @ da empresa"
            placeholder="Nome ou @ da empresa"
            isDark={DarkCondition}
            name="companyName"
            onChange={handleChange}
            value={formData.companyName}
          />
          <InputAlt
            label="Localização"
            placeholder="Cidade, estado, país.."
            isDark={DarkCondition}
            name="location"
            onChange={handleChange}
            value={formData.location}
          />
          <InputAlt
            label="Descrição"
            placeholder="Descrição sobre a empresa"
            isDark={DarkCondition}
            name="description"
            onChange={handleChange}
            value={formData.description}
          />
        </BoxContainer>
        <TitleSection isDark={DarkCondition}>Crie seus links</TitleSection>
        <BoxContainer isDark={DarkCondition}>
          {linksArray.map((link) => (
            <LinkItem key={link.id}>
              <Selecter
                label="Selecione seu aplicativo"
                isDark={DarkCondition}
                name="app"
                onChange={(e) =>
                  handleInputChange(link.id, "app", e.target.value)
                }
                value={link.app}
              />
              <div style={{ display: "flex", alignItems: "end" }}>
                <InputAlt
                  label="Seu link"
                  placeholder="Cole sua URL aqui"
                  isDark={DarkCondition}
                  name="url"
                  value={link.url}
                  onChange={(e) =>
                    handleInputChange(link.id, "url", e.target.value)
                  }
                />
                <Image
                  isDark={DarkCondition}
                  imageDark="xDark.png"
                  image="xLight.png"
                  alt=""
                  onClick={() => handleRemoveLink(link.id)}
                />
              </div>
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
