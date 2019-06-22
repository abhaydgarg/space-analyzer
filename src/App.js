/**
 * First component loaded after index.js. The purpose of this file
 * is to setup Redux or any other non-visual "global" modules.
 */
import { Component } from 'react';

import 'normalize.css/normalize.css';
import './styles/animate.css';
import './styles/App.scss';

import RootContainer from './RootContainer';
import NoFileReader from './Components/NoFileReader';

export default class App extends Component {
  render () {
    if (window.FileReader === undefined) {
      return <NoFileReader />;
    }
    return <RootContainer />;
  }
}
