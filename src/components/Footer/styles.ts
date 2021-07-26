import styled from 'styled-components';

export const Container = styled.div`
  display: flex;  
  color: #fff;
  align-items: center;
  justify-content: flex-end;
  margin-top: 25px;
  border-radius: 8px;
  padding: 30px;
  background: #7159c1;
  border-radius: 8px; 

  span {
    margin-left: 5px;
    margin-right: 5px;
  }

  a {
    display: flex;
    text-decoration: none;
    align-items: center;
    color: #fff; 
    transition: filter 0.5s;   
  }

  a:hover {
    color: #00FF00;
    filter: brightness(0.8);
  }
`;