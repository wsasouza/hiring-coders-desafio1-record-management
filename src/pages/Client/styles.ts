import styled from 'styled-components';

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px; 
`;

export const PersonalData = styled.fieldset`
  legend {
    font-size: 22px;
    padding: 5px;
  }

  border: 2px solid #232129;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const AddressData = styled.fieldset`
  legend {
    font-size: 22px;
    padding: 5px;    
  }
  margin-top: 28px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 2px solid #232129;
`;