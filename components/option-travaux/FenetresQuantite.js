import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-travaux/FenetresQuantite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setFenetres } from '../../reducers/plan';
import { setNewCpt } from '../../reducers/travaux';
import { clearComblesType } from '../../reducers/plan';
import { clearComblesSurface } from '../../reducers/plan';
import { clearMursType } from '../../reducers/plan';
import { clearMursSurface } from '../../reducers/plan';
import { clearSousSolType } from '../../reducers/plan';
import { clearSousSolSurface } from '../../reducers/plan';
import { clearFenetres } from '../../reducers/plan';
import { clearTravauxType } from '../../reducers/plan';
import { clearCpt } from '../../reducers/travaux';
import { logout } from '../../reducers/user';
import { useEffect } from 'react';



function FenetresQuantite(){
  const user = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch();
  const router = useRouter();
  const [cpt, setCpt] = useState(5);
  const min = 0;
  const max = 75;
  const [loggedOrNot, setLoggedOrNot] = useState(null);


  const handleChange = event => {
    const cpt = Math.max(min, Math.min(max, Number(event.target.value)));
    setCpt(cpt);
  };
  const handleIncrement = () => {
    if (cpt < max) {
      setCpt(cpt + 1);
    }
  };
  const handleDecrement = () => {
    if (cpt > min) {
      setCpt(cpt - 1);
    }
  };


  const handleContinue = () => {
      dispatch(setFenetres(cpt));
      dispatch(setNewCpt())
      router.push("/option-travaux")
  };

  const handleRetour = () => {
    dispatch(clearCpt())
    dispatch(clearComblesType())
    dispatch(clearComblesSurface())
    dispatch(clearMursType())
    dispatch(clearMursSurface())
    dispatch(clearSousSolType())
    dispatch(clearSousSolSurface())
    dispatch(clearFenetres())
    dispatch(clearTravauxType())
    router.push("/travaux")
  }

  useEffect(() => {
    if (!user) {
      setLoggedOrNot({
        toDo: () => router.push("/login"),
        text: " Se connecter"
      });
    } else {
      setLoggedOrNot({
        toDo: () => dispatch(logout()),
        text: " Se déconnecter"
      });
    }
  }, [user]);



  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.intro}>
          <h1>name</h1>
          <span className={styles.line}></span>
          <p className={styles.displayNone}>Votre isolation de qualité : <span>estimez le prix de vos travaux en 2 minutes.*</span></p>
        </div>
        <h4><span className={styles.displayNone}>Déjà un projet avec name ?</span><span className={styles.connexion} onClick={loggedOrNot?.toDo} >{loggedOrNot?.text}</span></h4>
        </div>
        <div className={styles.mapContainer}>
      <div className={styles.mapContent}>
        <div className={styles.mapSteps}>
          <div className={styles.step}>
            <span className={styles.stepLine}></span>
            <div>
              <h4>Votre projet</h4>
              <p>Décrivez votre logement et détaillez votre projet de travaux.</p>
            </div>
          </div>
          <div className={styles.stepShaded}>
            <span className={styles.stepLineShaded}></span>
            <div>
              <h4>Vos informations</h4>
            </div>
          </div>
          <div className={styles.stepShaded}>
            <span className={styles.stepLineShaded}></span>
            <div>
              <h4>Votre éligibilité</h4>
            </div>
          </div>
        </div>
        <div className={styles.legalMention}>
          <p>* Les résultats des simulations qui peuvent être réalisées sur ce site sont indicatifs et ne constituent pas des offres. L’acceptation finale de votre demande de travaux reste soumise à la validation de leur faisabilité technique et à l’étude de votre dossier.</p>
        </div>
      </div>
      <div className={styles.tree}>


        {/*Changement de composant*/ }
        <div className={styles.mainDiv}>
        
        <div className={styles.retourBtn} onClick={() => handleRetour()}>
        <FontAwesomeIcon icon={faArrowLeft}/>
        <p>retour</p>
        </div>
          <h2>Combien de fenêtres souhaitez-vous remplacer ?</h2>
            <div className={styles.cptDiv}>
            <button onClick={handleDecrement}>-</button>
              <input type="Number" min="1" max="75" onChange={handleChange} value={cpt}/>
              <button onClick={handleIncrement}>+</button>
            </div>
          <button className={styles.continue} onClick={handleContinue}>Continuer</button>
        </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default FenetresQuantite;