import styled from 'styled-components';
import { InputProps } from './interfaces';

export const H1 = styled.h1`
  font-family: Helvetica;
  font-size: 24px;
  font-weigth: bold;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const LeftMarginH1 = styled(H1)`
  position: relative;
  left: 42px;
  margin-bottom: 30px;
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

export const PageButton = styled(Button)`
  font-size: 10px;
  font-weight: bold;
  height: 17px;
  width: 25px;
`;

export const UserListButton = styled(Button)`
  position: relative;
  left: 40px;
  margin-top: 8px;
  background-color: #5d76cb;
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

export const FormLabel = styled.label<InputProps>`
  font-family: Helvetica;
  font-size: 12px;
  font weight: regular;
  color: ${(props) => getInputColor(props)};
`;

export const Input = styled.input<InputProps>`
  background-color: white;
  border: 1px solid;
  border-radius: 4px;
  margin-top: 4px;
  margin-bottom: 8px;
  height: 16px;
  color: ${(props) => getInputColor(props)};
`;

export const ListItem = styled.p`
  font-family: helvetica;
  font-size: 14px;
`;

export const LeftMarginP = styled(ListItem)`
  position: relative;
  left: 42px;
`;

export const Bold = styled.span`
  font-family: helvetica;
  font-weight: bold;
  font-size: 14px;
`;

export const CleanList = styled.li`
  font-family: helvetica;
  position: relative;
  list-style-type: none;
  left: 2px;
  border-bottom: 1px solid;
  border-color: #32127a;
`;
