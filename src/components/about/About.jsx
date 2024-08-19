import styled from "styled-components";

import Image from "../image/Image";

const AboutContainer = styled.div`
  width: 90%;
  min-height: 180px;
  background-color: red;
  padding: 10px;
  background: #1b1f23;
  @media (min-width: 768px) {
    width: 600px;
  }
`;
const ImageAlt = styled(Image)`
  width: 30px;
  height: 30px;
`;
const ImageLabel = styled(Image)`
  width: 90px;
  height: 80px;
  background: purple;
  border-radius: 44px;
  position: absolute;
  left: 37%;

  @media (min-width: 375px) {
    left: 39%;
  }
  @media (min-width: 425px) {
    left: 41%;
  }
  @media (min-width: 768px) {
    left: 45%;
  }
  @media (min-width: 1024px) {
    left: 46%;
  }
  @media (min-width: 1440px) {
    left: 47%;
  }
`;
const StyledFlexImages = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const StyledFlexDescription = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 30px;
`;
const NameAndLabel = styled.h4`
  font-weight: bold;
  color: #e2e3e3;
`;
const Localization = styled.h4`
  font-weight: 400;
  color: #e2e3e3;
`;
const Description = styled.h4`
  font-weight: 500;
  color: #e2e3e3;
`;
export default function About() {
  return (
    <AboutContainer>
      <StyledFlexImages>
        <ImageAlt image="share.png" alt="" />
        <ImageLabel image="next.svg" />
        <ImageAlt image="phone.png" alt="" />
      </StyledFlexImages>

      <StyledFlexDescription>
        <NameAndLabel>Ryan Lucas</NameAndLabel>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Image image="map.png" alt="" />
          <Localization>Uberlândia - MG, Brasil</Localization>
        </div>
        <NameAndLabel>HelloVisit</NameAndLabel>
        <Description>
          {" "}
          A Hello te oferece o melhor cartao de visita do mercada,
          possibilitando você ter um certo acesso com aproximação
        </Description>
      </StyledFlexDescription>
    </AboutContainer>
  );
}
