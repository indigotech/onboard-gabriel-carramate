import React from 'react';

const list = [
  {
    id: 0,
    username: 'Gabriel',
    useremail: 'gabriel.carramate@taqtile.com.br',
  },
  {
    id: 1,
    username: 'admin',
    useremail: 'admin@taqtile.com.br',
  },
  {
    id: 2,
    username: 'Teste',
    useremail: 'teste@taqtile.com.br',
  },
];

export function HomePage() {
  return (
    <ul>
      <h3>Lista de usuários</h3>
    {list.map(item => (
      <li key={item.id}>
        <div>name: {item.username} email: {item.useremail}</div>
      </li>
    ))}
  </ul>
  );
}
