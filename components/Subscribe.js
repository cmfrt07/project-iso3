import React from 'react'
import styles from '../styles/Subscribe.module.css'

function Subscribe() {
  return(
    <>
      <main className={styles.main}>
        <h2>Dernière étape : créez votre compte name</h2>
        <p>Vous pourrez y retrouver tous les éléments de votre dossier et suivre chaque étape de votre projet.</p>
        <div class={styles.inputBox}>
          <label>Email</label>
          <input placeholder= "Email" type="text" name="surface" min="0" max="1000" required/>
        </div>
        <div class={styles.inputBox}>
          <label>Mot de passe</label>
          <input placeholder= "Password" type="text" name="surface" min="0" max="1000"  required/>
        </div>
        <div className={styles.checkBoxBox}>
        <input type="checkbox" name="CGV"/>
        <label>Je reconnais avoir pris connaissance de la Politique de Protection des Données <br/>et des Conditions Générales de Vente Effy Liberté que j'accepte en cliquant sur «Valider».</label>
        </div>
        <div className={styles.checkBoxBox}>
        <input type="checkbox" name="Newsletter"/>
        <label>Je M'inscris à la newsLetter</label>
        </div>
      </main>
    </>
  )
};

export default Subscribe;

