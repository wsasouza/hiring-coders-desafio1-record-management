import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;

  a {
    display: flex;
    transition: opacity 0.2s;
    text-decoration: none; 
    align-items: center;
    font-size: large;

    &:hover {
      opacity: 0.7;
    }

    img {
      margin-left: 25px;
      height: 65px;
      border-radius: 8px;
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;  
  text-decoration: none;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #00FF00;
    }

    span {
      font-size: 12px;
      color: #999;      
    }
  }
`;
