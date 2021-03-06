import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { ErrorComponent } from '../Components/ErrorComponent';
import { USER_DETAILS } from '../Utils/graphql';
import { UserDetailParams } from '../Utils/interfaces';
import { Bold, LeftMarginH1, LeftMarginP } from '../Utils/styles';

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
          <LeftMarginH1>{data.user.name}</LeftMarginH1>
          <LeftMarginP>
            <Bold>Id:</Bold> {data.user.id}
          </LeftMarginP>
          <LeftMarginP>
            <Bold>Email:</Bold> {data.user.email}
          </LeftMarginP>
          <LeftMarginP>
            <Bold>Telefone:</Bold> {data.user.phone}
          </LeftMarginP>
          <LeftMarginP>
            <Bold>Data de nascimento:</Bold> {data.user.birthDate}
          </LeftMarginP>
          <LeftMarginP>
            <Bold>Função:</Bold> {data.user.role}
          </LeftMarginP>
        </div>
      )}
    </>
  );
}
