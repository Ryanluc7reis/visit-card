"use client";

import styled from "styled-components";

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
  background: #000000f0;
`;
const Title = styled.h2`
  color: #e2e3e3;
`;
const Line = styled.div`
  width: 170px;
  height: 2px;
  background-color: purple;
`;
const StyledFlexTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
export default function Home() {
  return (
    <>
      <Navigations />
      <Container>
        <About />
        <StyledFlexTitle>
          <Title>Redes Sociais</Title>
          <Line />
        </StyledFlexTitle>
        <Link />
        <Link />
        <Link />
      </Container>
    </>
  );
}
