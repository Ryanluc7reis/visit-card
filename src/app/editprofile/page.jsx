"use client";

import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import Navigations from "@/components/navigations/Navigations";
import EditAbout from "@/components/about/EditAbout";
import EditLink from "@/components/links/EditLink";

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

export default function EditProfilePage() {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <>
      <Navigations />
      <Container isDark={DarkCondition}>
        <EditAbout />;
        <EditLink />
      </Container>
    </>
  );
}
