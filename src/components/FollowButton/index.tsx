import { useState } from 'react';
import { axiosClient } from '../../config/axiosConfig';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

interface IFollowButton {
  username: string;
  following: boolean;
}

const FollowButton = ({
  username,
  following: articleFollowing,
}: IFollowButton) => {
  const [following, setFollowing] = useState<boolean>(articleFollowing);
  const [disable, setDisable] = useState<boolean>(false);
  const user = useSelector((store: RootState) => store.userReducer.user);
  const navigate = useNavigate();

  const handleFollowing = () => {
    setDisable(true);
    if (!user.email) {
      navigate('/login');
      return;
    }
    const apiFollow = following
      ? axiosClient.delete(`profiles/${username}/follow`)
      : axiosClient.post(`profiles/${username}/follow`);

    apiFollow
      .then((res) => {
        setFollowing(res.data.profile.following);
      })
      .finally(() => {
        setDisable(false);
      });
  };

  return (
    <button
      onClick={handleFollowing}
      disabled={disable}
      className={`btn ${
        following ? 'btn-secondary' : 'btn-outline-secondary'
      } btn-sm d-inline-flex align-items-center`}
    >
      <i className={`fa-solid ${following ? 'fa-minus' : 'fa-plus'} me-1`}></i>{' '}
      {following ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
