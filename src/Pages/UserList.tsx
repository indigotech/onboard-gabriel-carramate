import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_USERS } from '../Utils/graphql';
import { Pagination } from '../Components/Pagination';
import { UserListResult } from '../Utils/interfaces';
import { Fab } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { H1, List } from '../Utils/styles';

const USERS_PER_PAGE = 10;

export function UserList() {
  const [currentPage, setCurrentPage] = useState(1);
  const history = useHistory();
  const offset = (currentPage - 1) * USERS_PER_PAGE;

  const onPageTap = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const { data, loading, error } = useQuery<UserListResult>(GET_USERS, {
    variables: { offset: offset },
  });

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <>
          <div>
            <H1>Lista de usuários</H1>

            <ul>
              {data.users.nodes.map((item) => (
                <li key={item.id}>
                  <List>
                    name: <Link to={'/userdetails/' + item.id} style={{textDecoration: 'none'}}>{item.name}</Link> email: {' ' + item.email}
                  </List>
                </li>
              ))}
            </ul>
          </div>

          <Fab
            style={{ marginBottom: '10px', marginLeft: '20px', fontSize: '10px', backgroundColor: 'indigo', color: 'white' }}
            onClick={() => {
              history.push('./adduser');
            }}
          >
            Novo Usuário
          </Fab>

          <div>
            <Pagination usersPerPage={USERS_PER_PAGE} totalUsers={data.users.count} onPageTap={onPageTap} />
          </div>
        </>
      )}
    </div>
  );
}
