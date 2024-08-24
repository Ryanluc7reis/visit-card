"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import Navigations from "@/components/navigations/Navigations";
import About from "@/components/about/About";
import Link from "@/components/links/Link";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 25px;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
`;

const Line = styled.div`
  width: 170px;
  height: 2px;
  background-color: ${(props) =>
    props.isDark ? props.theme.textDark : "#696565"};
`;
const StyledFlexTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
const TitleSection = styled.h3`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function Home() {
  const { theme } = useTheme();
  return (
    <>
      <Navigations />
      <Container isDark={theme === "dark" ? true : false}>
        <About />
        <StyledFlexTitle>
          <TitleSection isDark={theme === "dark" ? true : false}>
            Redes Sociais
          </TitleSection>
          <Line isDark={theme === "dark" ? true : false} />
        </StyledFlexTitle>
        <Link />
        <Link />
        <Link />
      </Container>
    </>
  );
}
