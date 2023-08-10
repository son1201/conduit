import { useFormik } from 'formik';
import { axiosClient } from '../../config/axiosConfig';
import { useState } from 'react';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from '../../store/commentSlice';
import { Article } from '../../models/article';

interface IPostComment {
  article: Article;
}

const PostComment = ({ article }: IPostComment) => {
  const [disablePost, setDisablePost] = useState<boolean>(false);
  const user = useSelector((store: RootState) => store.userReducer.user);
  const comments = useSelector(
    (store: RootState) => store.commentsReducer.comments
  );
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    onSubmit: (values) => {
      // console.log(values);
      if (!article) return;
      setDisablePost(true);
      axiosClient
        .post(`articles/${article.slug}/comments`, {
          comment: {
            body: values.comment,
          },
        })
        .then((res) => {
          const newComments = [...comments];
          newComments.push(res.data.comment);
          dispatch(setComments(newComments));
          formik.setFieldValue('comment', '');
        })
        .finally(() => {
          setDisablePost(false);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mb-5">
      <textarea
        {...formik.getFieldProps('comment')}
        placeholder="Write a comment..."
        className="w-100 form-control rounded-top"
        rows={4}
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          maxWidth: '100%',
        }}
      ></textarea>
      <div
        className="d-flex justify-content-between p-3 mb-2 rounded-bottom"
        style={{ background: '#f5f5f5', border: '1px solid #e5e5e5' }}
      >
        <img
          src={user.image}
          className="rounded-circle"
          width={30}
          height={30}
        />
        <button
          type="submit"
          className="btn btn-success btn-sm"
          disabled={disablePost}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default PostComment;
