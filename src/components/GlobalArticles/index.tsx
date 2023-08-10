import { useEffect, useMemo, useState } from 'react';
import { Article as ArticleType } from '../../models/article';
import { axiosClient } from '../../config/axiosConfig';
import Article from '../Article/Article';
import Loading from '../Loading';
import { Pagination } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const GlobalArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 10;
  const user = useSelector((store: RootState) => store.userReducer.user);

  // page 1: offset: 0
  // page 2: offset: 10
  // page 3: offset: 20
  // offset: articlesPerPage * (currentPage - 1)

  const offset = useMemo(() => {
    return articlesPerPage * (currentPage - 1);
  }, [currentPage]);

  function getArticles() {
    setIsLoading(true);
    axiosClient
      .get(`articles?limit=${articlesPerPage}&offset=${offset}`)
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
  }, [currentPage, user.email]);

  if (isLoading) return <Loading />;

  return (
    <div>
      {articlesCount ? (
        <div>
          {articles.map((item, index) => {
            return <Article key={index} article={item} />;
          })}
          <Pagination
            current={currentPage}
            onChange={(page: number) => setCurrentPage(page)}
            total={articlesCount}
            showSizeChanger={false}
            pageSize={articlesPerPage}
            className="text-center"
          />
        </div>
      ) : (
        'No articles are here... yet.'
      )}
    </div>
  );
};

export default GlobalArticles;
