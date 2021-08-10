import React from 'react';
import './App.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

type FormValues = {
  email: string;
  password: string;
};

function App() {
  const [loginError, setLoginError] = React.useState<string>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoginError(undefined);
    try {
      const result = await client.mutate({
        mutation: gql`
          mutation login($email: String!, $password: String!) {
            login(data: { email: $email, password: $password }) {
              token
              user {
                id
                name
                phone
                birthDate
                email
                role
              }
            }
          }
        `,
        variables: { email: data.email, password: data.password },
      });
      localStorage.setItem('token', result.data.login.token);
    } catch (errors) {
      setLoginError(errors.message);
    }
  };

  return (
    <div className='App'>
      <h1>Bem-vindo(a) à Taqtile!</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>

          <input
            type='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Por favor, preencha o campo do email',
              },
              validate: handleEmailValidation,
            })}
          />

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Senha:</label>

          <input
            type='password'
            {...register('password', {
              required: {
                value: true,
                message: 'Por favor, preencha o campo da senha',
              },
              minLength: {
                value: 7,
                message: 'A senha precisa ter no mínimo 7 caracteres',
              },
              validate: handlePasswordValidation,
            })}
          />

          {errors.password && <p>{errors.password.message}</p>}
        </div>

        {loginError && <p>{loginError}</p>}

        <div>
          <button type='submit'>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default App;

function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function hasDigit(password: string): boolean {
  const hasDigits = password.split('').some((c) => {
    const isDigit = !isNaN(Number(c));
    return isDigit;
  });
  return hasDigits;
}

function hasLetter(password: string): boolean {
  const hasLetters = password.split('').some((c) => {
    const isLetter = isNaN(Number(c));
    return isLetter;
  });
  return hasLetters;
}

const handleEmailValidation = (email: string) => {
  if (!validateEmail(email)) {
    return 'Por favor, digite um formato válido de email';
  }
};

const handlePasswordValidation = (password: string) => {
  if (!hasDigit(password)) {
    return 'A senha precisa ter no mínimo 1 dígito';
  }
  if (!hasLetter(password)) {
    return 'A senha precisa ter no mínimo 1 letra';
  }
};

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});
