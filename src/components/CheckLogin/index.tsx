import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Navigate } from 'react-router-dom';

interface IProps {
  children: any;
}

const CheckLogin = ({ children }: IProps) => {
  const { user } = useSelector((store: RootState) => store.userReducer);
  return !user.email ? children : <Navigate to="/" />;
};

export default CheckLogin;
