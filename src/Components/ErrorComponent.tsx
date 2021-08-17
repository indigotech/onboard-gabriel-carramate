import { errorStyle } from '../Utils/styles';

export function ErrorComponent({ error }: { error: any }) {
  return <>{error && <p style={errorStyle}>{error.message}</p>}</>;
}
