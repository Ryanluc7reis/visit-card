import styled from "styled-components";

const StyledImage = styled.img`
  padding: 1px;
  border-radius: 15px;
  cursor: pointer;
  :active {
    background-color: #3a3a3b7a;
    transition: 0.5s;
  }
`;
export default function Image({ image, ...props }) {
  return <StyledImage src={image} {...props} />;
}
