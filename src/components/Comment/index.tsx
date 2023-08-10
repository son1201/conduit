import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store';
import { useCallback, useState } from 'react';
import { axiosClient } from '../../config/axiosConfig';
import { Comment as CommentType } from '../../models/comment';
import { Article } from '../../models/article';
import { setComments } from '../../store/commentSlice';

interface IComment {
  comment: CommentType;
  article: Article;
}

const Comment = ({ comment, article }: IComment) => {
  const [disableDelete, setDisableDelete] = useState<boolean>(false);
  const user = useSelector((store: RootState) => store.userReducer.user);
  const comments = useSelector(
    (store: RootState) => store.commentsReducer.comments
  );
  const dispatch = useDispatch();

  const formatDate = useCallback(
    (createdAt: string) => {
      const date = new Date(createdAt).toLocaleString('default', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return date;
    },
    [comment]
  );

  const handleDelete = (id: number) => {
    if (!article) return;
    setDisableDelete(true);
    axiosClient
      .delete(`articles/${article.slug}/comments/${id}`)
      .then((res) => {
        const index = comments.findIndex(
          (comment: CommentType) => comment.id === id
        );
        const newComments = [...comments];
        newComments.splice(index, 1);
        dispatch(setComments(newComments));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setDisableDelete(false);
      });
  };

  /*
    cm 1 - id 0
    cm 2 - id 1
    cm 3 - id 2
    cm 4 - id 3
    // cm 5 - id 4
    cm 6 - id 5 ^ => id 4
  */

  return (
    <div key={comment.id} className="mb-4">
      <div className="rounded-top p-3" style={{ border: '1px solid #e5e5e5' }}>
        {comment.body}
      </div>
      <div
        className="d-flex flex-wrap justify-content-between p-2 mb-2 rounded-bottom"
        style={{
          background: '#f5f5f5',
          border: '1px solid #e5e5e5',
        }}
      >
        <div className="my-1">
          <Link to={`/@${comment.author.username}`}>
            <img
              src={comment.author.image}
              className="rounded-circle me-2"
              width={30}
              height={30}
            />
            <span className="me-2">{comment.author.username}</span>
          </Link>
          <span className="text-secondary small">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        {user.username === comment.author.username ? (
          <button
            type="submit"
            className="btn btn-danger btn-sm my-1"
            onClick={() => handleDelete(comment.id)}
            disabled={disableDelete}
          >
            Delete Comment
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
