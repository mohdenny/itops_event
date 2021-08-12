import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

// Redux
import { Provider } from 'react-redux';
import store from './store';
// import setAuthToken from './utils/setAuthToken';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;