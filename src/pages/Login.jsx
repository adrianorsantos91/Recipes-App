import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { minPasswordLength } from '../helpers';
import rockGlass from '../images/rockGlass.svg';
import '../index.css';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /* const history = useHistory(); */

  function validateEmail(e) {
    const regex = /\S+@\S+\.\S+/;
    const emailValidation = regex.test(e);
    return emailValidation;
  }

  return (
    <>
      <span className="logo">TRYBE</span>
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
      >
        Glass
      </object>

      <div className="form-container">

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              data-testid="email-input"
              type="email"
              placeholder="Enter email"
              onChange={ (event) => setEmail(event.target.value) }
              value={ email }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
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
            type="button"
            data-testid="login-submit-btn"
            disabled={ (password.length < minPasswordLength) || !(validateEmail(email)) }

          >
            Login
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Login;
/*  <div className="meals">

  </div> */
