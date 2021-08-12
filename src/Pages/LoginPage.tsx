import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { handleEmailValidation, handlePasswordValidation } from '../Validations';

type FormValues = {
  email: string;
  password: string;
};

interface LoginResult {
  login: {
    token: string;
    user: {
      id: string;
      name: string;
      phone: string;
      birthDate: string;
      email: string;
      role: string;
    };
  };
}

export function LoginPage() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const LOGIN_MUTATION = gql`
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
  `;

  const [loginMutation, { loading, error }] = useMutation<LoginResult>(LOGIN_MUTATION, {
    onCompleted(data) {
      localStorage.setItem('token', data.login.token);
      history.push('/home');
    },
    onError(error) {
      return error;
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    loginMutation({ variables: { email: data.email, password: data.password } });
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

        {error && <p>{error.message}</p>}

        <div>
          <button type='submit' disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
