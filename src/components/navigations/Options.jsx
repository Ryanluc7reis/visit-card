import styled from "styled-components";

const MenuContainer = styled.header`
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  min-height: 100vh;
  background-color: #2b2b2bdf;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  gap: 15px;
`;
const Option = styled.h3`
  color: white;
  gap: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px 0px;
  border-bottom: 0.7px solid #a3a3a379;
  cursor: pointer;
  :active {
    background-color: #3a3a3b7a;
    transition: 0.5s;
  }

  @media (min-width: 615px) {
    :hover {
      background-color: #68686879;
    }
  }
`;
const Image = styled.img`
  padding: 1px;
`;

export default function Options({ hasUser }) {
  return (
    <MenuContainer>
      {hasUser ? (
        <div
          style={{
            borderBottom: "0.7px solid #a3a3a379",
            borderTop: "0.7px solid #a3a3a379",
          }}
        >
          <Option>Sobre nós</Option>
          <Option>Editar meus links </Option>
          <Option>Meus links</Option>
          <Option style={{ color: "red" }}>
            <Image src="/sair.png" alt="" />
            Sair
          </Option>
        </div>
      ) : (
        <div
          style={{
            borderBottom: "0.7px solid #a3a3a379",
            borderTop: "0.7px solid #a3a3a379",
          }}
        >
          <Option>Comprar cartão</Option>
          <Option>Sobre nós</Option>
          <Option>Criar meus links</Option>
          <Option>Me cadastrar</Option>
        </div>
      )}
    </MenuContainer>
  );
}
