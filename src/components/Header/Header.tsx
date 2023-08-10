import styles from './Header.module.scss';
import { Navbar, Container, Nav, Stack, Dropdown } from 'react-bootstrap';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setUser } from '../../store/userSlice';
import { initialState as userInitialState } from '../../store/userSlice';

const Header = () => {
  const user = useSelector((store: RootState) => store.userReducer.user);
  const dispatch = useDispatch();

  const { slug } = useParams();

  const handleLogOut = () => {
    dispatch(setUser(userInitialState.user));
  };

  return (
    <Navbar expand="lg">
      <Container>
        <NavLink to="/" className={styles.conduit}>
          conduit
        </NavLink>
        <Nav className={styles.nav_menu}>
          {user.email ? (
            <Stack direction="horizontal" gap={3} className={styles.navList}>
              <Dropdown>
                <Dropdown.Toggle
                  className="bg-white text-dark border-0 p-0 py-2"
                  id="dropdown-basic"
                >
                  <img
                    className="rounded-circle me-2"
                    width={30}
                    height={30}
                    src={user.image}
                    alt=""
                  />
                  {user.username}
                </Dropdown.Toggle>

                <Dropdown.Menu className={`${styles.dropDownMenu}`}>
                  <Dropdown.Item>
                    <NavLink
                      className={({ isActive }) =>
                        isActive && !slug ? 'text-dark' : ''
                      }
                      to="/editor"
                    >
                      <i className="fa-solid fa-pen-to-square me-2"></i>
                      New Article
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? 'text-dark' : ''
                      }
                      to="/settings"
                    >
                      <i className="fa-solid fa-gear me-1"></i> Settings
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink
                      to={`/@${user.username}`}
                      className={({ isActive }) =>
                        isActive
                          ? 'd-flex align-items-center text-dark'
                          : 'd-flex align-items-center'
                      }
                    >
                      <i className="fa-solid fa-user me-2"></i> Profile
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink to="" onClick={handleLogOut}>
                      <i className="fa-solid fa-right-from-bracket me-1"></i>{' '}
                      Log out
                    </NavLink>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Stack>
          ) : (
            <Stack direction="horizontal" gap={3} className={styles.navList}>
              <NavLink
                className={({ isActive }) => (isActive ? 'text-dark' : '')}
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? 'text-dark' : '')}
                to="/login"
              >
                Sign in
              </NavLink>
              <NavLink
                className={({ isActive }) => (isActive ? 'text-dark' : '')}
                to="/register"
              >
                Sign up
              </NavLink>
            </Stack>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
