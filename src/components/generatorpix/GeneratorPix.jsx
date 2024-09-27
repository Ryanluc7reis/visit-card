import styled from "styled-components";
import { createStaticPix } from "pix-utils";
import QRCode from "qrcode.react";
import { useTheme } from "@/context/ContextTheme";
import { usePopUp } from "@/context/ContextPopUp";
import { useState, useEffect, useRef } from "react";

import Image from "../image/Image";
import { Input } from "../form/Input";
import { Button } from "../form/Button";

const ContainerPix = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #00000073;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BoxPix = styled.div`
  width: 90%;
  height: 440px;
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
  gap: 7px;
  align-items: center;

  :hover {
    background-color: "#677db7";
  }
`;
const ButtonShareQRcode = styled(ButtonCopy)`
  background-color: transparent;
  border: 1px solid #56648f;
  color: #56648f;
`;
const Text = styled.h4`
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
  font-weight: 400;
`;
const InputValue = styled(Input)`
  width: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 16px;
`;
const StyledFlexButtonToBack = styled.div`
  width: 100%;
  display: flex;
  gap: 4px;
  align-items: start;
  text-align: center;
`;
const ImageAlt = styled(Image)``;
export default function GeneratorPix({ name, location, pixKey, setShowPix }) {
  const { theme } = useTheme();
  const { setShowPopUp, setMessageType } = usePopUp();
  const DarkCondition = theme === "dark" ? true : false;

  const [currentValue, setCurrentValue] = useState(false);
  const [value, setValue] = useState(0);
  const [brCode, setBrCode] = useState("");
  const qrCodeRef = useRef(null);

  const formatCurrency = (value) => {
    const formattedValue = (value / 100).toFixed(2).replace(".", ",");
    return formattedValue;
  };

  const handleValueChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "");

    if (inputValue === "") {
      setValue(0);
      return;
    }

    setValue(parseInt(inputValue));
  };

  useEffect(() => {
    const formattedValue = (value / 100).toFixed(2);
    const pix = createStaticPix({
      merchantName: `${name}`,
      merchantCity: `${location}`,
      pixKey: `${pixKey}`,
      infoAdicional: "Gerado por HelloVisit",
      transactionAmount: Number(formattedValue),
    }).throwIfError();

    setBrCode(pix.toBRCode());
  }, [value, name, location, pixKey]);

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(brCode)
      .then(() => {
        setMessageType("copy");
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

  const handleOutsideClick = () => {
    setShowPix(false);
  };

  return (
    <ContainerPix onClick={handleOutsideClick}>
      <BoxPix onClick={(e) => e.stopPropagation()} isDark={DarkCondition}>
        {!currentValue ? (
          <>
            <Text isDark={DarkCondition}>
              Digite o valor da transação e copie o código Pix Copia e Cola
            </Text>

            <InputValue
              type="text"
              value={formatCurrency(value)}
              onChange={handleValueChange}
            />
            <Button onClick={() => setCurrentValue(true)}>Continuar</Button>
          </>
        ) : (
          <>
            <StyledFlexButtonToBack onClick={() => setCurrentValue(false)}>
              <ImageAlt
                isDark={DarkCondition}
                image="left-arrow-white.png"
                imageDark="left-arrow-dark.png"
                alt=""
              />
              <Text style={{ marginTop: "2px" }} isDark={DarkCondition}>
                Voltar
              </Text>
            </StyledFlexButtonToBack>

            <Text isDark={DarkCondition}>
              Envie o código do Pix Copia e Cola com quem vai pagar
            </Text>
            <div ref={qrCodeRef}>
              <QRCode value={brCode} size={170} />
            </div>

            <ButtonCopy isDark={DarkCondition} onClick={copyToClipboard}>
              <Image image="copy-full-white.png" alt="" />
              <h4>Copiar código</h4>
            </ButtonCopy>

            <ButtonShareQRcode isDark={DarkCondition} onClick={shareQRCode}>
              <Image image="share-qrCode.png" alt="" />
              <h4>Compartilhar QR Code</h4>
            </ButtonShareQRcode>
          </>
        )}
      </BoxPix>
    </ContainerPix>
  );
}
