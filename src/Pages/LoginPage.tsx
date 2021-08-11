import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router';

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
