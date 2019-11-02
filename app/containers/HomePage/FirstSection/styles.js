import styled, { keyframes } from 'styled-components';

export const SectionOne = styled.div`
  width: 290px;
  padding-top: 40px;
  margin-right: 30px;
  display: inherit;
  flex-direction: column;

  @media (max-width: 1280px) {
    min-width: 260px;
  }

  @media (max-width: 992px) {
    max-width: 260px;
    width: 100%;
    min-width: auto;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0;
  }
`;

export const Wrapper = styled.section`
  display: inherit;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.6);
  width: 100%;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

export const Header = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #24265D;
  padding: 15px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const HeaderSpan = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  color: #fff;
`;

export const Container = styled.div`
  padding: 0 15px 15px 15px;
  width: 100%;
`;

export const TextSpan = styled.div`
  display: flex;
  font-size: 14px;
  color: rgba(24, 32, 78, 0.3);
  padding: 15px 0;
  border-bottom: 1px solid #F6F6F6;
  justify-content: space-between;
`;

export const GreenSpan = styled.span`
  color: #18204E;
  font-size: 14px;
`;

// Svg icons
const spinnerRotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const PlayIcon = styled.svg`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 15px;
  height: 15px;
  cursor: pointer;

  & path {
    fill: #fff;
  }

  &:hover path {
    fill: #548afd;
  }
`;

export const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px 0 10px 0;
`;

export const Spinner = styled.svg`
  width: 40px;
  height: 40px;
  animation: ${spinnerRotate} 1.5s infinite;

  & path {
    fill: rgba(178, 216, 155, 1);
  }
`;
