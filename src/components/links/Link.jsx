import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { useState } from "react";

import Image from "@/components/image/Image";
import GeneratorPix from "../generatorpix/GeneratorPix";

const LinkContainer = styled.a`
  width: 87%;
  height: 60px;
  background: ${(props) =>
    props.isDark
      ? props.theme.backgroundContentDark
      : props.theme.backgroundContentLight};
  border: 1px solid
    ${(props) =>
      props.isDark ? props.theme.borderDark : props.theme.borderLight};
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  :hover {
    background-color: ${(props) =>
      props.isDark ? props.theme.hoverDark : props.theme.hoverLight};
    cursor: ${(props) => (props.showPix ? "default" : "pointer")};
  }

  @media (min-width: 768px) {
    width: 600px;
  }
`;
const ImageByWidth = styled(Image)`
  width: 45px;
  height: 45px;
`;
const ImageByPadding = styled(Image)`
  padding: 1px;
`;
const NameLink = styled.h4`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function Link({ name, location, pixKey, url, app }) {
  const [showPix, setShowPix] = useState(false);

  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;

  const handleRedirect = () => {
    if (app === "Pix") {
      setShowPix(!showPix);
    } else {
      window.open(url, "_blank");
    }
  };

  return (
    <LinkContainer
      showPix={showPix}
      onClick={handleRedirect}
      isDark={DarkCondition}
    >
      {app === "Instagram" && (
        <ImageByWidth image="instagram.png" alt="Link para Instagram" noHover />
      )}
      {app === "Whatsapp" && (
        <ImageByWidth image="whatsapp.png" alt="Link para Whatsapp" noHover />
      )}
      {app === "Facebook" && (
        <ImageByPadding image="facebook.png" alt="Link para Facebook" noHover />
      )}
      {app === "Telegram" && (
        <ImageByPadding image="telegram.png" alt="Link para Telegram" noHover />
      )}
      {app === "Linkedin" && (
        <ImageByPadding image="linkedin.png" alt="Link para Linkedin" noHover />
      )}
      {app === "Pix" && (
        <ImageByWidth image="pix.png" alt="Link para Pix" noHover />
      )}
      {showPix && (
        <GeneratorPix
          pixKey={pixKey}
          name={name}
          location={location}
          setShowPix={setShowPix}
        />
      )}

      <NameLink isDark={DarkCondition}>{app}</NameLink>

      <Image
        isDark={DarkCondition}
        imageDark="right-arrowDark.png"
        image="right-arrowLight.png"
        noHover
        alt=""
      />
    </LinkContainer>
  );
}
