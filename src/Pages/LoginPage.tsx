import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { LoginResult, FormValues } from '../Utils/interfaces';
import { LOGIN_MUTATION } from '../Utils/graphql';
import { handleEmailValidation, handlePasswordValidation } from '../Validations';
import { errorStyle } from '../Utils/styles';

export function LoginPage() {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loginMutation, { loading, error }] = useMutation<LoginResult>(LOGIN_MUTATION, {
    onCompleted(data) {
      localStorage.setItem('token', data.login.token);
      history.push('/userslist');
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

          {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
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

          {errors.password && <p style={errorStyle}>{errors.password.message}</p>}
        </div>

        {error && <p style={errorStyle}>{error.message}</p>}

        <div>
          <button type='submit' disabled={loading}>
            {loading ? 'Carregando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </div>
  );
}
