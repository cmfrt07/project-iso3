import '../styles/globals.css';
import Head from 'next/head';

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';


function App({ Component, pageProps }) {
  return (
    <>
        <Head>
          <title>Projet Isolation</title>
        </Head>
        <Component {...pageProps} />
    </>
  );
}

export default App;
