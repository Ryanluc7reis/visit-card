import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { useState } from "react";
import axios from "axios";

import { Input } from "../form/Input";
import { Button } from "../form/Button";

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

export default function EditAbout({
  id,
  name,
  companyName,
  location,
  description,
  onSave,
}) {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    name: name,
    companyName: companyName,
    location: location,
    description: description,
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

  const handleFormSaveEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { status } = await axios.patch(
        `${API_URL}/card/editAbout`,
        formData,
        configAuth
      );
      if (status === 200) {
        onSave();
        alert("Conteúdo editado com sucesso");
        setPopUpMessage(true);
      }
    } catch (err) {
      console.error(err.message);
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
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button type="submit" loading={loading}>
          Salvar alterações
        </Button>
      </div>
    </Form>
  );
}
