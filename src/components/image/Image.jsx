import styled from "styled-components";

const StyledImage = styled.img`
  padding: 1px;
  border-radius: 15px;
  cursor: ${(props) => (props.noHover ? "default" : "pointer")};

  :active {
    background-color: #3a3a3b7a;
    transition: 0.5s;
  }
  @media (min-width: 768px) {
    :hover {
      background: ${(props) => (props.noHover ? "transparent" : "#80808028")};
    }
  }
`;
const StyledImageX = styled(StyledImage)`
  position: fixed;
  right: 2%;
`;
export default function Image({
  image,
  imageDark,
  isDark,
  isMenu,
  noHover,
  ...props
}) {
  return (
    <>
      {isMenu ? (
        <StyledImageX src={"/x.png"} {...props} />
      ) : (
        <StyledImage
          src={isDark ? imageDark : image}
          isDark={isDark}
          noHover={noHover}
          {...props}
        />
      )}
    </>
  );
}
