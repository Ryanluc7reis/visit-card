"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ContextTheme";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";

export default function HomePage() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);

  const DarkCondition = theme === "dark" ? true : false;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const AUTH_NAME = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const URL = process.env.NEXT_PUBLIC_URL;
  const configAuth = {
    headers: {
      [AUTH_NAME]: token,
    },
  };
  const fullName = userData && userData.fullName;

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
  }, []);

  if (loadingScreen) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Navigations hasUser={fullName} />
      <h1>Perfil do Usuário:</h1>
    </>
  );
}
