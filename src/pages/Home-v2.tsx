import { useEffect, useMemo, useState } from 'react';
import { Article as ArticleType } from '../models/article';
import axios from 'axios';
import Article from '../components/Article/Article';
import Tags from '../components/Tags/Tags';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import Banner from '../components/Banner/Banner';
import { setTag } from '../store/tagSlice';
import styles from '../styles/Home.module.scss';
import Pagination from '../components/Pagination-v2';
import Loading from '../components/Loading';
import { axiosClient } from '../config/axiosConfig';

const Home = () => {
  const state = useSelector((store: RootState) => store.tagReducer);
  const [articles, setArticles] = useState<ArticleType[]>([]);
  const [key, setKey] = useState('global');
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesCount, setArticlesCount] = useState(0);
  const articlesPerPage = 10;
  const [loading, setLoading] = useState<boolean>(false);
  const [yourFeed, setYourFeed] = useState<ArticleType[]>([]);

  const offset = useMemo(() => {
    return articlesPerPage * (currentPage - 1);
  }, [currentPage]);

  // page 1
  // currentPage = 1, offset = 0
  // currentPage = 2, offset = 10
  // currentPage = 3, offset = 20
  // offset = articlesPerPage * (currentPage - 1)

  const pagesCount = useMemo(() => {
    return Math.ceil(articlesCount / articlesPerPage);
  }, [articlesCount]);

  function getArticles() {
    setLoading(true);
    let url;
    if (state.currentTag) {
      url = `https://api.realworld.io/api/articles?tag=${state.currentTag}&limit=${articlesPerPage}&offset=${offset}`;
    } else {
      url = `https://api.realworld.io/api/articles?limit=${articlesPerPage}&offset=${offset}`;
    }

    axios
      .get(url)
      .then((res) => {
        setArticlesCount(res.data.articlesCount);
        setArticles(res.data.articles);
      })
      .catch((error) => {
        // bat loi
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function getYourFeed() {
    const res = await axiosClient.get(`articles/feed?limit=10&offset=0`);
    console.log(res);
  }

  useEffect(() => {
    getYourFeed();
  }, []);

  useEffect(() => {
    getArticles();
  }, [currentPage]);

  useEffect(() => {
    state.currentTag && setKey('tag');
    getArticles();
    setCurrentPage(1);
  }, [state.currentTag]);

  useEffect(() => {
    if (key === 'global') {
      dispatch(setTag(''));
    }
  }, [key]);

  return (
    <>
      <Banner />
      <Row className={styles.row}>
        <Col sm={8}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k: any) => setKey(k)}
            className="mb-3"
          >
            {/* Global */}
            <Tab eventKey="global" title="Global Feed">
              {loading ? (
                <Loading />
              ) : (
                <div>
                  {articles.map((item, index) => {
                    return <Article key={index} article={item} />;
                  })}
                </div>
              )}
            </Tab>
            {/* Tag */}
            {state.currentTag && (
              <Tab eventKey="tag" title={state.currentTag}>
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    {articles.map((item, index) => {
                      return <Article key={index} article={item} />;
                    })}
                  </div>
                )}
              </Tab>
            )}
          </Tabs>
          {pagesCount > 1 && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pagesCount={pagesCount}
            />
          )}
        </Col>
        <Col sm={4}>
          <Tags />
        </Col>
      </Row>
    </>
  );
};

export default Home;
