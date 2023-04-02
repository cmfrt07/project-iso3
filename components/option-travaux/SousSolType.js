import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-travaux/SousSolType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setSousSolType } from '../../reducers/plan';
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


function SousSolType(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [cave, setCave] = useState(true);
  const [terrePlein, setTerrePlein] = useState(false);
  const [videSanitaire, setVideSanitaire] = useState(false);
  const [garage, setGarage] = useState(false)
  const user = useSelector((state) =>state.user.value.token);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleIsolationInterieureChange = (event) => {
    setCave(event.target.checked);
    setTerrePlein(false);
    setVideSanitaire(false);
    setGarage(false)
  };

  const handleIsolationExterieureChange = (event) => {
    setTerrePlein(event.target.checked);
    setCave(false);
    setVideSanitaire(false);
    setGarage(false)
  };

  const handleIDontKnowChange = (event) => {
    setVideSanitaire(event.target.checked);
    setCave(false);
    setTerrePlein(false);
    setGarage(false)
  };

  const handleGarageChange = (event) => {
    setGarage(event.target.checked);
    setCave(false);
    setTerrePlein(false);
    setVideSanitaire(false);
  };

  const handleContinue = () => {
    if(cave) {
      dispatch(setSousSolType('Cave'));
      router.push("/soussol-surface")
    }else if(terrePlein) {
      dispatch(setSousSolType('Sous-Sol'));
      router.push("/soussol-surface")
    }else if(videSanitaire) {
      dispatch(setSousSolType('Vide sanitaire'));
      router.push("/soussol-surface")
    }else if(garage) {
      dispatch(setSousSolType('Garage'));
      router.push("/soussol-surface")
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
  let selectedGarage = {}

  if(cave){
    selectedIsolationInterieure = {border: "solid 1px black"}
  }
  if(terrePlein){
    selectedIsolationExterieure = {border: "solid 1px black"}
  }
  if(videSanitaire){
    selectedIDontKnow = {border: "solid 1px black"}
  }
  if(garage){
    selectedGarage = {border: "solid 1px black"}
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
          <h2>L’isolation du sol concerne :</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedIsolationInterieure} className={styles.type} >
                <Image src="/images2/13.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Une cave</h4>
                <input className={styles.radioBtn} type="radio" value="cave" name="sousSolType" checked={cave} onChange={handleIsolationInterieureChange}/>
              </div>
            </label>
            <label>
              <div style={selectedIsolationExterieure} className={styles.type} >
                <Image src="/images2/14.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Un terre-plein</h4>
                <input className={styles.radioBtn} type="radio" value="terrePlein" name="sousSolType" checked={terrePlein} onChange={handleIsolationExterieureChange}/>
              </div>
            </label>
            <label>
            <div style={selectedIDontKnow} className={styles.type} >
              <Image src="/images2/15.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Un vide sanitaire</h4>
              <input className={styles.radioBtn} type="radio" value="videSanitaire" name="sousSolType" checked={videSanitaire} onChange={handleIDontKnowChange}/>
            </div>
          </label>
          <label>
          <div style={selectedGarage} className={styles.type} >
            <Image src="/images2/16.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Un garage</h4>
            <input className={styles.radioBtn} type="radio" value="garage" name="sousSolType" checked={garage} onChange={handleGarageChange}/>
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

export default SousSolType;