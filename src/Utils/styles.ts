import styled from 'styled-components';

export const H1 = styled.h1`
  font-family: Helvetica;
  font-size: 24px;
  font-weigth: bold;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const Button = styled.button`
  font-family: Helvetica;
  font-size: 16px;
  font-weight: regular;
  color: white;
  background-color: indigo;
  height: 44px;
  width: 151px;
  border: 1px solid;
  border-radius: 8px;
  margin-top: 12px;
`;

export const Error = styled.p`
  font-family: Helvetica;
  color: red;
  font-size: 12px;
  font-weight: regular;
  margin-top: 8px;
`;

function getInputColor(props: any) {
  if (props.disabled) {
      return '#777777';
  }

  if (props.error) {
      return 'red';
  }

  return '#000000';
}

interface InputProps {
  error: boolean;
  disabled: boolean;
}

export const FormLabel = styled.label<InputProps>`
  font-family: Helvetica;
  font-size: 12px;
  font weight: regular;
  color: ${props => getInputColor(props)};
`;

export const Input = styled.input<InputProps>`
  background-color: white;
  border: 1px solid;
  border-radius: 4px;
  margin-top: 4px;
  margin-bottom: 8px;
  height: 16px;
  color: ${props => getInputColor(props)};
`;

export const ListItem = styled.p`
  font-family: helvetica;
  color: ;
  font-size: 14px;
`
