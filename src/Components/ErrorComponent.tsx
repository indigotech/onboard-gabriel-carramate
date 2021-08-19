import { useState } from 'react';
import { Error } from '../Utils/styles';

export function ErrorComponent({ error }: { error: any }) {
  const [color, setColor] = useState('black')
  return <>{error && <Error>{error.message}</Error>}</>;
}
