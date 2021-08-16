import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from '../Utils/interfaces';
import { handleEmailValidation, handleNameValidation, handleDateValidation, handlePhoneValidation } from '../Validations';

export function AddUser() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };

  return (
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

          {errors.name && <p>{errors.name.message}</p>}
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

          {errors.phone && <p>{errors.phone.message}</p>}
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

          {errors.birthDate && <p>{errors.birthDate.message}</p>}
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

          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <button type='submit' disabled={false}>
            Adicionar Usuário
          </button>
        </div>
      </form>
    </div>
  );
}
