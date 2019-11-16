/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import Router from './../../routes/route';

import GlobalStyle from '../../global-styles';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

export default function App() {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
      <GlobalStyle />
    </div>
  );
}
