import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";
import { useState } from "react";

import { Input } from "../form/Input";
import { Button } from "../form/Button";
import { Selecter } from "../form/Selecter";
import Image from "../image/Image";

const Form = styled.form`
  width: 90%;
  min-height: 180px;
  padding: 15px;
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
const InputAlt = styled(Input)`
  background: transparent;
  border: none;
  border-bottom: 1px solid
    ${(props) => (props.isDark ? props.theme.textDark : "#696565")};
`;
const Title = styled.h3`
  font-weight: bold;
  margin: 7px 0;
  text-align: center;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
const LinkItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: end;
  margin-bottom: 10px;
  @media (min-width: 428px) {
    align-items: center;
    justify-content: space-between;
  }
`;

export default function EditLink() {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;

  const [links, setLinks] = useState([{ id: 1, app: "", url: "" }]);

  const handleAddLink = () => {
    setLinks([...links, { id: links.length + 1, app: "", url: "" }]);
  };

  const handleRemoveLink = (id) => {
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setLinks(
      links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };
  return (
    <Form isDark={DarkCondition}>
      <Title isDark={DarkCondition}> Detalhes sobre seus links</Title>

      {links.map((link) => (
        <LinkItem key={link.id}>
          <Selecter
            label="Aplicativo"
            isDark={DarkCondition}
            value={link.app}
            onChange={(e) => handleInputChange(link.id, "app", e.target.value)}
          />
          <div style={{ display: "flex", alignItems: "end" }}>
            <InputAlt
              label="Link"
              isDark={DarkCondition}
              value={link.url}
              onChange={(e) =>
                handleInputChange(link.id, "url", e.target.value)
              }
            />

            <Image
              isDark={DarkCondition}
              imageDark="xDark.png"
              image="xLight.png"
              alt=""
              onClick={() => handleRemoveLink(link.id)}
            />
          </div>
        </LinkItem>
      ))}
      <Image
        isDark={DarkCondition}
        imageDark="plusDark.png"
        image="plusLight.png"
        alt=""
        onClick={handleAddLink}
      />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button onClick={(e) => e.preventDefault()}>Salvar alterações</Button>
      </div>
    </Form>
  );
}
