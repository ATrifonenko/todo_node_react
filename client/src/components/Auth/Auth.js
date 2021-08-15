import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

function Auth(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [patronymic, setPatronymic] = useState('');
  const [errors, setErrors] = useState({});

  let history = useHistory();

  const submit = (e) => {
    e.preventDefault();
    const validationErrors = validate(email, password);

    if (Object.entries(validationErrors).length === 0) {
      setErrors({});
      props.submit(email, password, firstName, secondName, patronymic).then(() => history.replace('/'));
    } else {
      setErrors(validationErrors);
    }
  };

  const validate = (email, password) => {
    const validationErrors = {};
    if (
      !email ||
      !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        email
      )
    ) {
      validationErrors.email = 'Не валидный e-mail';
    }
    if (!password || !/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/.test(password)) {
      validationErrors.password =
        'Пароль должен содержать не менее восьми знаков, включать заглавные и строчные буквы, цифры';
    }
    return validationErrors;
  };

  const username = (
    <>
      <Form.Group className="mb-3" controlId="formSecondName">
        <Form.Label>Фамилия</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Иванов"
          onChange={(e) => setSecondName(e.target.value)}
          value={secondName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formFirstName">
        <Form.Label>Имя</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Иван"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPatronymic">
        <Form.Label>Отчество</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Иванович"
          onChange={(e) => setPatronymic(e.target.value)}
          value={patronymic}
        />
      </Form.Group>
    </>
  );

  return (
    <div className="container">
      <h2 className="auth-box__title">{props.type === 'signin' ? 'Вход' : 'Регистрация'}</h2>
      <Form noValidate className="auth-box" onSubmit={submit}>
        {props.type === 'signup' && username}
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email адрес</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="email@example.com"
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((err) => ({ ...err, email: false }));
            }}
            value={email}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="********"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((err) => ({ ...err, password: false }));
            }}
            value={password}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="primary" type="submit">
            {props.type === 'signin' ? 'Войти' : 'Зарегистироваться'}
          </Button>
        </div>
        <span className="auth-box__question">
          <Link className="auth-box__question-link" to={props.type === 'signin' ? '/signup' : '/signin'}>
            {props.type === 'signin' ? 'Зарегистрироваться' : 'Войти'}
          </Link>
        </span>
      </Form>
    </div>
  );
}

export function SignIn() {
  let auth = useAuth();
  return <Auth type="signin" submit={auth.signIn} />;
}

export function SignUp() {
  let auth = useAuth();
  return <Auth type="signup" submit={auth.signUp} />;
}
