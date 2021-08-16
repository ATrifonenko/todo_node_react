import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { SignUp, SignIn } from './components/Auth/Auth';
import { useAuth } from './hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import api from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Todolist from './components/Todolist/Todolist';

function App() {
  const history = useHistory();

  const handleLogout = async () => {
    await api.auth.logout();
    history.replace('/signin');
  };

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <PrivateRoute path="/">
          <Todolist logoutBtn={handleLogout}></Todolist>
        </PrivateRoute>
      </Switch>
    </div>
  );
}

function PrivateRoute({ children, ...rest }) {
  const { user, isAuthenticating } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticating ? (
          <div className="wrapper-spinner">
            <Spinner animation="border" />
          </div>
        ) : user.logged ? (
          children
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: location } }} />
        )
      }
    />
  );
}

export default App;
