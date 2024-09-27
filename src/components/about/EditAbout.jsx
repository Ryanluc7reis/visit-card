import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useState } from "react";
import axios from "axios";

import { Input } from "../form/Input";
import { Button } from "../form/Button";
import Image from "../image/Image";

const Form = styled.form`
  width: 90%;
  min-height: 180px;
  padding: 15px;
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
const ButtonEditImage = styled.h5`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  padding: 5px;
  border-radius: 4px;
  text-decoration: underline;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
  :active {
    color: black;
  }
`;

export default function EditAbout({
  id,
  name,
  companyName,
  location,
  description,
  onSave,
  imageName,
}) {
  const { theme } = useTheme();
  const { setShowPopUp, setMessageType, messageType } = usePopUp();
  const [loading, setLoading] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    companyName: companyName,
    location: location,
    description: description,
    image: null,
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleFormSaveEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("id", formData.id);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("companyName", formData.companyName);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }
    try {
      const { status } = await axios.patch(
        `${API_URL}/card/editAbout`,
        formDataToSend,
        {
          ...configAuth,
          headers: {
            ...configAuth.headers,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (status === 200) {
        onSave();
        setShowPopUp(true);
        setMessageType("edited");
        setEditImage(false);
      }
    } catch (err) {
      if (err.response.data.message === "Falha ao autenticar o token") {
        setShowPopUp(true);
        setMessageType("notAuthenticated");
      } else if (err.response.data.message === "Nenhuma imagem foi enviada") {
        setShowPopUp(true);
        setMessageType("notFoundImage");
      } else if (err.response.data.message === "Já existe essa imagem") {
        setShowPopUp(true);
        setMessageType("alreadyHasImage");
      } else {
        setShowPopUp(true);
        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleFormSaveEdit} isDark={DarkCondition}>
      <InputAlt
        isDark={DarkCondition}
        label="Nome completo"
        name="name"
        onChange={handleChange}
        value={formData.name}
      />
      <InputAlt
        isDark={DarkCondition}
        label="Nome ou @ da empresa"
        name="companyName"
        onChange={handleChange}
        value={formData.companyName}
      />
      <InputAlt
        isDark={DarkCondition}
        label="Descrição"
        name="description"
        onChange={handleChange}
        value={formData.description}
      />
      <InputAlt
        isDark={DarkCondition}
        label="Localização"
        name="location"
        onChange={handleChange}
        value={formData.location}
      />

      <InputAlt
        isDark={DarkCondition}
        label="Imagem de perfil"
        value={imageName}
      />
      <ButtonEditImage
        isDark={DarkCondition}
        onClick={() => setEditImage(true)}
      >
        Alterar imagem
      </ButtonEditImage>

      {editImage && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <InputAlt
            isDark={DarkCondition}
            type="file"
            name="image"
            onChange={handleFileChange}
          />
          <Image
            isDark={DarkCondition}
            imageDark="xDark.png"
            image="xLight.png"
            alt=""
            onClick={() => setEditImage(false)}
          />
        </div>
      )}
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button type="submit" loading={loading}>
          Salvar alterações
        </Button>
      </div>
    </Form>
  );
}
