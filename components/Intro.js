import React from 'react'
import styles from '../styles/Intro.module.css';
import Image from 'next/image';


function Intro(){
  return (
    <>
      <main className={styles.main}>

          <div className={styles.introDiv}>
              <h1>Name -</h1>
              <h1>Isolation</h1>
              <div className={styles.introDivP}>
                <p>Estimation rapide</p>
          </div>
          <div className={styles.introDivP2}>
            <p>🍃- Estimez le prix de vos travaux</p>
            <p>🍃- Calculez vos aides</p>
            <p>🍃- Obtenez un devis</p>
          </div>
        </div>
        
        <div className={styles.introDiv2}>
          <Image src="/images/IntroImage.png" alt="Logo" width={1200} height={1200}/>
          </div>

      </main>
    </>
  )
};

export default Intro;