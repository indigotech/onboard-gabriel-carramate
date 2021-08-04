import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <div className='Titulo'>Bem-vindo(a) à Taqtile!</div>
      <form>
        <div>
          <label>
            Email:
            <input type='email' name='email' />
          </label>
        </div>
        <div>
          <label>
            Senha:
            <input type='password' name='password' />
          </label>
        </div>
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default App;
