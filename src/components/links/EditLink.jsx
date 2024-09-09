import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useState } from "react";
import axios from "axios";

import { Input } from "../form/Input";
import { Button } from "../form/Button";
import { Selecter } from "../form/Selecter";
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
`;

const LinkItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  margin-bottom: 10px;
  @media (min-width: 428px) {
    align-items: center;
    justify-content: space-between;
  }
`;

export default function EditLink({ id, linkId, app, url, onSave }) {
  const { theme } = useTheme();
  const { setShowPopUp, setMessageType } = usePopUp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    linkId: linkId,
    url: url,
    app: app,
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
  const configAuthToDelete = {
    headers: {
      [AUTH_NAME]: token,
    },
    data: {
      id: id,
      linkId: linkId,
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
        `${API_URL}/card/editLink`,
        formData,
        configAuth
      );
      if (status === 200) {
        onSave();
        setShowPopUp(true);
        setMessageType("edited");
      }
    } catch (err) {
      console.error(err.message);

      setShowPopUp(true);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteLink = async (e) => {
    e.preventDefault();

    try {
      const { status } = await axios.delete(
        `${API_URL}/card/deleteLink`,
        configAuthToDelete
      );
      if (status === 200) {
        onSave();
        setShowPopUp(true);
        setMessageType("deleted");
      }
    } catch (err) {
      console.error(err.message);

      setShowPopUp(true);
      setMessageType("error");
    }
  };

  return (
    <Form onSubmit={handleFormSaveEdit} isDark={DarkCondition}>
      <LinkItem>
        <Selecter
          label="Aplicativo"
          isDark={DarkCondition}
          name="app"
          value={formData.app}
          onChange={handleChange}
        />
        <div style={{ display: "flex", alignItems: "end" }}>
          <InputAlt
            label="Link"
            isDark={DarkCondition}
            name="url"
            value={formData.url}
            onChange={handleChange}
          />

          <Image
            isDark={DarkCondition}
            imageDark="xDark.png"
            image="xLight.png"
            alt=""
            onClick={handleDeleteLink}
          />
        </div>
      </LinkItem>

      <div style={{ width: "100%", textAlign: "center" }}>
        <Button type="submit" loading={loading}>
          Salvar alterações
        </Button>
      </div>
    </Form>
  );
}
