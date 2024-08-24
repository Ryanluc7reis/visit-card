import styled from "styled-components";

const StyledImage = styled.img`
  padding: 1px;
  border-radius: 15px;
  cursor: pointer;
  :active {
    background-color: #3a3a3b7a;
    transition: 0.5s;
  }
  @media (min-width: 768px) {
    :hover {
      background-color: ${(props) =>
        props.isDark ? props.theme.hoverDark : props.theme.hoverLight};
    }
  }
`;
export default function Image({ image, imageDark, isDark, isMenu, ...props }) {
  return (
    <>
      {isMenu ? (
        <StyledImage src={"/x.png"} {...props} />
      ) : (
        <StyledImage src={isDark ? imageDark : image} {...props} />
      )}
    </>
  );
}
