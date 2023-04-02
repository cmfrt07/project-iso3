import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-travaux/ComblesSurface.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setSousSolSurface } from '../../reducers/plan';
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



function SousSolSurface(){

  const dispatch = useDispatch();
  const router = useRouter();
  const [cpt, setCpt] = useState('');
  const [verifChamp, setVerifChamp] = useState("")
  const min = 0;
  const max = 800;
  const user = useSelector((state) =>state.user.value.token);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleChange = event => {
    const cpt = Math.max(min, Math.min(max, Number(event.target.value)));
    setCpt(cpt);
  };


  const handleContinue = () => {
    if(cpt.length < 1){
      setVerifChamp(<p style ={{fontWeight: "bold", color: "#990000", marginTop: "20px", textAlign: "center"}}>Veuillez remplir tous les champs</p>)
    }else{
      setVerifChamp("")
      dispatch(setSousSolSurface(cpt));
      dispatch(setNewCpt())
      router.push("/option-travaux")
    }
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

        <div className={styles.retourBtn} onClick={() => handleRetour()}>
        <FontAwesomeIcon icon={faArrowLeft}/>
        <p>retour</p>
        </div>

        {/*Changement de composant*/ }
        <div className={styles.mainDiv}>
          <h2>Quelle est la surface de sol à isoler ?</h2>
            <p>L’isolation du sol concerne uniquement le rez-de-chaussée.</p>
            <div className={styles.cptDiv}>
              <p>Surface en m²</p>
              <input type="Number" min="0" max="800" onChange={handleChange} value={cpt}/>
              {verifChamp}
            </div>
          <button className={styles.continue} onClick={handleContinue}>Continuer</button>
        </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default SousSolSurface;