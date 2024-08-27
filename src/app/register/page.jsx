"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { useRouter } from "next/navigation";

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
  min-height: 385px;
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
  margin: 7px 0;
  text-align: center;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const HaveAccount = styled.h4`
  font-weight: 400;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;

export default function RegisterPage() {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  const router = useRouter();
  return (
    <>
      <Navigations />
      <Container isDark={DarkCondition}>
        <Form isDark={DarkCondition}>
          <Title isDark={DarkCondition}>Cadastrar sua conta</Title>
          <InputAlt label="Nome" placeholder="Nome" />
          <InputAlt label="E-mail" placeholder="E-mail" />
          <InputAlt label="Senha" placeholder="Senha" />
          <div
            style={{ width: "100%", textAlign: "center", marginTop: " 15px" }}
          >
            <Button>Vamos lá</Button>
          </div>
          <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
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
