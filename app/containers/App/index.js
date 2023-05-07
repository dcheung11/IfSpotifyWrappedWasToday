/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import StatsPage from 'containers/StatsPage';
import StartPage from 'containers/StartPage';
import NotFoundPage from 'containers/NotFoundPage';
import PlaylistPage from 'containers/PlaylistPage';

import GlobalStyle from '../../global-styles';

export default function App() {
  const Redir = () => <Redirect to="/" />;

  return (
    <div>
      <Switch>
        {/* <Route path="/" component={Redir} /> */}
        <Route exact path="/" component={StartPage} />
        <Route exact path="/playlist" component={PlaylistPage} />
        <Route exact path="/stats" component={StatsPage} />
        {/* <Route path="/nptk" component={} /> */}

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
