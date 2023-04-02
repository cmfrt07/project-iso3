import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-travaux/MursType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setMursType } from '../../reducers/plan';
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




function MursType(){
  const user = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch()
  const router = useRouter()
  const [isolationInterieure, setIsolationInterieure] = useState(true);
  const [isolationExterieure, setIsolationExterieure] = useState(false);
  const [iDontKnow, setIDontKnow] = useState(false);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleIsolationInterieureChange = (event) => {
    setIsolationInterieure(event.target.checked);
    setIsolationExterieure(false);
    setIDontKnow(false);
  };

  const handleIsolationExterieureChange = (event) => {
    setIsolationExterieure(event.target.checked);
    setIsolationInterieure(false);
    setIDontKnow(false);
  };

  const handleIDontKnowChange = (event) => {
    setIDontKnow(event.target.checked);
    setIsolationInterieure(false);
    setIsolationExterieure(false);
  };

  const handleContinue = () => {
    if(isolationInterieure) {
      dispatch(setMursType('Isolation intérieure'));
      router.push("/murs-surface")
    }else if(isolationExterieure) {
      dispatch(setMursType('Isolation extérieure'));
      router.push("/murs-surface")
    }else if(iDontKnow){
      dispatch(setMursType('Je ne sait pas'));
      router.push("/murs-surface")
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

  let selectedIsolationInterieure = {};
  let selectedIsolationExterieure = {}
  let selectedIDontKnow = {}

  if(isolationInterieure){
    selectedIsolationInterieure = {border: "solid 1px black"}
  }
  if(isolationExterieure){
    selectedIsolationExterieure = {border: "solid 1px black"}
  }
  if(iDontKnow){
    selectedIDontKnow = {border: "solid 1px black"}
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
          <h2>De quelle façon souhaitez vous faire isoler vos murs ?</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedIsolationInterieure} className={styles.type} >
                <Image src="/images2/10.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Isolation intérieure</h4>
                <input className={styles.radioBtn} type="radio" value="isolationInterieure" name="mursType" checked={isolationInterieure} onChange={handleIsolationInterieureChange}/>
              </div>
            </label>
            <label>
              <div style={selectedIsolationExterieure} className={styles.type} >
                <Image src="/images2/11.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Isolation extérieure</h4>
                <input className={styles.radioBtn} type="radio" value="isolationExterieure" name="mursType" checked={isolationExterieure} onChange={handleIsolationExterieureChange}/>
              </div>
            </label>
            <label>
            <div style={selectedIDontKnow} className={styles.type} >
              <Image src="/images2/12.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Je ne sait pas</h4>
              <input className={styles.radioBtn} type="radio" value="iDontKnow" name="mursType" checked={iDontKnow} onChange={handleIDontKnowChange}/>
            </div>
          </label>
          </div>
          <button className={styles.continue} onClick={handleContinue}>Continuer</button>
        </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default MursType;