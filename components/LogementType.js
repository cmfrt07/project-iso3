import React from 'react'
import styles from '../styles/LogementType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';


function LogementType(){
  return (
    <>
      <main className={styles.main}>
        <h3>Calculez vos aides et obtenez un devis pour votre isolation*</h3>
        <span className={styles.line}></span>
        <h2>Votre projet concerne :</h2>
        <div className={styles.choice}>
          <label>
          <div className={styles.type}>
            <Image src="/images/32.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Une maison</h4>
            <input className={styles.radioBtn} type="radio" value="house" name="logement"/>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <Image src="/images/31.png" alt="Logo" width={"100%"} height={"100%"}/>
            <h4>Un appartement</h4>
            <input className={styles.radioBtn} type="radio" value="appartment" name="logement"/>
          </div>
          </label>
        </div>
        {/*<button className={styles.continue}>Continuer</button>*/}
      </main>
    </>
  )
};

export default LogementType;