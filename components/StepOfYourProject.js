import React from 'react'
import styles from "../styles/StepOfYourProject.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSheetPlastic } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

function StepOfYourProject() {
  return (
    <>
      <main className={styles.main}>
        <h2>Où en êtes-vous dans votre projet ?</h2>
        <div className={styles.choice}>
          <label>
          <div className={styles.type}>
            <input className={styles.radioBtn} type="radio" value="one" name="logement"/>
            <Image src="/images/26.png" alt="Logo" width={120} height={120}/>
            <h4>Je réfléchis à mes travaux</h4>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <input className={styles.radioBtn} type="radio" value="two" name="logement"/>
            <Image src="/images/39.png" alt="Logo" width={120} height={120}/>
            <h4>Je recherche un artisan RGE</h4>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <input className={styles.radioBtn} type="radio" value="three" name="logement"/>
            <Image src="/images/40.png" alt="Logo" width={120} height={120}/>
            <h4>Je vais signer mon devis</h4>
          </div>
          </label>
          <label>
          <div className={styles.type}>
            <input className={styles.radioBtn} type="radio" value="four" name="logement"/>
            <Image src="/images/40.png" alt="Logo" width={120} height={120}/>
            <h4>J'ai déja signé mon devis</h4>
          </div>
          </label>
        </div>
      </main>
    </>
  )
};

export default StepOfYourProject;