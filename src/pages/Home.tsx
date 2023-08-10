import GlobalArticles from '../components/GlobalArticles';
import Banner from '../components/Banner/Banner';
import { Col, Container, Row } from 'react-bootstrap';
import Tags from '../components/Tags/Tags';
import TagArticles from '../components/TagArticles';
import FeedArticles from '../components/FeedArticles';
import { Tabs, TabsProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { useEffect, useMemo, useState } from 'react';
import { setTag } from '../store/tagSlice';
import styles from '../styles/Home.module.scss';
import '../antd-custom/tabs.css';

const Home = () => {
  const { currentTag } = useSelector((store: RootState) => store.tagReducer);
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.userReducer);
  const [currentTab, setCurrentTab] = useState<string>('global');
  const onChange = (key: string) => {
    if (key !== 'tag') {
      dispatch(setTag(''));
    }
    setCurrentTab(key);
  };

  useEffect(() => {
    if (currentTag) setCurrentTab('tag');
  }, [currentTag]);

  const items: TabsProps['items'] = useMemo(() => {
    const tabs: TabsProps['items'] = [
      {
        key: 'global',
        label: `Global Feed`,
        children: <GlobalArticles />,
      },
      {
        key: 'tag',
        label: !!currentTag ? `#${currentTag}` : null,
        children: <TagArticles />,
      },
    ];
    if (user.email) {
      tabs.unshift({
        key: 'feed',
        label: `Your feed`,
        children: <FeedArticles />,
      });
    }

    return tabs;
  }, [user.email, currentTag]);
  return (
    <>
      <Banner />
      <Container>
        <Row className={styles.row}>
          <Col sm={9}>
            <Tabs
              activeKey={currentTab}
              items={items}
              onChange={onChange}
              className={styles.tab}
            />
          </Col>
          <Col sm={3}>
            <Tags />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
