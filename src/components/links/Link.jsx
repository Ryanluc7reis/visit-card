import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import Image from "@/components/image/Image";

const LinkContainer = styled.div`
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
const ImageAlt = styled(Image)`
  width: 45px;
  height: 45px;
`;
const NameLink = styled.h4`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function Link() {
  const { theme } = useTheme();
  return (
    <LinkContainer isDark={theme === "dark" ? true : false}>
      <ImageAlt image="insta.png" alt="" />
      <NameLink isDark={theme === "dark" ? true : false}>Instagram</NameLink>
      <Image
        isDark={theme === "dark" ? true : false}
        imageDark="right-arrowDark.png"
        image="right-arrowLight.png"
        alt=""
      />
    </LinkContainer>
  );
}
