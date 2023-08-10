import { useFormik } from 'formik';
import { Container } from 'react-bootstrap';
import { NewArticle } from '../models/article';
import { useState } from 'react';
import { axiosClient } from '../config/axiosConfig';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { upperCaseFirstLetter } from '../helper/upperCaseFirstLetter';

const Editor = () => {
  const validationSchema = yup.object().shape({
    title: yup.string().required().trim(),
    description: yup.string().required().trim(),
    body: yup.string().required().trim(),
  });

  const [tagInput, setTagInput] = useState('');
  const navigate = useNavigate();

  const handleChangeTags = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTagList = [...formik.values.tagList];
      tagInput && newTagList.push(tagInput);
      formik.setFieldValue('tagList', newTagList);
      setTagInput('');
    }
  };

  const deleteTag = (index: number) => {
    const newTagList = [...formik.values.tagList];
    // set lai mang da xoa vao field taglist cua formik
    newTagList.splice(index, 1);
    formik.setFieldValue('tagList', newTagList);
  };

  const initialValues: NewArticle = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  const onSubmit = (values: NewArticle) => {
    // call api de create article
    axiosClient
      .post(`articles`, {
        article: values,
      })
      .then((res) => {
        navigate(`/article/${res.data.article.slug}`);
      });
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        {/* Article title */}
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Article Title"
            {...formik.getFieldProps('title')}
          />
          <div className="text-danger">
            {formik.errors.title &&
              formik.touched.title &&
              upperCaseFirstLetter(formik.errors.title)}
          </div>
        </div>
        {/* Description */}
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="What's this article about?"
            {...formik.getFieldProps('description')}
          />
          <div className="text-danger">
            {formik.errors.description &&
              formik.touched.description &&
              upperCaseFirstLetter(formik.errors.description)}
          </div>
        </div>
        {/* Body */}
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            rows={4}
            placeholder="Write your article (in markdown)"
            {...formik.getFieldProps('body')}
          ></textarea>
          <div className="text-danger">
            {formik.errors.body &&
              formik.touched.body &&
              upperCaseFirstLetter(formik.errors.body)}
          </div>
        </div>
        {/* Tags */}
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter tags"
            onKeyDown={handleEnter}
            onChange={handleChangeTags}
            value={tagInput}
          />
        </div>
        {/* List tags */}
        <div className="mb-2 mx-auto" style={{ maxWidth: '500px' }}>
          {formik.values.tagList.map((item, index) => {
            return (
              <span
                className="rounded bg-secondary text-white px-2 py-1 d-inline-block me-2 mb-2 small"
                key={index}
              >
                <i
                  className="fa-solid fa-x fa-xs me-1"
                  role="button"
                  onClick={() => deleteTag(index)}
                ></i>
                {item}
              </span>
            );
          })}
        </div>
        {/* Submit */}
        <button type="submit" className="btn btn-success mx-auto d-block">
          Submit
        </button>
      </form>
    </Container>
  );
};

export default Editor;
