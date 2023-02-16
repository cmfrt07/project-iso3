import React from 'react'
import styles from '../styles/Where.module.css'

function Where() {
  return (
    <>
    <main className={styles.main}>
      <h2>Où se situe le logement concerné par les travaux ?</h2>
      <p>Le montant de vos aides peut varier en fonction de votre localisation.</p>
      <div class={styles.inputBox}>
        <label>Adresse</label>
        <input placeholder= "Ajout autocomplétion - fetch API data.gouv" type="text" name="surface" min="0" max="1000" maxlength="35" required/>
      </div>
    </main>
    </>
  )
};

export default Where;