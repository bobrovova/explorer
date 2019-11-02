import styled from 'styled-components';

// Table
export const TableHead = styled.div`
  background-color: #F7F9FC;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 4px;
  bordert-top-rigth-radius: 4px;
`;

export const Tdata = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #222B45;
  text-align: center;
  white-space: nowrap;
  flex: 1;
`;

export const FixedCell = Tdata.extend`
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
  background-color: rgb(178, 216, 155);
`;

export const FixedWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const FixedText = styled.span`
  padding-left: 110px;
`;

export const ColumnMenuTdata = styled.div`
  width: 25px;
  height: 22px;
  margin-right: 10px;
`;
