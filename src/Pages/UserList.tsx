import { useQuery, useSubscription } from '@apollo/client';
import React, { useState } from 'react';
import { GET_USERS } from '../Utils/graphql';
import { Pagination } from '../Components/Pagination'

export function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const usersPerPage = 10;
  const idOfLastUser = currentPage * usersPerPage;
  const idOfFirstUser = idOfLastUser - usersPerPage;

  const { loading, error } = useQuery(GET_USERS, {
    onCompleted(data) {
      setUsers(data.users.nodes);
      setTotalUsers(data.users.nodes.length);
    },
  });

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      <div>
        <h3>Lista de usuários</h3>

        <ul>
          {users.slice(idOfFirstUser, idOfLastUser).map((item: any) => (
            <li key={item.id}>
              <p>
                name: {item.name} email: {item.email}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Pagination usersPerPage={usersPerPage} totalUsers={totalUsers} paginate={paginate} />
      </div>
    </div>
  );
}
