import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #c619d6;
  height: 35px;
  border-radius: 8px;
  border: 0;
  padding: 10 20px;
  color: #fff;   
  width: 50%;
  font-weight: bold;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, '#c619d6')};
  }
`;
