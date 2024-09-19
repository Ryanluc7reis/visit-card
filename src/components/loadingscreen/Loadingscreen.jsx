import React from "react";
import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import Image from "../image/Image";

const Screen = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backroundLight};
`;
const ScreenLoading = styled.div`
  width: 100%;
  min-height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function LoadingScreen({ loadingContent, ...props }) {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;

  return (
    <>
      {loadingContent && (
        <ScreenLoading {...props}>
          <Image image="loader.svg" alt="" />
        </ScreenLoading>
      )}
      {!loadingContent && <Screen isDark={DarkCondition} {...props} />}
    </>
  );
}
