"use client";

import styled from "styled-components";

import Navigations from "@/components/navigations/Navigations";
import About from "@/components/about/About";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0px;
  gap: 25px;
`;
const Title = styled.h2``;
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
      </Container>
    </>
  );
}
