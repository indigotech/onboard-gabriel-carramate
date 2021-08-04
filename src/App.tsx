import React from 'react';
import './App.css';
import { useForm, SubmitHandler } from "react-hook-form"; 

type FormValues = {
  email: string;
  password: string;
};

function App() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    
  }
  return ( 
    <div className='App'>
      <div className='Titulo'>Bem-vindo(a) à Taqtile!</div>
      <form onSubmit = {handleSubmit(onSubmit)}>
        <div>
          <label>
            Email:
          </label>
          <input type='email' {...register('email', { required: true })}/>
        </div>
        <div>
          <label> 
            Senha:
          </label>
          <input type='password' {...register('password', {
              required: true,
              validate: (password) => {
                if (!validPasswordLength(password)) {
                  return 'A senha precisa ter no mínimo 7 caracteres';
                } else if (!hasDigit(password)) {
                  return 'A senha precisa ter no mínimo 1 dígito'
                } else if (!hasLetter(password)) {
                  return 'A senha precisa ter no mínimo 1 letra'
                }
              }
            })} /> 
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div>
          <button type='submit'>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default App;

function validPasswordLength(pwd: string): boolean {
  if(pwd.length < 7) {
    return false;
  } else {
    return true;
  }
}

function hasDigit(pwd: string): boolean {

  const hasDigits = pwd.split('').some(c => {
    const isDigit = !isNaN(Number(c));
    return isDigit;
  });
  return hasDigits; 
}

function hasLetter(pwd: string): boolean {
  const hasLetters = pwd.split('').some(c => {
    const isLetter = isNaN (Number(c));
    return isLetter;
  });
  return hasLetters;
}

