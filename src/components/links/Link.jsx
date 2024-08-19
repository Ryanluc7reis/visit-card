import styled from "styled-components";

import Image from "@/components/image/Image";

const LinkContainer = styled.div`
  width: 87%;
  height: 60px;
  background: #1b1f23;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;

  @media (min-width: 768px) {
    width: 600px;
  }
`;
const ImageAlt = styled(Image)`
  width: 45px;
  height: 45px;
`;
const SocialName = styled.h4`
  color: #e2e3e3;
`;
export default function Link() {
  return (
    <LinkContainer>
      <ImageAlt image="insta.png" alt="" />
      <SocialName>Instagram</SocialName>
      <Image image="right-arrow.png" alt="" />
    </LinkContainer>
  );
}
