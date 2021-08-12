import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_USERS } from '../Utils/graphql';

export function UserList() {
  const { loading, error, data } = useQuery(GET_USERS);

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <div>
          <h3>Lista de usuários</h3>

          <ul>
            {data.users.nodes.map((item: any) => (
              <li key={item.id}>
                <p>
                  name: {item.name} email: {item.email}
                </p>
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
}
