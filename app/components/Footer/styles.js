import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6vh;
  background-color: #fff;
  padding: 12px 0;
  height: 128px;
  margin-top: 30px;

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;

export const Lion = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export const StyledLink = styled(Link)`
  color: white;
  margin-left: 10px;
  text-decoration: none;
`;

export const FooterSpan = styled.span`
  text-align: center;
  color: #18204e;
`;

export const RegularLink = styled.a`
  color: white;
`;
