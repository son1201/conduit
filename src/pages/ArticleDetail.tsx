import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Article } from '../models/article';
import axios from 'axios';
import styles from '../styles/ArticleDetail.module.scss';
import Author from '../components/Author';
import FollowButton from '../components/FollowButton';
import FavoriteButton from '../components/FavoriteButton';
import { Container, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { Popconfirm } from 'antd';
import { axiosClient } from '../config/axiosConfig';
import { Comment as CommentType } from '../models/comment';
import Comment from '../components/Comment';
import { setComments } from '../store/commentSlice';
import PostComment from '../components/PostComment';

const ArticleDetail = () => {
  const params = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const user = useSelector((store: RootState) => store.userReducer.user);
  const navigation = useNavigate();

  const comments = useSelector(
    (store: RootState) => store.commentsReducer.comments
  );
  const dispatch = useDispatch();

  const sortedComments = useMemo(() => {
    const newComments = [...comments].sort((a: CommentType, b: CommentType) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return newComments;
  }, [comments]);

  async function getArticle() {
    const res = await axios.get(
      `https://api.realworld.io/api/articles/${params.slug}`
    );
    setArticle(res.data.article);
  }

  useEffect(() => {
    getArticle();
  }, []);

  const confirm = (e: any) => {
    // call api
    // get = read lay du lieu
    // Read, Create, Update, Delete
    // get , post  , put   , delete
    axiosClient.delete(`articles/${article?.slug}`).then(() => {
      navigation(`/`);
    });
  };
  const cancel = (e: any) => {};

  function getComments() {
    if (!article) return;
    axiosClient
      .get(`articles/${article.slug}/comments`)
      .then((res) => {
        dispatch(setComments(res.data.comments));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getComments();
  }, [article]);

  if (!article) return null;

  return (
    <div>
      <div className={`${styles.banner} py-4`}>
        <Container>
          <h3 className="text-white">{article.title}</h3>
          <Stack direction="horizontal" gap={3} className="flex-wrap">
            <div className="">
              <Author
                author={{
                  username: article.author.username,
                  image: article.author.image,
                  createdAt: article.createdAt,
                }}
              />
            </div>
            {user.username === article.author.username ? (
              <div>
                <Link
                  to={`/editor/${article.slug}`}
                  className="btn btn-outline-secondary btn-sm me-2"
                >
                  <i className="fa-solid fa-pen"></i> Edit Article
                </Link>

                <Popconfirm
                  title="Delete the task"
                  description="Are you sure to delete this task?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className="btn btn-outline-danger btn-sm">
                    <i className="fa-solid fa-trash"></i> Delete Article
                  </button>
                </Popconfirm>
              </div>
            ) : (
              <div className="">
                <FollowButton
                  username={article.author.username}
                  following={article.author.following}
                />
                <FavoriteButton
                  favorited={article.favorited}
                  favorCount={article.favoritesCount}
                  slug={article.slug}
                />
              </div>
            )}
          </Stack>
        </Container>
      </div>
      <Container>
        <div className={styles.body}>
          <p>{article.body}</p>
          <div>
            {article.tagList.map((item: any, index: any) => {
              return <button key={index}>{item}</button>;
            })}
          </div>
        </div>
        <hr />
        <div className={styles.footer}>
          <Stack
            direction="horizontal"
            gap={2}
            className={`flex-wrap justify-content-center`}
          >
            <div className="p-2">
              <Author
                author={{
                  username: article.author.username,
                  image: article.author.image,
                  createdAt: article.createdAt,
                }}
              />
            </div>
            {user.username === article.author.username ? (
              <div>
                <button className="btn btn-outline-secondary btn-sm me-2">
                  <i className="fa-solid fa-pen"></i> Edit Article
                </button>
                <button className="btn btn-outline-danger btn-sm">
                  <i className="fa-solid fa-trash"></i> Delete Article
                </button>
              </div>
            ) : (
              <div className="p-2">
                <FollowButton
                  username={article.author.username}
                  following={article.author.following}
                />
                <FavoriteButton
                  favorited={article.favorited}
                  favorCount={article.favoritesCount}
                  slug={article.slug}
                />
              </div>
            )}
          </Stack>

          {user.email ? (
            <>
              <PostComment article={article} />
              {sortedComments.map((comment: CommentType, index: number) => {
                return (
                  <Comment comment={comment} article={article} key={index} />
                );
              })}
            </>
          ) : (
            <p>
              <Link to="/login">Sign in</Link> or{' '}
              <Link to="/register">Sign up</Link> to add comments on this
              article
            </p>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ArticleDetail;
