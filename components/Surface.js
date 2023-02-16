import React from 'react'
import styles from '../styles/Surface.module.css';


function Surface (){
  return (
    <>
    <main className={styles.main}>
      <h2>Quelle est la surface approximative à isoler ?</h2>
      <div class={styles.inputBox}>
        <label>Surface en m²</label>
        <input type="number" name="surface" min="0" max="1000" maxlength="35" required/>
      </div>
      {/*<button className={styles.continue}>Continuer</button>*/}
      </main>
    </>
  )
};

export default Surface;