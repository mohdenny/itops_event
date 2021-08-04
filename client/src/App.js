import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

const App = () => {
  return (
    <Fragment>
      <Navbar />
    </Fragment>
  );
}

export default App;
