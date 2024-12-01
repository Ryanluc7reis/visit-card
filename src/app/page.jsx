"use client";

import styled from "styled-components";
import { useState, useEffect } from "react";
import { useTheme } from "@/context/ContextTheme";
import axios from "axios";

import Navigations from "@/components/navigations/Navigations";
import LoadingScreen from "@/components/loadingscreen/Loadingscreen";
import Image from "@/components/image/Image";

const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px;
  gap: 10px;
  background-color: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;

const CompanyTitle = styled.h1`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  font-size: 24px;
`;
const CompanyDescription = styled.p`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  font-size: 17px;
  font-weight: 400;
`;
const Steps = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
const Link = styled.a`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};

  all: unset;

  text-decoration: underline;
`;
const FooterContainer = styled.footer`
  padding: 25px;
  display: flex;
  gap: 30px;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  background-color: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const FooterSection = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SocialLink = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
  padding: 10px 0px;
`;
const CarouselContainer = styled.div`
  display: flex;
  position: relative;
  gap: 15px;
`;
const Carousel = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 200px;
  position: relative;
  overflow: hidden;
`;

const Slide = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${(props) => props.translate}%);
`;

const SlideImage = styled.img`
  width: 100%;
  max-height: 100%;
  border-radius: 10px;
  flex-shrink: 0;
`;

const Indicators = styled.div`
  position: absolute;
  bottom: -12%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;

  @media (min-width: 435px) {
    bottom: -8%;
  }
  @media (min-width: 1400px) {
    bottom: -4%;
  }
`;

const Indicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#007bff" : "#ccc")};
  transition: background-color 0.3s ease;
`;
const NavigationButton = styled.button`
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const PrevButton = styled(NavigationButton)`
  left: 10px;
`;

