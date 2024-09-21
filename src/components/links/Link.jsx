import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { isMobile } from "react-device-detect";

import Image from "@/components/image/Image";

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
    cursor: pointer;
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
export default function Link({ url, app }) {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  const handleRedirect = () => {
    window.open(url, "_blank");
  };

  return (
    <LinkContainer onClick={handleRedirect} isDark={DarkCondition}>
      {app === "Instagram" && <ImageByWidth image="instagram.png" alt="" />}
      {app === "Whatsapp" && <ImageByWidth image="whatsapp.png" alt="" />}
      {app === "Facebook" && <ImageByPadding image="facebook.png" alt="" />}
      {app === "Telegram" && <ImageByPadding image="telegram.png" alt="" />}
      {app === "Linkedin" && <ImageByPadding image="linkedin.png" alt="" />}

      <NameLink isDark={DarkCondition}>{app}</NameLink>

      <Image
        isDark={DarkCondition}
        imageDark="right-arrowDark.png"
        image="right-arrowLight.png"
        alt=""
      />
    </LinkContainer>
  );
}
