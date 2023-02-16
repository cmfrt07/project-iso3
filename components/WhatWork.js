import React from 'react'
import styles from '../styles/WhatWork.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCity } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image';


function WhatWork(){
  return (
    <>
      <main className={styles.main}>
        <h2>Quels travaux d’isolation souhaitez-vous réaliser ?</h2>
        <p>Sélectionnez jusqu’à 2 éléments</p>
        <div className={styles.choice}>
          <label>
          <div className={styles.type}>
            <Image src="/images/01.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Isolation des combles</h4>
            <input className={styles.checkboxBtn} type="checkbox" value="twoYears" name="whatWork"/>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <Image src="/images/06.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Isolation des murs</h4>
            <input className={styles.checkboxBtn} type="checkbox" value="twoAndFifteenYears" name="whatWork"/>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <Image src="/images/37.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Isolation du sou-sol/garage</h4>
            <input className={styles.checkboxBtn} type="checkbox" value="moreThandFifteen" name="whatWork"/>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <Image src="/images/32.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Fenêtres/Porte-fenêtres</h4>
            <input className={styles.checkboxBtn} type="checkbox" value="moreThandFifteen" name="whatWork"/>
          </div>
          </label>
        </div>
        {/*<button className={styles.continue}>Continuer</button>*/}
      </main>
    </>
  )
};

export default WhatWork;