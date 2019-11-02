import styled from 'styled-components';

export const SectionTwo = styled.section`
  margin-top: 40px;
  width: 68vw;
  display: flex;
  flex-direction: column;
  max-width: 1280px;

  @media (max-width: 1920px) {
    width: 60vw;
  }

  @media (max-width: 1280px) {
    width: 770px;
  }

  @media (max-width: 992px) {
    width: 100%;
  }
`;

export const Intumentary = styled.div`
  width: 100%;
  padding-bottom: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 992px) {
    padding: 0 10px 20px 10px;
  }

  @media (max-width: 768px) {
    padding: 0 0 15px 0;
    flex-direction: column;
    justify-content: center;
  }
`;

export const ButtonVote = styled.button`
  background-color: #3366FF;
  color: #fff;
  border-radius: 6px;
  height: 40px;
  padding: 0 20px;
  outline: none;
  box-shadow: 0px 2px 5px 0.3px rgba(0, 0, 0, 0.5);
  font-weight: 700;
  &:hover {
    background-color: #1550FF;
  }

  &:active {
    position: relative;
    top: 1px;
  }
`;
