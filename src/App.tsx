import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/Layout';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import CheckLogin from './components/CheckLogin';
import ProtectRoute from './components/ProtectRoute';
import Settings from './pages/Settings';
import Editor from './pages/Editor';
import ArticleDetail from './pages/ArticleDetail';
import Profile from './pages/Profile';
import EditArticle from './pages/EditArticle';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'register',
        element: (
          <CheckLogin>
            <SignUp />
          </CheckLogin>
        ),
      },
      {
        path: 'login',
        element: (
          <CheckLogin>
            <SignIn />
          </CheckLogin>
        ),
      },
      {
        path: 'settings',
        element: (
          <ProtectRoute>
            <Settings />
          </ProtectRoute>
        ),
      },
      {
        path: 'editor',
        element: (
          <ProtectRoute>
            <Editor />
          </ProtectRoute>
        ),
      },
      {
        path: 'article/:slug',
        element: <ArticleDetail />,
      },
      {
        path: '/:username',
        element: <Profile />,
      },
      {
        path: 'editor/:slug',
        element: (
          <ProtectRoute>
            <EditArticle />
          </ProtectRoute>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
