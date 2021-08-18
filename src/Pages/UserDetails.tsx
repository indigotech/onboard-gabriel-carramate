import { useQuery } from '@apollo/client';
import { ErrorComponent } from '../Components/ErrorComponent';
import { USER_DETAILS } from '../Utils/graphql';

export function UserDetails() {
  const { data, loading, error } = useQuery(USER_DETAILS, {
    variables: { id: window.location.pathname.slice(13) },
  });

  return (
    <>
      {loading && <p>Carregando...</p>}
      <ErrorComponent error={error} />

      {data && (
        <div>
          <h3>{data.user.name}</h3>
          <p>Id: {data.user.id}</p>
          <p>Email: {data.user.email}</p>
          <p>Telefone: {data.user.phone}</p>
          <p>Data de nascimento: {data.user.birthDate}</p>
          <p>Função: {data.user.role}</p>
        </div>
      )}
    </>
  );
}
