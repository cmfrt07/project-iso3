import React from 'react'
import styles from "../styles/InfosClient.module.css"

function InfosClient() {
  return (
    <>
    <main className={styles.main}>
      <h2>Comment vous appelez-vous ?</h2>
      <p>Vous bénéficierez de notre service d’assistance téléphonique <br/> et serez rappelé gratuitement afin de vous accompagner dans votre projet.</p>
      <div className={styles.gender}>
        <div className={styles.mrMs}>
          <p>Monsieur</p>
        </div>
        <div className={styles.mrMs}>
          <p>Madame</p>
        </div>
      </div>
      <div class={styles.inputBox}>
        <label>Prénom</label>
        <input placeholder= "Prénom" type="text" name="surface" min="0" max="1000" maxlength="35" required/>
      </div>
      <div class={styles.inputBox}>
        <label>Nom</label>
        <input placeholder= "Nom" type="text" name="surface" min="0" max="1000" maxlength="35" required/>
      </div>
      <div class={styles.inputBox}>
        <label>Téléphone</label>
        <input placeholder= "06 00 00 00 00" type="number" name="surface" min="0" max="1000" maxlength="35" required/>
      </div>
      <div className={styles.opposition}>
      <p>Conformément à l’article L.223-1 du C. code de la consommation, vous avez le droit de vous inscrire gratuitement sur une liste d’opposition au démarchage téléphonique afin de ne plus être recontacté par des professionnels hors contrat en cours d’exécution.</p>
      </div>
    </main>
    </>
  )
};

export default InfosClient;