import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import Image from "../image/Image";

const AboutContainer = styled.div`
  width: 90%;
  min-height: 180px;
  padding: 10px;
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
const ImageAlt = styled(Image)`
  width: 30px;
  height: 30px;
`;
const ImageLabel = styled(Image)`
  width: 90px;
  height: 80px;
  background: purple;
  border-radius: 54px;
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
  @media (min-width: 1349px) {
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
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const Localization = styled.h4`
  font-weight: 400;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const Description = styled.h4`
  font-weight: 400;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function About() {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <AboutContainer isDark={DarkCondition}>
      <StyledFlexImages>
        <ImageAlt
          isDark={DarkCondition}
          imageDark="share.png"
          image="shareLight.png"
          alt=""
        />
        <ImageLabel image="next.svg" />
        <ImageAlt
          isDark={DarkCondition}
          imageDark="phone.png"
          image="phoneLight.png"
          alt=""
        />
      </StyledFlexImages>

      <StyledFlexDescription>
        <NameAndLabel isDark={DarkCondition}>Ryan Lucas</NameAndLabel>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Image
            isDark={DarkCondition}
            imageDark="map.png"
            image="mapLight.png"
            alt=""
          />
          <Localization isDark={DarkCondition}>
            Uberlândia - MG, Brasil
          </Localization>
        </div>
        <NameAndLabel isDark={DarkCondition}>HelloVisit</NameAndLabel>
        <Description isDark={DarkCondition}>
          {" "}
          A Hello te oferece o melhor cartao de visita do mercada,
          possibilitando você ter um certo acesso com aproximação
        </Description>
      </StyledFlexDescription>
    </AboutContainer>
  );
}
