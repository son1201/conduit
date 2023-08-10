import React, { useEffect, useMemo, useState } from 'react';
import { Article as ArticleType } from '../../models/article';
import { axiosClient } from '../../config/axiosConfig';
import Article from '../Article/Article';
import Loading from '../Loading';
import { Pagination } from 'antd';

const FeedArticles = () => {
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [articlesCount, setArticlesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlePerPage = 10;

  const offset = useMemo(() => {
    return articlePerPage * (currentPage - 1);
  }, [currentPage]);

  function getArticles() {
    setIsLoading(true);
    axiosClient
      .get(`articles/feed?limit=${articlePerPage}&offset=${offset}`)
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
  }, [currentPage]);

  if (isLoading) return <Loading />;

  // 0: false
  // 1 => n: true

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
          ;
        </div>
      ) : (
        'No articles are here... yet.'
      )}
    </div>
  );
};

export default FeedArticles;
