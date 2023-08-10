import { useFormik } from 'formik';
import { Container } from 'react-bootstrap';
import { axiosClient } from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { UpdateUser } from '../models/user';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import * as yup from 'yup';
import { upperCaseFirstLetter } from '../helper/upperCaseFirstLetter';

const Settings = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store: RootState) => store.userReducer);
  const validationSchema = yup.object().shape({
    image: yup.string().required().trim(),
    username: yup.string().required().trim(),
    email: yup.string().required().trim(),
  });

  const initialValues: UpdateUser = {
    image: user.image,
    username: user.username,
    bio: user.bio || '',
    email: user.email,
    password: '',
  };

  const onSubmit = (values: any) => {
    // call api de create article
    axiosClient
      .put(`user`, {
        user: values,
      })
      .then((res) => {
        navigate(`/@${values.username}`);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <Container>
      <h2 className="text-center">Your Settings</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* URL picture */}
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="URL of profile picture"
            {...formik.getFieldProps('image')}
          />
          <div className="text-danger">
            {formik.errors.image &&
              formik.touched.image &&
              upperCaseFirstLetter(formik.errors.image)}
          </div>
        </div>
        {/* Username */}
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            {...formik.getFieldProps('username')}
          />
          <div className="text-danger">
            {formik.errors.username &&
              formik.touched.username &&
              upperCaseFirstLetter(formik.errors.username)}
          </div>
        </div>
        {/* Bio */}
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Short bio about you"
            {...formik.getFieldProps('bio')}
          ></textarea>
        </div>
        {/* Email */}
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            {...formik.getFieldProps('email')}
          />
          <div className="text-danger">
            {formik.errors.email &&
              formik.touched.email &&
              upperCaseFirstLetter(formik.errors.email)}
          </div>
        </div>
        {/* Password */}
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="New Password"
            {...formik.getFieldProps('password')}
          />
        </div>
        {/* Submit */}
        <button type="submit" className="btn btn-success mx-auto d-block">
          Update Settings
        </button>
      </form>
    </Container>
  );
};

export default Settings;
