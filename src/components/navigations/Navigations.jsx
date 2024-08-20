import styled from "styled-components";
import { useState } from "react";

import Options from "./Options";
import Image from "../image/Image";

const NavContainer = styled.header`
  width: 100%;
  background-color: red;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background: ${(props) => props.theme.backgroundDark};
`;
const ImageAlt = styled(Image)`
  z-index: 5;
`;
export default function Navigations() {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <NavContainer>
      <h3 style={{ fontStyle: "italic", color: "#E2E3E3" }}>HelloVisit</h3>
      {isMenu && <Options hasUser={true} />}
      <ImageAlt
        onClick={() => setIsMenu(!isMenu)}
        image={isMenu ? "/x.png" : "/menu.png"}
        alt=""
      />
    </NavContainer>
  );
}
