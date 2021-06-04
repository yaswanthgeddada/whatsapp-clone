import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Loading from "./pages/Loading";

import { useOwnAuth } from "./context/OwnAuthContext";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const { currentUser } = useOwnAuth();

  // console.log(currentUser);

  return (
    <div>
      <Router>
        <Suspense fallback={<Loading />}>
          <Switch>
            <Route path="/" exact>
              {!currentUser ? <Redirect to="/login" /> : <Home />}
            </Route>
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact>
              {currentUser ? <Home /> : <Login />}
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
