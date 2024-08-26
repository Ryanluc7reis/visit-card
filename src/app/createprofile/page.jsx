"use client";

import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "@/context/ContextTheme";

import Navigations from "@/components/navigations/Navigations";
import { Input } from "@/components/form/Input";
import { Selecter } from "@/components/form/Selecter";
import { Button } from "@/components/form/Button";
import Image from "@/components/image/Image";

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
  padding: 12px;
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

export default function CreateProfile() {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;

  const [links, setLinks] = useState([{ id: 1, app: "", url: "" }]);

  const handleAddLink = () => {
    setLinks([...links, { id: links.length + 1, app: "", url: "" }]);
  };

  const handleRemoveLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };
  return (
    <>
      <title>Crie seu perfil</title>
      <Navigations />
      <Form isDark={DarkCondition}>
        <TitleSection isDark={DarkCondition}>Crie seu sobre</TitleSection>
        <BoxContainer isDark={DarkCondition}>
          <InputAlt
            label="Nome"
            placeholder="Seu nome"
            isDark={DarkCondition}
          />
          <InputAlt
            label="Nome ou @ da empresa"
            placeholder="Nome ou @ da empresa"
            isDark={DarkCondition}
          />
          <InputAlt
            label="Descrição"
            placeholder="Descrição sobre a empresa"
            isDark={DarkCondition}
          />
        </BoxContainer>
        <TitleSection isDark={DarkCondition}>Crie seus links</TitleSection>
        <BoxContainer isDark={DarkCondition}>
          {links.map((link) => (
            <LinkItem key={link.id}>
              <Selecter
                label="Selecione seu aplicativo"
                isDark={DarkCondition}
                value={link.app}
                onChange={(e) =>
                  handleInputChange(link.id, "app", e.target.value)
                }
              />
              <div style={{ display: "flex", alignItems: "end" }}>
                <InputAlt
                  label="Seu Link"
                  placeholder="Cole sua URL aqui"
                  isDark={DarkCondition}
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
        <Button>Create profile</Button>
      </Form>
    </>
  );
}
