"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import PopUpMessage from "@/components/popupmessage/PopUpMessage";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
`;
const Form = styled.form`
  width: 90%;
  min-height: 350px;
  margin-top: 70px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  background: ${(props) =>
    props.isDark
      ? props.theme.backgroundContentDark
      : props.theme.backgroundContentLight};
  @media (min-width: 425px) {
    width: 350px;
  }
`;
const InputAlt = styled(Input)`
  width: 250px;
  border-radius: 8px;
  border: 2px solid
    ${(props) => {
      const isEmptyObject = (obj) => Object.keys(obj).length === 0;

      if (props.error && !isEmptyObject(props.error)) {
        return props.theme.error;
      }

      return props.isDark ? props.theme.borderDark : props.theme.borderLight;
    }};
`;
const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const HaveAccount = styled.h4`
  font-weight: 400;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const ErrorMessage = styled.span`
  color: ${(props) => props.theme.error};
  font-weight: bold;
  font-size: 13px;
`;
export default function LoginPage() {
  const { theme } = useTheme();
  const { messageType, showPopUp, setShowPopUp, setMessageType } = usePopUp();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    userOrEmail: "",
    password: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const DarkCondition = theme === "dark" ? true : false;

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${API_URL}/user/login`, formData);
      const { token } = response.data;
      localStorage.setItem("token", token);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (err) {
      if (err.response && err.response.data === "password incorrect") {
        setError({ ...error, password: "Senha incorreta" });
      } else if (err.response && err.response.data === "not found") {
        setError({ ...error, userOrEmail: "Usuário ou e-mail não encontrado" });
      } else {
        console.error("Erro ao fazer autenticação do usuário:", err.message);
        setShowPopUp(true);
        setMessageType("error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name) {
      const isValidValue = [!value];
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: isValidValue === true && null,
      }));
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
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
      {showPopUp && messageType && (
        <PopUpMessage error={messageType === "error" ? true : false}>
          {messageType === "createdUser" && "Conta criada com sucesso"}
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>Entrar</title>
      <Navigations />
      <Container isDark={DarkCondition}>
        <Form onSubmit={handleForm} isDark={DarkCondition}>
          <Title isDark={DarkCondition}>Entrar na sua conta</Title>
          <InputAlt
            label="Usuário ou e-mail"
            placeholder="Usuário ou e-mail"
            name="userOrEmail"
            onChange={handleChange}
            value={formData.userOrEmail}
            error={error.userOrEmail}
          />
          {error.userOrEmail && (
            <ErrorMessage>{error.userOrEmail}</ErrorMessage>
          )}
          <InputAlt
            label="Senha"
            placeholder="Senha"
            type="password"
            name="password"
            onChange={handleChange}
            value={formData.password}
            error={error.password}
          />
          {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
          <div
            style={{ width: "100%", textAlign: "center", marginTop: " 15px" }}
          >
            <Button type="submit" loading={loading}>
              Entrar
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <HaveAccount isDark={DarkCondition}>Não possui conta ?</HaveAccount>
            <h4
              onClick={() => router.push("/signup")}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Fazer cadastro
            </h4>
          </div>
        </Form>
      </Container>
    </>
  );
}
