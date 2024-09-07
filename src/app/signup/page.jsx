"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

import Navigations from "@/components/navigations/Navigations";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";

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
  border: 1px solid
    ${(props) =>
      props.isDark ? props.theme.borderDark : props.theme.borderLight};
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
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const DarkCondition = theme === "dark" ? true : false;
  const router = useRouter();
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    user: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      const isValidEmail = /\S+@\S+\.\S+/.test(value);
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: isValidEmail ? null : "Por favor digite um email válido.",
      }));
    }
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
        //setPopUpMessageSignup(true);
        router.push("/");
      }
    } catch (err) {
      if (err.response && err.response.data.duplicatedKey === "email") {
        setError({
          ...error,
          email: "Já existe uma conta com esse email.",
        });
      } else if (err.response && err.response.data.duplicatedKey === "user") {
        setError({
          ...error,
          user: "Já existe uma conta com esse usuário.",
        });
      } else {
        const newErrors = {};
        const requiredFields = ["fullName", "user", "email", "password"];
        requiredFields.forEach((field) => {
          if (!formData[field]) {
            newErrors[field] = "Esse campo é obrigatório.";
          }
        });
        setError(newErrors);
        console.error("Erro ao cadastrar usuário:", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigations />
      <Container isDark={DarkCondition}>
        <Form onSubmit={handleForm} isDark={DarkCondition}>
          <Title isDark={DarkCondition}>Cadastrar sua conta</Title>
          <InputAlt
            label="Primeiro nome"
            placeholder="Primeiro nome"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
            error={error.firstName}
          />
          {error.firstName && <ErrorMessage>{error.firstName}</ErrorMessage>}
          <InputAlt
            label="Último nome"
            placeholder="Último nome"
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
