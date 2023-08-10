import { useEffect, useMemo, useState } from 'react';
import { Article as ArticleType } from '../../models/article';
import { axiosClient } from '../../config/axiosConfig';
import Loading from '../Loading';
import Article from '../Article/Article';
import { Pagination } from 'antd';

interface IProps {
  username: string;
}

const FavoritedArticles = ({ username }: IProps) => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlePerPage = 5;

  const offset = useMemo(() => {
    return articlePerPage * (currentPage - 1);
  }, [currentPage]);

  function getArticles() {
    setIsLoading(true);
    axiosClient
      .get(
        `articles?favorited=${username.replaceAll(
          ' ',
          '+'
        )}&limit=${articlePerPage}&offset=${offset}`
      )
      .then((res) => {
        setArticles(res.data.articles);
        setArticlesCount(res.data.articlesCount);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getArticles();
  }, [username, currentPage]);

  if (isLoading) return <Loading />;

  return (
    <div>
      {articlesCount ? (
        <>
          <div>
            {articles.map((item, index) => {
              return <Article key={index} article={item} />;
            })}
          </div>
          <Pagination
            current={currentPage}
            total={articlesCount}
            showSizeChanger={false}
            onChange={(page: number) => setCurrentPage(page)}
            pageSize={articlePerPage}
            className="text-center"
          />
        </>
      ) : (
        'No articles are here yet...'
      )}
    </div>
  );
};

export default FavoritedArticles;
