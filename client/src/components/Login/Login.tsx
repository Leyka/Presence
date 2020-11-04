import { AuthLayout } from '@/components/shared/layouts/AuthLayout/AuthLayout';
import { UserService } from '@/services/user.service';
import { useRootStore } from '@/store';
import { Button, FormGroup, InputGroup } from '@blueprintjs/core';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

export const Login = observer(() => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { userStore } = useRootStore();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await UserService.login({ username, password });
      userStore.setUser(user);
    } catch (err) {
      setError(err.response.data);
    }
  };

  // Redirect if already connected
  if (userStore.isConnected) {
    return <Redirect to="/attendance" />;
  }
  // Else show the login page
  return (
    <AuthLayout title="Connexion" ActionLink={<Link to="/register">S'inscrire</Link>} error={error}>
      <form onSubmit={onSubmit}>
        <FormGroup label="Nom d'utilisateur" labelFor="username">
          <InputGroup
            id="username"
            name="username"
            placeholder="Votre nom d'utilisateur"
            autoFocus
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Mot de passe" labelFor="password">
          <InputGroup
            id="password"
            name="password"
            placeholder="Votre mot de passe"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button intent="success" type="submit">
          Se connecter
        </Button>
      </form>
    </AuthLayout>
  );
});
