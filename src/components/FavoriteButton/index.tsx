import { useState } from 'react';
import { axiosClient } from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface IFavorCount {
  favorCount: number;
  favorited: boolean;
  slug: string;
}

const FavoriteButton = ({
  favorCount,
  favorited: articleFav,
  slug,
}: IFavorCount) => {
  const [favorited, setFavorited] = useState<boolean>(articleFav);
  const [favoritesCount, setFavoritesCount] = useState<number>(favorCount);
  const [disable, setDisable] = useState<boolean>(false);
  const user = useSelector((store: RootState) => store.userReducer.user);
  const navigate = useNavigate();

  const handleFavor = () => {
    setDisable(true);
    if (!user.email) {
      navigate('/login');
      return;
    }

    const apiFav = favorited
      ? axiosClient.delete(`articles/${slug}/favorite`)
      : axiosClient.post(`articles/${slug}/favorite`);
    apiFav
      .then((res) => {
        setFavorited(res.data.article.favorited);
        setFavoritesCount(res.data.article.favoritesCount);
      })
      .finally(() => {
        setDisable(false);
      });
  };

  return (
    <button
      className={`btn ${
        favorited ? 'btn-success' : 'btn-outline-success'
      } btn-sm ms-3`}
      onClick={handleFavor}
      disabled={disable}
    >
      <i className="fa-regular fa-heart"></i>
      <span className="ms-1">{favoritesCount}</span>
    </button>
  );
};

export default FavoriteButton;
