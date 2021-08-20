import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_USERS } from '../Utils/graphql';
import { Pagination } from '../Components/Pagination';
import { UserListResult } from '../Utils/interfaces';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CleanList, ListItem, UserListButton, LeftMarginH1, Bold } from '../Utils/styles';

const USERS_PER_PAGE = 6;

export function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const offset = (currentPage - 1) * USERS_PER_PAGE;

  const onPageTap = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { data, loading, error } = useQuery<UserListResult>(GET_USERS, {
    variables: { offset: offset, limit: USERS_PER_PAGE },
  });

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <div>
            <LeftMarginH1>Lista de usuários</LeftMarginH1>

            <ul>
              {data.users.nodes.map((item) => (
                <CleanList key={item.id}>
                  <ListItem>
                    <Bold> Nome: </Bold>{' '}
                    <Link to={'/userdetails/' + item.id} style={{ textDecoration: 'none' }}>
                      {item.name}
                    </Link>
                  </ListItem>
                  <ListItem>
                    <Bold> Email: </Bold> {' ' + item.email}
                  </ListItem>
                </CleanList>
              ))}
            </ul>
          </div>

          <UserListButton
            onClick={() => {
              history.push('./adduser');
            }}
          >
            Novo Usuário
          </UserListButton>

          <div>
            <Pagination usersPerPage={USERS_PER_PAGE} totalUsers={data.users.count} onPageTap={onPageTap} />
          </div>
        </>
      )}
    </div>
  );
}
