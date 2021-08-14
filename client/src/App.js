import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { SignUp, SignIn } from './components/Auth/Auth';
import { useAuth, ProvideAuth } from './hooks/useAuth';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ProvideAuth>
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <PrivateRoute path="/">{'todolist component'}</PrivateRoute>
          </Switch>
        </div>
      </BrowserRouter>
    </ProvideAuth>
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
        ) : user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: location } }} />
        )
      }
    />
  );
}

export default App;
