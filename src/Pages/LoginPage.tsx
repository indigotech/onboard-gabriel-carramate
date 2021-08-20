import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router';
import { LoginResult, FormValues } from '../Utils/interfaces';
import { LOGIN_MUTATION } from '../Utils/graphql';
import { handleEmailValidation, handlePasswordValidation } from '../Validations';
import { ErrorComponent } from '../Components/ErrorComponent';
import { FormLabel, H1, Input } from '../Utils/styles';
import { ButtonComponent } from '../Components/ButtonComponent';

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
      <H1>Bem-vindo(a) à Taqtile!</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <FormLabel error={errors.email || error} disabled={loading}>
            Email:
          </FormLabel>
        </div>

        <div>
          <Input
            type='email'
            {...register('email', {
              required: {
                value: true,
                message: 'Por favor, preencha o campo do email',
              },
              validate: { handleEmailValidation },
            })}
            disabled={loading}
            error={errors.email || error}
          />

          <ErrorComponent error={errors.email} />
        </div>

        <div>
          <FormLabel error={errors.password || error} disabled={loading}>
            Senha:
          </FormLabel>
        </div>

        <div>
          <Input
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
            disabled={loading}
            error={errors.password || error}
          />

          <ErrorComponent error={errors.password} />
        </div>

        <ErrorComponent error={error} />

        <div>
          <ButtonComponent loading={loading} title={'Entrar'} />
        </div>
      </form>
    </div>
  );
}
