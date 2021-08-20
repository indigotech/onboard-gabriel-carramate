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
import { FormLabel, H1, Input } from '../Utils/styles';
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

            <FormLabel error={errors.name || error} disabled={loading}>Nome:</FormLabel>

          <div>
            <Input
              type='name'
              {...register('name', {
                required: {
                  value: true,
                  message: 'Por favor, preencha o campo do Nome',
                },
                validate: handleNameValidation,
              })}
              disabled={loading}
              error={errors.name}
            />
            <ErrorComponent error={errors.name} />
          </div>

            <FormLabel error={errors.phone || error} disabled={loading}>Telefone:</FormLabel>

          <div>
            <Input
              type='phone'
              {...register('phone', {
                required: {
                  value: true,
                  message: 'Por favor, preencha o campo do Telefone',
                },
                validate: handlePhoneValidation,
              })}
              disabled={loading}
              error={errors.phone}
            />
            <ErrorComponent error={errors.phone} />
          </div>

            <FormLabel error={errors.birthDate || error} disabled={loading}>Data de nascimento:</FormLabel>

          <div>
            <Input
              type='birthDate'
              {...register('birthDate', {
                required: {
                  value: true,
                  message: 'Por favor, preencha a sua data de nascimento',
                },
                validate: handleDateValidation,
              })}
              disabled={loading}
              error={errors.birthDate}
            />
            <ErrorComponent error={errors.birthDate} />
          </div>

          <div>
            <FormLabel error={errors.email || error} disabled={loading}>Email:</FormLabel>
          </div>

          <div>
            <Input
              type='email'
              {...register('email', {
                required: {
                  value: true,
                  message: 'Por favor, preencha o campo do email',
                },
                validate: handleEmailValidation,
              })}
              disabled={loading}
              error={errors.email}
            />
            <ErrorComponent error={errors.email} />
          </div>

          <ErrorComponent error={error} />

          <div>
            <ButtonComponent loading={loading} title={'Adicionar Usuário'} />
          </div>
        </form>
      </div>
    </div>
  );
}
