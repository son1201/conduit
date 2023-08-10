import React, { useState } from 'react';
import styles from './Article.module.scss';
import { Article as ArticleType } from '../../models/article';
import { Stack } from 'react-bootstrap';
import Author from '../Author';
import { Link, useNavigate } from 'react-router-dom';
import { axiosClient } from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface IArticle {
  article: ArticleType;
}

const Article = ({ article }: IArticle) => {
  const author = {
    username: article.author.username,
    createdAt: article.createdAt,
    image: article.author.image,
  };

  const user = useSelector((store: RootState) => store.userReducer.user);
  const navigation = useNavigate();
  const [favorited, setFavorited] = useState<boolean>(article.favorited);
  const [favoritesCount, setFavoritesCount] = useState<number>(
    article.favoritesCount
  );
  const [disable, setDisable] = useState<boolean>(false);

  const handleFavorite = () => {
    setDisable(true);
    if (user.email) {
      const favApi = favorited
        ? axiosClient.delete(`articles/${article.slug}/favorite`)
        : axiosClient.post(`articles/${article.slug}/favorite`);
      favApi
        .then((res) => {
          console.log(res.data);
          setFavorited(res.data.article.favorited);
          setFavoritesCount(res.data.article.favoritesCount);
        })
        .finally(() => {
          setDisable(false);
        });
    } else {
      navigation('/login');
    }
  };

  return (
    <div className={styles.article}>
      <Stack direction="horizontal" gap={2}>
        <Author author={author} />
        <button
          className={`p-2 ms-auto btn ${
            favorited ? 'btn-success' : 'btn-outline-success'
          }`}
          disabled={disable}
          onClick={handleFavorite}
        >
          {favoritesCount}
        </button>
      </Stack>

      <Link className={styles.title} to={`/article/${article.slug}`}>
        {article.title}
      </Link>
      <p className={styles.description}>{article.description}</p>

      <Stack direction="horizontal" gap={2} className={styles.articleBottom}>
        <Link to={`/article/${article.slug}`} className={styles.read_detail}>
          Read more...
        </Link>
        <div className={`${styles.tags} py-2 ms-auto`}>
          {article.tagList.map((item, index) => {
            return (
              <button className={styles.tag_button} key={index}>
                {item}
              </button>
            );
          })}
        </div>
      </Stack>
      <hr />
    </div>
  );
};

export default Article;
