import styled from "styled-components";
import { useState } from "react";

import Options from "./Options";

const NavContainer = styled.header`
  width: 100%;
  background-color: red;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
`;
const Image = styled.img`
  padding: 1px;
  border-radius: 15px;
  z-index: 1;
  cursor: pointer;
  :active {
    background-color: #3a3a3b7a;
    transition: 0.5s;
  }
`;

export default function Navigations() {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <NavContainer>
      <h3 style={{ fontStyle: "italic" }}>HelloVisit</h3>
      {isMenu && <Options hasUser={true} />}
      <Image
        onClick={() => setIsMenu(!isMenu)}
        src={isMenu ? "/x.png" : "/menu.png"}
        alt=""
      />
    </NavContainer>
  );
}
