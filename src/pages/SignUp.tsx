import axios from 'axios';
import { Formik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import * as yup from 'yup';

const SignUp = () => {
  const schema = yup.object().shape({
    username: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required(),
  });
  const dispatch = useDispatch();

  return (
    <div className="text-center p-4">
      <h2>Sign up</h2>
      <Link to="/login">Have an account</Link>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        onSubmit={(values, actions) => {
          axios
            .post('https://api.realworld.io/api/users', {
              user: values,
            })
            .then((res) => {
              dispatch(setUser(res.data.user));
            })
            .catch((error) => {
              const resErrors = error.response.data.errors;
              resErrors.username &&
                actions.setFieldError(
                  'username',
                  `Username ${resErrors.username}`
                );
              resErrors.email &&
                actions.setFieldError('email', `Email ${resErrors.email}`);
            });
        }}
        validationSchema={schema}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <Form.Group className="my-3 form-group">
              <Form.Control
                type="text"
                placeholder="Username"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.username}
                name="username"
                isInvalid={props.touched.username && !!props.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {props.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
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
                {props.errors.email}
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
                {props.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="success" type="submit">
              Sign up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
