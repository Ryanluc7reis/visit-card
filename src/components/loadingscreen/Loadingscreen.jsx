import React from "react";
import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backroundLight};
`;

export default function LoadingScreen({ ...props }) {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;

  return <Screen isDark={DarkCondition} {...props} />;
}
