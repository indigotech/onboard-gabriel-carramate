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
      {loading && <p>Carregando...</p>}
      <div className='App'>
        <h2>Novo Usuário</h2>
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
            />

            <ErrorComponent error={errors.email} />
          </div>

          <ErrorComponent error={error} />

          <div>
            <button type='submit' disabled={false}>
              Adicionar Usuário
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
