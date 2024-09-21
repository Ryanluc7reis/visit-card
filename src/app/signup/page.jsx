"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

import Navigations from "@/components/navigations/Navigations";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";
import PopUpMessage from "@/components/popupmessage/PopUpMessage";

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
  min-height: 540px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

      return props.isDark ? props.theme.borderDark : props.theme.borderDark;
    }};
`;
const Title = styled.h3`
  font-weight: bold;
  margin-bottom: 20px;
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
export default function SignupPage() {
  const { theme } = useTheme();
  const { setShowPopUp, setMessageType, showPopUp, messageType } = usePopUp();
  const router = useRouter();

  const [error, setError] = useState({});
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    user: "",
    email: "",
    password: "",
  });

  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const DarkCondition = theme === "dark" ? true : false;
  const fullName = userData && userData.fullName;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const AUTH_NAME = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;
  const configAuth = {
    headers: {
      [AUTH_NAME]: token,
    },
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

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { status } = await axios.post(`${API_URL}/user/signup`, formData);
      if (status === 201) {
        setShowPopUp(true);
        setMessageType("createdUser");
        router.push("/login");
      }
    } catch (err) {
      if (
        err.response.data.errors &&
        err.response.data.errors[0].type === "string.empty"
      ) {
        const field = err.response.data.errors[0].field;
        setError({
          ...error,
          [field]: "Este campo é obrigatório",
        });
      } else if (err.response && err.response.data.duplicatedKey === "email") {
        setError({
          ...error,
          email: "Já existe uma conta com esse email.",
        });
      } else if (err.response && err.response.data.duplicatedKey === "user") {
        setError({
          ...error,
          user: "Já existe uma conta com esse usuário.",
        });
      } else if (err.response.data.errors) {
        const field = err.response.data.errors[0].field;
        setError({
          ...error,
          [field]: err.response.data.errors[0].message,
        });
      }
      setShowPopUp(true);
      setMessageType("error");
    } finally {
      setLoading(false);
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

  return (
    <>
      {showPopUp && messageType && (
        <PopUpMessage error={messageType === "error" ? true : false}>
          {messageType === "createdUser" && "Conta criada com sucesso"}
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>Novo cadastro</title>
      <Navigations hasUser={fullName} />
      <Container isDark={DarkCondition}>
        <Form onSubmit={handleForm} isDark={DarkCondition}>
          <Title isDark={DarkCondition}>Cadastrar sua conta</Title>
          <InputAlt
            label="Nome"
            placeholder="Nome"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            error={error.firstName}
          />
          {error.firstName && <ErrorMessage>{error.firstName}</ErrorMessage>}
          <InputAlt
            label="Sobrenome"
            placeholder="Sobrenome"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
            error={error.lastName}
          />
          {error.lastName && <ErrorMessage>{error.lastName}</ErrorMessage>}
          <InputAlt
            label="Usuário"
            placeholder="Usuário"
            name="user"
            onChange={handleChange}
            value={formData.user}
            error={error.user}
          />
          {error.user && <ErrorMessage>{error.user}</ErrorMessage>}
          <InputAlt
            label="E-mail"
            placeholder="E-mail"
            name="email"
            onChange={handleChange}
            value={formData.email}
            error={error.email}
          />
          {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
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
              Vamos lá
            </Button>
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
              alignItems: "center",
              marginTop: "7px",
            }}
          >
            <HaveAccount isDark={DarkCondition}>Já possui conta ?</HaveAccount>
            <h4
              onClick={() => router.push("/login")}
              style={{ textDecoration: "underline", cursor: "pointer" }}
            >
              Entrar
            </h4>
          </div>
        </Form>
      </Container>
    </>
  );
}
