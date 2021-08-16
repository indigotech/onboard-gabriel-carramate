import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_USERS } from '../Utils/graphql';
import { Pagination } from '../Components/Pagination';
import { UserListResult } from '../Utils/interfaces';

const USERS_PER_PAGE = 10;

export function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const offset = (currentPage - 1) * 10;

  const onPageTap = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { data, loading, error } = useQuery<UserListResult>(GET_USERS, {
    variables: { offset: offset },
    onCompleted(data) {
      setTotalUsers(data.users.count);
    },
  });

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <div>
            <h3>Lista de usuários</h3>

            <ul>
              {data.users.nodes.map((item) => (
                <li key={item.id}>
                  <p>
                    name: {item.name} email: {item.email}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <Pagination usersPerPage={USERS_PER_PAGE} totalUsers={totalUsers} onPageTap={onPageTap} />
          </div>
        </>
      )}
    </div>
  );
}
