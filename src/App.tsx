import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
<<<<<<< HEAD
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
=======
import { HomePage } from './Pages/HomePage';
import { LoginPage } from './Pages/LoginPage';
>>>>>>> bf91aba... create navigation between pages

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <LoginPage />
        </Route>
        <Route path='/home'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  )
}
