import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../Utils/interfaces';
import {
  handleEmailValidation,
  handleNameValidation,
  handleDateValidation,
  handlePhoneValidation,
} from '../Validations';
import { ErrorComponent } from '../Components/ErrorComponent';
import { ADD_USER } from '../Utils/graphql';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { H1 } from '../Utils/styles';
import { ButtonComponent } from '../Components/ButtonComponent';

export function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const history = useHistory();

  const [addUserMutation, { loading, error }] = useMutation<User>(ADD_USER, {
    onCompleted() {
      history.push('/userslist');
    },
    onError(error) {
      return error;
    },
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    addUserMutation({
      variables: { name: data.name, email: data.email, phone: data.phone, birthDate: data.birthDate },
    });
  };

  return (
    <div>
      <div className='App'>
        <H1>Novo Usuário</H1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Nome:</label>

            <input
              type='name'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Por favor, preencha o campo do Nome',
                },
                validate: handleNameValidation,
              })}
              disabled={loading}
            />

            <ErrorComponent error={errors.name} />
          </div>

          <div>
            <label>Telefone:</label>

            <input
              type='phone'
              {...register('phone', {
                required: {
                  value: true,
                  message: 'Por favor, preencha o campo do Telefone',
                },
                validate: handlePhoneValidation,
              })}
              disabled={loading}
            />

            <ErrorComponent error={errors.phone} />
          </div>

          <div>
            <label>Data de nascimento:</label>

            <input
              type='birthDate'
              {...register('birthDate', {
                required: {
                  value: true,
                  message: 'Por favor, preencha a sua data de nascimento',
                },
                validate: handleDateValidation,
              })}
              disabled={loading}
            />

            <ErrorComponent error={errors.birthDate} />
          </div>

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
              disabled={loading}
            />

            <ErrorComponent error={errors.email} />
          </div>

          <ErrorComponent error={error} />

          <div>
            <ButtonComponent loading={loading} name={'Adicionar Usuário'} />
          </div>
        </form>
      </div>
    </div>
  );
}
