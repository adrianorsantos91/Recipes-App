import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { minPasswordLength } from '../helpers';
// import '../index.css';
import '../styles/Login.css';
import '../App.css';
import '../images/capncook.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  function validateEmail(e) {
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(e);
    return emailValidation;
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  }

  return (
    <div className="bg-white">
      <img
        src={ `/home/user/trybe-projetos/sd-018-a-project-recipes-app/
        src/images/capncook.jpeg` }
        alt="Cap'n Cook"
      />
      <Form>
        <div className="login-page-content">
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              data-testid="email-input"
              type="email"
              placeholder="Enter email"
              onChange={ (event) => setEmail(event.target.value) }
              value={ email }
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control
              data-testid="password-input"
              type="password"
              placeholder="Password"
              onChange={ (event) => setPassword(event.target.value) }
              value={ password }
            />
          </Form.Group>
          <Button
            variant="primary"
            class="btn btn-primary"
            size="lg"
            type="button"
            data-testid="login-submit-btn"
            disabled={ (password.length <= minPasswordLength) || !(validateEmail(email)) }
            onClick={ () => handleClick() }

          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Login;
