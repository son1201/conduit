import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Author } from '../models/author';
import FollowButton from '../components/FollowButton';
import { axiosClient } from '../config/axiosConfig';
import styles from '../styles/Profile.module.scss';
import { Container } from 'react-bootstrap';
import MyArticles from '../components/MyArticles';
import { Tabs, TabsProps } from 'antd';
import FavoritedArticles from '../components/FavoritedArticles';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Loading from '../components/Loading';

const Profile = () => {
  const param = useParams();
  const usernameParam = param.username?.slice(1, param.username.length);
  const [author, setAuthor] = useState<Author | null>(null);
  const [currentKey, setCurrentKey] = useState('myArticles');
  const user = useSelector((store: RootState) => store.userReducer.user);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isUserProfile: boolean = useMemo(() => {
    if (user.email) {
      // Neu day la profile cua user thi tra ve true
      // kiem tra userparam co trung voi username cua user k
      return usernameParam === user.username ? true : false;
      // Neu khong la profile cua user thi tra ve false
    }
    return false;
  }, [usernameParam, user.email, user.username]);

  const onChange = (key: string) => {
    setCurrentKey(key);
  };

  const items: TabsProps['items'] = [
    {
      key: 'myArticles',
      label: `My Articles`,
      children: usernameParam && <MyArticles username={usernameParam} />,
    },
    {
      key: 'favoritedArticles',
      label: `Favorited Articles`,
      children: usernameParam && <FavoritedArticles username={usernameParam} />,
    },
  ];

  function getAuthor() {
    setIsLoading(true);
    axiosClient
      .get(`profiles/${usernameParam}`)
      .then((res) => {
        setAuthor(res.data.profile);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getAuthor();
    setCurrentKey('myArticles');
  }, [usernameParam]);

  if (!author) {
    return null;
  }

  return (
    <div>
      <div className={`${styles.banner} py-4`}>
        <Container className="d-flex justify-content-center flex-column align-items-center">
          {isLoading ? (
            <Loading />
          ) : (
            <div className="text-center">
              <img src={author.image} alt="" />
              <h4>{author.username}</h4>
              <p>{author.bio}</p>
              {isUserProfile ? (
                <Link
                  to="/settings"
                  className="btn btn-outline-secondary btn-sm"
                >
                  Edit Profile Settings
                </Link>
              ) : (
                <FollowButton
                  username={author.username}
                  following={author.following}
                />
              )}
            </div>
          )}
        </Container>
      </div>

      <Container>
        <Tabs activeKey={currentKey} items={items} onChange={onChange} />
      </Container>
    </div>
  );
};

export default Profile;
