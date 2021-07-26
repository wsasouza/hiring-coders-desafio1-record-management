import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #fff;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  font: 14px Roboto, sans-serif;
  border: 2px solid #232129;
  color: #7159c1;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #c619d6;
      border-color: #c619d6;
      box-shadow: 0 0 5px #00FF00;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #c619d6;
    `}



  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #232129;

    &::placeholder {
      color: #7159c1;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
