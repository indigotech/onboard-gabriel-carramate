import { Button } from '../Utils/styles';

export function ButtonComponent({ loading, title }: { loading: boolean; title: string }) {
  return (
      <Button type='submit' disabled={loading}>
        {loading ? 'Carregando...' : title }
      </Button>
  );
}
