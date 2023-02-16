import React from 'react'
import styles from '../styles/Home.module.css';
import FirstPage from './FirstPage';

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <FirstPage/>
      </main>
    </div>
  );
}

export default Home;
