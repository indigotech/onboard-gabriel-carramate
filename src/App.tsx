import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Bem-vindo(a) à Taqtile!</h1>
      <form>
        <div>
          <label>Email:</label>
          <input type='email' name='email' />
        </div>
        <div>
          <label>Senha:</label>
          <input type='password' name='password' />
        </div>
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
