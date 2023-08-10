import axios from 'axios';
import { Formik } from 'formik';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { setUser } from '../store/userSlice';
import { upperCaseFirstLetter } from '../helper/upperCaseFirstLetter';

const SignIn = () => {
  const schema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  return (
    <div className="text-center p-4">
      <h2>Sign in</h2>
      <Link to="/register">Need an account</Link>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          axios
            .post('https://api.realworld.io/api/users/login', {
              user: values,
            })
            .then((res) => {
              dispatch(setUser(res.data.user));
            })
            .catch((error) => {
              const errorMessage = error.response.data.errors;
              const key = Object.keys(errorMessage)[0];
              const value = errorMessage[key][0];
              setError(upperCaseFirstLetter(key + ' ' + value));
            });
        }}
        validationSchema={schema}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="my-3 form-group">
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name="email"
                isInvalid={props.touched.email && !!props.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.email && upperCaseFirstLetter(props.errors.email)}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="my-3 form-group">
              <Form.Control
                type="password"
                placeholder="Enter your password"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name="password"
                isInvalid={props.touched.password && !!props.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.password &&
                  upperCaseFirstLetter(props.errors.password)}
              </Form.Control.Feedback>
            </Form.Group>
            {error && <div className="text-danger mb-2">{error}</div>}
            <Button variant="success" type="submit">
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
