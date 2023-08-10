import { useEffect, useMemo, useState } from 'react';
import { Article as ArticleType } from '../../models/article';
import { axiosClient } from '../../config/axiosConfig';
import Article from '../Article/Article';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import Loading from '../Loading';
import { Pagination } from 'antd';

const TagArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const currentTag = useSelector(
    (store: RootState) => store.tagReducer.currentTag
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlePerPage = 10;

  const offset = useMemo(() => {
    return articlePerPage * (currentPage - 1);
  }, [currentPage]);

  function getArticles() {
    setIsLoading(true);
    axiosClient
      .get(
        `articles?limit=${articlePerPage}&offset=${offset}&tag=${currentTag}`
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
    setCurrentPage(1);
  }, [currentTag]);

  useEffect(() => {
    if (!currentTag) return;
    getArticles();
  }, [currentTag, currentPage]);

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
            total={articlesCount}
            showSizeChanger={false}
            onChange={(page: number) => setCurrentPage(page)}
            pageSize={articlePerPage}
            className="text-center"
          />
        </div>
      ) : (
        'No articles are here... yet.'
      )}
    </div>
  );
};

export default TagArticles;
