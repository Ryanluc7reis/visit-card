import styled from "styled-components";
import QRCode from "qrcode.react";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useState, useEffect, useRef } from "react";

import Image from "../image/Image";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #00000073;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
  padding: 55px 10px;
`;
const BoxLink = styled.div`
  width: 90%;
  height: auto;
  padding: 10px;
  background-color: ${(props) =>
    props.isDark
      ? props.theme.backgroundContentDark
      : props.theme.backgroundContentLight};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  gap: 15px;
  border-radius: 7px;

  @media (min-width: 768px) {
    width: 400px;
  }
`;
const ButtonCopy = styled.div`
  background-color: #56648f;
  padding: 10px;
  border-radius: 10px;
  border: 0;
  color: white;
  font-weight: bold;
  font-size: 16px;
  width: 180px;
  transition: all 200ms ease-in-out;
  display: flex;
  gap: 12px;
  text-align: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: "#677db7";
  }
`;
const ButtonShare = styled(ButtonCopy)`
  gap: 7px;
  background-color: transparent;
  border: 1px solid #56648f;
  color: #56648f;
`;
const Text = styled.h4`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  font-weight: 400;
  width: 90%;
`;

export default function GeneratorPageLink({ setShowLink, setLinkCurrent }) {
  const { theme } = useTheme();
  const { setShowPopUp, setMessageType } = usePopUp();
  const DarkCondition = theme === "dark" ? true : false;

  const [qrCode, setQrCode] = useState("");
  const qrCodeRef = useRef(null);
  const linkCurrent = setLinkCurrent;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(linkCurrent)
      .then(() => {
        setMessageType("copyLink");
        setShowPopUp(true);
      })
      .catch((err) => {
        setMessageType("error");
        setShowPopUp(true);
        console.error("Erro ao copiar o código: ", err);
      });
  };
  const shareQRCode = () => {
    const qrCanvas = qrCodeRef.current?.querySelector("canvas");

    if (!qrCanvas) {
      console.error("QR Code não foi gerado corretamente.");
      return;
    }

    const qrDataUrl = qrCanvas.toDataURL("image/png");

    fetch(qrDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "qrcode.png", { type: "image/png" });

        if (navigator.share) {
          navigator
            .share({
              title: "Compartilhar QR Code",
              text: "Aqui está o QR Code gerado.",
              files: [file],
            })
            .then(() => console.log("Compartilhamento concluído com sucesso"))
            .catch((error) => console.log("Erro ao compartilhar:", error));
        } else {
          console.error("API de compartilhamento não suportada");
        }
      })
      .catch((err) => console.error("Erro ao converter canvas em blob:", err));
  };
  const shareLink = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Compartilhar Link",
          text: "Aqui está o link gerado.",
          url: linkCurrent,
        })
        .then(() => console.log("Compartilhamento concluído com sucesso"))
        .catch((error) => console.log("Erro ao compartilhar:", error));
    } else {
      console.error("API de compartilhamento não suportada");
    }
  };

  const handleOutsideClick = () => {
    setShowLink(false);
  };
  useEffect(() => {
    setQrCode(linkCurrent);
  }, [qrCode, setMessageType, setShowPopUp, linkCurrent]);
  return (
    <Container onClick={handleOutsideClick}>
      <BoxLink onClick={(e) => e.stopPropagation()} isDark={DarkCondition}>
        <Text isDark={DarkCondition}>
          {" "}
          Escolha a melhor forma te compartilhar sua página !
        </Text>

        <div ref={qrCodeRef}>
          <QRCode value={qrCode} size={180} />
        </div>

        <ButtonCopy isDark={DarkCondition} onClick={copyToClipboard}>
          <Image image="copy-full-white.png" alt="" />
          <h4>Copiar link</h4>
        </ButtonCopy>

        <ButtonShare isDark={DarkCondition} onClick={shareLink}>
          <Image image="share-qrCode.png" alt="" />
          <h4>Compartilhar Link</h4>
        </ButtonShare>

        <ButtonShare isDark={DarkCondition} onClick={shareQRCode}>
          <Image image="share-qrCode.png" alt="" />
          <h4>Compartilhar QRCode</h4>
        </ButtonShare>
      </BoxLink>
    </Container>
  );
}
