import { useMemo } from 'react';
import styles from './Author.module.scss';
import { Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface IAuthor {
  author: {
    username: string;
    createdAt: string;
    image: string;
  };
}

const Author = ({ author }: IAuthor) => {
  const createdAt = useMemo(() => {
    const date = new Date(author.createdAt).toLocaleString('default', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    return date;
  }, [author.createdAt]);
  return (
    <div className={styles.user}>
      <Stack direction="horizontal" gap={2}>
        <Link to={`/@${author.username}`}>
          <img src={author.image} alt="" />
        </Link>

        <Stack gap={2}>
          <Link className={styles.username} to={`/@${author.username}`}>
            <div>{author.username}</div>
          </Link>
          <div className={styles.date}>{createdAt}</div>
        </Stack>
      </Stack>
    </div>
  );
};

export default Author;
