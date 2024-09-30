"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useSWRConfig } from "swr";
import { useState, useEffect } from "react";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import Image from "@/components/image/Image";
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
const Title = styled.h3`
  font-weight: bold;
  margin: 7px 0;
  text-align: center;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const ErrorMessage = styled.span`
  color: ${(props) => props.theme.error};
  font-weight: bold;
  font-size: 13px;
`;
const StyledFlexErrorMessage = styled.div`
  display: flex;
  gap: 7px;
`;
const ButtonEditPassword = styled.h5`
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
export default function EditProfilePage() {
  const { theme } = useTheme();
  const { showPopUp, messageType, setShowPopUp, setMessageType } = usePopUp();
  const { mutate } = useSWRConfig();

  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [error, setError] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userDataToEdit, setUserDataToEdit] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [formData, setFormData] = useState({
    id: "",
    email: "",
    number: "",
    password: "",
  });

  const DarkCondition = theme === "dark" ? true : false;
  const fullName = userData && userData.fullName;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const AUTH_NAME = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const configAuth = {
    headers: {
      [AUTH_NAME]: token,
    },
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!editPassword) {
      try {
        const editUserResponse = await axios.patch(
          `${API_URL}/user/editUser`,
          formData,
          configAuth
        );

        if (editUserResponse.status === 200) {
          mutate(`${API_URL}/user/getUser`);
          setShowPopUp(true);
          setMessageType("edited");
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
        } else if (err.response.data && err.response.data.errors) {
          const field = err.response.data.errors[0].field;
          setError({
            ...error,
            [field]: err.response.data.errors[0].message,
          });
        } else {
          setShowPopUp(true);
          setMessageType("error");
          console.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const verifyPasswordResponse = await axios.post(
          `${API_URL}/user/verify-password`,
          { password: currentPassword },
          configAuth
        );

        if (verifyPasswordResponse.status === 200) {
          const editUserResponse = await axios.patch(
            `${API_URL}/user/editUser`,
            formData,
            configAuth
          );

          if (editUserResponse.status === 200) {
            mutate(`${API_URL}/user/getUser`);
            setShowPopUp(true);
            setMessageType("edited");
            setEditPassword(false);
          }
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
        } else if (err.response && err.response.data === "password incorrect") {
          setError({
            ...error,
            currentPassword: "Senha atual incorreta",
          });
        } else if (err.response?.data.errors && err.response?.data.errors) {
          const field = err.response.data.errors[0].field;
          setError({
            ...error,
            [field]: err.response.data.errors[0].message,
          });
        } else {
          setShowPopUp(true);
          setMessageType("error");
          console.error(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
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

  const getUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/getUser`, configAuth);

      const data = response.data.user;
      setUserDataToEdit(data);

      setFormData({
        id: data._id,
        email: data.email,
        number: data.number,
        password: data.password,
      });
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleEditPassword = () => {
    setEditPassword(!editPassword);
    if (editPassword) {
      setFormData({
        id: userDataToEdit._id,
        email: formData.email,
        number: formData.number,
        password: userDataToEdit.password,
      });
    } else {
      setFormData({
        id: userDataToEdit._id,
        email: formData.email,
        number: formData.number,
        password: "",
      });
    }
  };

  useEffect(() => {
    verifyUser();
    getUser();
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
      {showPopUp && (
        <PopUpMessage
          error={
            messageType === "error" || messageType === "notAuthenticated"
              ? true
              : false
          }
        >
          {messageType === "notAuthenticated" && "Usuário não autenticado"}
          {messageType === "edited" && "Perfil editado com sucesso"}
          {messageType === "error" && "Algo deu errado"}
        </PopUpMessage>
      )}
      <title>{fullName && `Editando perfil / ${fullName} `}</title>
      <Navigations hasUser={fullName} />
      <Container isDark={DarkCondition}>
        <Title isDark={DarkCondition}> Detalhes de conta </Title>
        {userDataToEdit === null ? (
          <>
            {error ? (
              <StyledFlexErrorMessage>
                <ErrorMessage isDark={DarkCondition}>
                  Erro ao obter dados
                </ErrorMessage>
                <Image
                  isDark={DarkCondition}
                  imageDark="badEmoji-dark.png"
                  image="badEmoji-white.png"
                  alt=""
                />
              </StyledFlexErrorMessage>
            ) : (
              <LoadingScreen loadingContent />
            )}
          </>
        ) : (
          <Form onSubmit={handleForm} isDark={DarkCondition}>
            <InputAlt
              isDark={DarkCondition}
              label="Endereço de e-mail"
              name="email"
              onChange={handleChange}
              value={formData.email}
            />
            {error.email && <ErrorMessage>{error.email}</ErrorMessage>}
            <InputAlt
              isDark={DarkCondition}
              label="Número de telefone"
              name="number"
              onChange={handleChange}
              value={formData.number}
              error={error.number}
            />
            {error.number && <ErrorMessage>{error.number}</ErrorMessage>}
            <ButtonEditPassword
              isDark={DarkCondition}
              onClick={handleEditPassword}
            >
              Alterar senha
            </ButtonEditPassword>

            {editPassword && (
              <>
                <InputAlt
                  isDark={DarkCondition}
                  label="Senha atual"
                  placeholder="Senha atual"
                  value={currentPassword}
                  error={error.currentPassword}
                  onChange={handleChangeCurrentPassword}
                />
                {error.currentPassword && (
                  <ErrorMessage>{error.currentPassword}</ErrorMessage>
                )}
                <div style={{ display: "flex", alignItems: "center" }}>
                  <InputAlt
                    isDark={DarkCondition}
                    label="Senha Nova"
                    placeholder="Senha nova"
                    name="password"
                    value={formData.password}
                    error={error.password}
                    onChange={handleChange}
                  />

                  <Image
                    style={{ marginTop: "36px" }}
                    isDark={DarkCondition}
                    imageDark="xDark.png"
                    image="xLight.png"
                    alt=""
                    onClick={handleEditPassword}
                  />
                </div>
                {error.password && (
                  <ErrorMessage>{error.password}</ErrorMessage>
                )}
              </>
            )}

            <div style={{ width: "100%", textAlign: "center" }}>
              <Button type="submit" loading={loading}>
                Salvar alterações
              </Button>
            </div>
          </Form>
        )}
      </Container>
    </>
  );
}