const NextButton = styled(NavigationButton)`
  right: 10px;
`;
const ExplainVideo = styled.iframe`
  border-radius: 9px;
  width: 90%;
  height: 300px;

  @media (min-width: 768px) {
    width: 550px;
  }
`;
export default function HomePage() {
  const { theme } = useTheme();
  const [userData, setUserData] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [currentIndexCarousel, setCurrentIndexCarousel] = useState(0);

  const DarkCondition = theme === "dark" ? true : false;
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const AUTH_NAME = process.env.NEXT_PUBLIC_SESSION_TOKEN_NAME;
  const API_URL = process.env.NEXT_PUBLIC_URL_API;
  const URL = process.env.NEXT_PUBLIC_URL;
  const configAuth = {
    headers: {
      [AUTH_NAME]: token,
    },
  };
  const fullName = userData && userData.fullName;
  const images = ["/produto1.jpg", "/produto2.jpg", "/produto3.jpg"];

  const handleCarousel = () => {
    setCurrentIndexCarousel((prevIndex) => (prevIndex + 1) % images.length);
  };
  const handleNextCarousel = () => {
    setCurrentIndexCarousel((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevCarousel = () => {
    setCurrentIndexCarousel((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };
  useEffect(() => {
    const interval = setInterval(handleCarousel, 8000);
    return () => clearInterval(interval);
  }, []);

  const verifyUser = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/user/verify-session`,
        configAuth
      );

      const data = response.data;
      setUserData(data);
    } catch (error) {
      console.error("Erro ao verificar sessão:", error);
      setUserData(false);
    }
  };
  useEffect(() => {
    verifyUser();
    setLoadingScreen(false);
  }, []);

  if (loadingScreen) {
    return <LoadingScreen />;
  }
  return (
    <>
      <title>HelloVisit: Otimize sua conquista de network</title>
      <Navigations hasUser={fullName} />
      <Container isDark={DarkCondition}>
        <CompanyTitle isDark={DarkCondition}>
          Otimize a forma de como você capita seu network conosco !
        </CompanyTitle>
        <CompanyDescription isDark={DarkCondition}>
          HelloVisit é uma empresa que irá te ajudar aumentar a velocidade de
          conquista de contatos de uma forma objetiva e rápida, por meio de
          nossos produtos práticos, como pulseira, chaveiro e cartão.Todos esses
          produtos contém um chip NFC, no qual irá resumir todo o uso deles em
          uma aproximação.
        </CompanyDescription>
        <h3> O que te oferecemos?</h3>
        <CompanyDescription>
          Te oferecemos a possibilidade ter uma página para uso tanto pessoal,
          quanto para profissional, contendo sua foto, localidade, nome da
          empresa (ou nome pessoal), descrição sobre a empresa e qualquer link
          que você julgue importante para seu NETWORK, desde seu whatsapp até
          sua chave PIX (ou QRCode).
        </CompanyDescription>
        <h3>Conheça nossos produtos:</h3>
        <CarouselContainer>
          <PrevButton onClick={handlePrevCarousel}>❮</PrevButton>

          <Carousel>
            <Slide translate={-currentIndexCarousel * 100}>
              {images.map((image, index) => (
                <SlideImage
                  key={index}
                  src={image}
                  alt={`Produto ${index + 1}`}
                />
              ))}
            </Slide>
          </Carousel>
          <Indicators>
            {images.map((_, index) => (
              <Indicator key={index} active={index === currentIndexCarousel} />
            ))}
          </Indicators>

          <NextButton onClick={handleNextCarousel}>❯</NextButton>
        </CarouselContainer>

        <br />
        <h3>Como usar produtos HelloVisit passo a passo:</h3>
        <Steps>
          <Link isDark={DarkCondition} href={`${URL}/signup`} target="_blank">
            1.Crie sua conta{" "}
          </Link>
          <Image
            image="right-arrowLight-sobreNos.png"
            imageDark="right-arrowLight.png"
            noHover
            alt=""
          />
        </Steps>
        <Steps>
          <Link
            isDark={DarkCondition}
            href={`${URL}/createprofile`}
            target="_blank"
          >
            2.Crie sua página
          </Link>
          <Image
            image="right-arrowLight-sobreNos.png"
            imageDark="right-arrowLight.png"
            noHover
            alt=""
          />
        </Steps>
        <Steps>
          <Link
            isDark={DarkCondition}
            href={`https://api.whatsapp.com/send?phone=5534998069617&text=Quero%20adquirir%20um%20produto%20hellovisit`}
            target="_blank"
          >
            {" "}
            3.Adquira algum produto hellovisit
          </Link>
          <Image
            image="right-arrowLight-sobreNos.png"
            imageDark="right-arrowLight.png"
            noHover
            alt=""
          />
        </Steps>

        <Steps>
          <Link
            isDark={DarkCondition}
            href={`https://play.google.com/store/apps/details?id=com.wakdev.wdnfc
`}
            target="_blank"
          >
            4.Registre o link de sua página no NFC do produto, por meio de um
            app que cadastre tags NFC.
          </Link>
          <Image
            image="right-arrowLight-sobreNos.png"
            imageDark="right-arrowLight.png"
            noHover
            alt=""
          />
        </Steps>
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h4>Apps para Android:</h4>
          <p>1.NFC Tools(Mais usado)</p>
          <p>2.TagWriter by NXP</p>
          <p>3.NFC TagInfo by NXP</p>
          <h4>Apps para IOS:</h4>
          <p>1.NFC Tools(Mais usado)</p>
          <p>2.NFC TagWriter by NXP</p>
          <p>3.NFC for iPhone</p>
        </div>
        <Steps>
          <Link
            style={{ textDecoration: "none" }}
            isDark={DarkCondition}
            href={`${URL}/signup`}
            target="_blank"
          >
            5.Depois de cadastrar sua tag NFC para abrir sua página, basta
            aproximar seu produto hellovisit de outro aparelho que possua um
            chip NFC que irá abrir sua página instantaneamente nesse aparelho.
          </Link>
        </Steps>
        <ExplainVideo
          src="https://www.youtube.com/embed/r9LV1WDxAcs?si=-qp0ixnRUhtjvr0N"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </Container>
      <FooterContainer isDark={DarkCondition}>
        <FooterSection>
          <h4>Está com algum problema ?</h4>
          <SocialLink>
            <Link
              isDark={DarkCondition}
              href="href={`https://api.whatsapp.com/send?phone=5534998069617&text=Estou%20com%20um%20problemas%20no%20site%20`}"
              target="_blank"
            >
              Fale conosco
            </Link>
            <Image
              isDark={DarkCondition}
              image="whatsLight-footer.png"
              imageDark=" whatsDark-footer.png"
              alt=""
              noHover
            />
          </SocialLink>
          <SocialLink>
            <Link
              isDark={DarkCondition}
              href="https://telegram.com"
              target="_blank"
            >
              Telegram
            </Link>
            <Image
              isDark={DarkCondition}
              image="teleLight-footer.png"
              imageDark="teleDark-footer.png"
              alt=""
              noHover
            />
          </SocialLink>
        </FooterSection>
        <FooterSection>
          <h4>Siga-nós</h4>

          <SocialLink>
            <Link
              isDark={DarkCondition}
              href="https://instagram.com"
              target="_blank"
            >
              Instagram
            </Link>
            <Image
              isDark={DarkCondition}
              image="instaLight-footer.png"
              imageDark=" instaDark-footer.png"
              alt=""
              noHover
            />
          </SocialLink>
          <SocialLink>
            <Link
              isDark={DarkCondition}
              href="https://telegram.com"
              target="_blank"
            >
              Telegram
            </Link>
            <Image
              isDark={DarkCondition}
              image="teleLight-footer.png"
              imageDark="teleDark-footer.png"
              alt=""
              noHover
            />
          </SocialLink>
        </FooterSection>

        <h3>&copy; 2024 HelloVisit. Todos os direitos reservados.</h3>
      </FooterContainer>
    </>
  );
}
