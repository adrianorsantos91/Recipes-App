import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { minPasswordLength } from '../helpers';
// import '../index.css';
import '../styles/Login.css';
import '../App.css';
import Logo from '../images/capncook.jpeg';

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
    <div className="login">
      <Form>
        <div className="container">
          <div className="container-logo">
            <img
              src={ Logo }
              alt="Cap'n Cook"
              className="logo"
            />
          </div>
          <div className="container-input">
            <input
              data-testid="email-input"
              type="email"
              placeholder="Email"
              onChange={ (event) => setEmail(event.target.value) }
              value={ email }
            />
            <input
              data-testid="password-input"
              type="password"
              placeholder="Password"
              onChange={ (event) => setPassword(event.target.value) }
              value={ password }
            />
            <button
              variant="primary"
              size="lg"
              type="button"
              className="sign-in"
              data-testid="login-submit-btn"
              disabled={ (
                password.length <= minPasswordLength) || !(validateEmail(email)) }
              onClick={ () => handleClick() }
            >
              Sign in
            </button>
          </div>
          <div className="container-footer">
            <p className="footer-login ">© 2022</p>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default Login;
