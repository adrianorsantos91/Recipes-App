import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { minPasswordLength } from '../helpers';
// import '../index.css';
import '../styles/Login.css';
import '../App.css';
/* import '../images/capncook.jpeg'; */

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
      <img
        src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fsteemkr.com%2Fbreaking%2F%40saiyanzrage%2Fbreaking-bad-spin-off-called-cap-n-cook&psig=AOvVaw37YoEfsdF7CQgPg638HKBS&ust=1649516273889000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCMCuuY_dhPcCFQAAAAAdAAAAABAD"
        alt="Cap'n Cook"
        className="logo"
      />
      <Form>
        <div className="login-page-content">
          <div className="container">
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
              data-testid="login-submit-btn"
              disabled={ (
                password.length <= minPasswordLength) || !(validateEmail(email)) }
              onClick={ () => handleClick() }

            >
              Sign in
            </button>
          </div>
          <p className="footer">© 2022</p>
        </div>
      </Form>
    </div>
  );
}

export default Login;
