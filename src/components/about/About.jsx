import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import Image from "../image/Image";
import { useState } from "react";

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
  width: 110px;
  height: 113px;
  margin-bottom: 30px;
  border-radius: 54px;
  position: absolute;
  left: 34%;

  @media (min-width: 340px) {
    left: 35%;
  }
  @media (min-width: 375px) {
    left: 36%;
  }
  @media (min-width: 425px) {
    left: 38%;
  }
  @media (min-width: 768px) {
    left: 43%;
  }
  @media (min-width: 1024px) {
    left: 45%;
  }
  @media (min-width: 1349px) {
    left: 46%;
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
const Options = styled.div`
  position: absolute;
  margin-top: 110px;
  width: auto;
  right: 11%;
  text-align: center;
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${(props) => (props.isDark ? props.theme.textDark : props.theme.textLight)};

  background-color: ${(props) =>
    props.isDark
      ? props.theme.backgroundContentDark
      : props.theme.backgroundContentLight};

  @media (min-width: 768px) {
    right: 15%;
  }
  @media (min-width: 1024px) {
    right: 24%;
  }
  @media (min-width: 1349px) {
    right: 30%;
  }
`;
const Text = styled.a`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  font-weight: 400;
  padding: 10px;
  text-decoration: none;
  cursor: pointer;
  :hover {
    color: #797474;
  }
`;
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) =>
    props.isDark ? props.theme.textDark : " black"};
`;
export default function About({
  name,
  companyName,
  location,
  description,
  number,
  image,
  setShowLink,
}) {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark";
  const [showOptions, setShowOptions] = useState(false);
  const currentNumber = number?.startsWith("+") ? number : "+" + number;

  const handleDownloadVCard = () => {
    const vCardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${name}`,
      `ORG:${companyName}`,
      `TEL;TYPE=CELL:${currentNumber}`,
      "END:VCARD",
    ].join("\r\n");

    const blob = new Blob([vCardData], { type: "text/x-vcard" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.href = url;
    link.download = `${name}_contact.vcf`;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  const handleShowLink = () => {
    setShowLink(true);
  };

  const handleShowOptionsPhone = () => {
    if (showOptions) {
      setShowOptions(!showOptions);
    }
  };

  return (
    <AboutContainer onClick={handleShowOptionsPhone} isDark={DarkCondition}>
      <StyledFlexImages>
        <ImageAlt
          isDark={DarkCondition}
          imageDark="share.png"
          image="shareLight.png"
          alt=""
          onClick={handleShowLink}
        />
        <ImageLabel image={image} />
        <ImageAlt
          isDark={DarkCondition}
          imageDark="phone.png"
          image="phoneLight.png"
          alt=""
          onClick={() => setShowOptions(!showOptions)}
        />
        {showOptions && (
          <Options isDark={DarkCondition}>
            <Text onClick={handleDownloadVCard} isDark={DarkCondition}>
              Salvar contato direto na conta
            </Text>
            <Line isDark={DarkCondition} />
            <Text isDark={DarkCondition} href={`tel:${currentNumber}`}>
              Ir com o número para o discador
            </Text>
          </Options>
        )}
      </StyledFlexImages>

      <StyledFlexDescription>
        <NameAndLabel isDark={DarkCondition}>{name}</NameAndLabel>
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <Image
            isDark={DarkCondition}
            imageDark="map.png"
            image="mapLight.png"
            alt=""
          />
          <Localization isDark={DarkCondition}>{location}</Localization>
        </div>
        <NameAndLabel isDark={DarkCondition}>{companyName}</NameAndLabel>
        <Description isDark={DarkCondition}>{description}</Description>
      </StyledFlexDescription>
    </AboutContainer>
  );
}
