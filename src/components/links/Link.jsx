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
    // Verifica se está em dispositivo móvel
    if (isMobile) {
      const appDeepLink = getUniversalLink(app);

      if (appDeepLink) {
        // Tenta abrir o link do app
        window.location.href = appDeepLink;

        // Fallback após um tempo se o app não abrir
        setTimeout(() => {
          window.open(url, "_blank"); // Redireciona para a versão web em uma nova aba
        }, 2000);
      } else {
        window.open(url, "_blank"); // Redireciona para a versão web se o deep link não for suportado, em nova aba
      }
    } else {
      window.open(url, "_blank"); // Se não estiver no mobile, abre a versão web em uma nova aba
    }
  };

  const getUniversalLink = (appName) => {
    // Converte o nome do aplicativo para letras minúsculas
    const lowerCaseAppName = appName.toLowerCase();

    // Verifica o nome do aplicativo e retorna a URL universal correspondente
    if (lowerCaseAppName === "Whatsapp") {
      return "https://wa.me/55349980696f17"; // URL universal do Facebook
    } else if (lowerCaseAppName === "Instagram") {
      return "https://www.instagram.com/ryanluc7reis"; // URL universal do Instagram
    }
    // Adicione outras URLs universais aqui
    else {
      return null; // Retorna null se não existir URL universal
    }
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
