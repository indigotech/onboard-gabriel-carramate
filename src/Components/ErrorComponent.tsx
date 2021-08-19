import { Error } from '../Utils/styles';

export function ErrorComponent({ error }: { error: any }) {
  return <>{error && <Error>{error.message}</Error>}</>;
}
