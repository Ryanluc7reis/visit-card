import styled from "styled-components";
import { useState } from "react";
import { useTheme } from "@/context/ContextTheme";
import { useRouter } from "next/navigation";

import Options from "./Options";
import Image from "../image/Image";

const NavContainer = styled.header`
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  background: ${(props) =>
    props.isDark ? props.theme.backgroundDark : props.theme.backgroundLight};
`;
const ImageAlt = styled(Image)`
  z-index: 5;
`;
const Logo = styled.h3`
  font-style: italic;
  color: ${(props) =>
    props.isDark ? props.theme.textDark : props.theme.textLight};
`;
export default function Navigations() {
  const [isMenu, setIsMenu] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const DarkCondition = theme === "dark" ? true : false;
  return (
    <NavContainer isDark={DarkCondition}>
      <Logo onClick={() => router.push("/")} isDark={DarkCondition}>
        HelloVisit
      </Logo>
      {isMenu && <Options hasUser={false} />}
      <ImageAlt
        onClick={() => setIsMenu(!isMenu)}
        isMenu={isMenu}
        image={theme === "dark" ? "/menu.png" : "/menuLight.png"}
        alt=""
      />
    </NavContainer>
  );
}
