import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { ErrorComponent } from '../Components/ErrorComponent';
import { USER_DETAILS } from '../Utils/graphql';
import { UserDetailParams } from '../Utils/interfaces';

export function UserDetails() {
  const params: UserDetailParams = useParams();

  const { data, loading, error } = useQuery(USER_DETAILS, {
    variables: { id: params.id },
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
