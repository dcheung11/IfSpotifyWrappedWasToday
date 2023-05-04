/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import StartPage from '../StartPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PlaylistPage from 'containers/PlaylistPage/Loadable';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/home" component={StartPage} />

        <Route exact path="/stats" component={HomePage} />
        <Route exact path="/playlist" component={PlaylistPage} />

        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
