import styled from "styled-components";
import { useTheme } from "@/context/ContextTheme";

import { Input } from "../form/Input";
import { Button } from "../form/Button";

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
export default function EditAbout() {
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <Form isDark={DarkCondition}>
      <Title isDark={DarkCondition}>Detalhes de sobre</Title>
      <InputAlt isDark={DarkCondition} label="Nome" />
      <InputAlt isDark={DarkCondition} label="Nome da empresa ou @" />
      <InputAlt isDark={DarkCondition} label="Descrição" />
      <InputAlt isDark={DarkCondition} label="Senha" />
      <InputAlt isDark={DarkCondition} label="Link da página" />
      <div style={{ width: "100%", textAlign: "center" }}>
        <Button onClick={(e) => e.preventDefault()}>Salvar alterações</Button>
      </div>
    </Form>
  );
}
