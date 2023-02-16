import React from 'react'
import styles from '../styles/ConstructionDate.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';


function ConstructionDate(){
  return (
    <>
      <main className={styles.main}>
        <h2>De quand date la construction du logement concerné par les travaux ?</h2>
        <p>Cela permet de nous assurer de votre éligibilité aux différentes aides.</p>
        <div className={styles.choice}>
          <label>
          <div className={styles.type}>
            <Image src="/images/45.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Moins de 2 ans</h4>
            <input className={styles.radioBtn} type="radio" value="twoYears" name="constructionDate"/>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <Image src="/images/45.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Entre 2 et 15 ans</h4>
            <input className={styles.radioBtn} type="radio" value="twoAndFifteenYears" name="constructionDate"/>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <Image src="/images/45.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Plus de 15 ans</h4>
            <input className={styles.radioBtn} type="radio" value="moreThandFifteen" name="constructionDate"/>
          </div>
          </label>
        </div>
        {/*<button className={styles.continue}>Continuer</button>*/}
      </main>
    </>
  )
};

export default ConstructionDate;