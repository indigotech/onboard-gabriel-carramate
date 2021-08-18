import { Button } from '../Utils/styles';

export function ButtonComponent({ loading, name }: { loading: boolean; name: string }) {
  return (
    <>
      <Button type='submit' disabled={loading}>
        {loading ? 'Carregando...' : name }
      </Button>
    </>
  );
}
