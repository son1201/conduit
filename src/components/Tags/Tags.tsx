import { useEffect, useState } from 'react';
import styles from './Tags.module.scss';
import { useDispatch } from 'react-redux';
import { setTag } from '../../store/tagSlice';
import { axiosClient } from '../../config/axiosConfig';

const Tags = () => {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  function getTags() {
    setIsLoading(true);
    axiosClient
      .get(`tags`) // 3s
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getTags();
  }, []);

  const handleClick = (item: string) => {
    dispatch(setTag(item));
  };

  if (isLoading) return null;

  return (
    <div className={styles.tags}>
      <p>Popular Tags</p>
      {tags.map((item, index) => {
        return (
          <button
            className={styles.tagsButton}
            onClick={() => handleClick(item)}
            key={index}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Tags;
