import React from 'react'
import { useState } from 'react'
import styles from '../styles/LogementConstruction.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setLogementConstruction } from '../reducers/plan';
import { clearLogementType } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';



function LogementConstruction(){
  const dispatch = useDispatch()
  const router = useRouter()
  const [lessThanTwo, setLessThanTwo] = useState(false);
  const [betweenTwoAndFifteen, setBetweenTwoAndFifteen] = useState(true);
  const [moreThanFifteen, setMoreThanFifteen] = useState(false);
  const user = useSelector((state) =>state.user.value.token);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleLessThanTwoChange = (event) => {
    setLessThanTwo(event.target.checked);
    setBetweenTwoAndFifteen(false);
    setMoreThanFifteen(false);
  };

  const handleBetweenTwoAndFifteenChange = (event) => {
    setBetweenTwoAndFifteen(event.target.checked);
    setLessThanTwo(false);
    setMoreThanFifteen(false);
  };

  const handleMoreThanFifteenChange = (event) => {
    setMoreThanFifteen(event.target.checked);
    setLessThanTwo(false);
    setBetweenTwoAndFifteen(false);
  };

  const handleContinue = () => {
    if(lessThanTwo) {
      dispatch(setLogementConstruction('- de 2 ans, non éligible'));
      router.push("/non-eligible")
    }else if(betweenTwoAndFifteen) {
      dispatch(setLogementConstruction('entre 2 et 15 ans'));
      router.push("/travaux")
    }else{
      dispatch(setLogementConstruction('+ de 15 ans'));
      router.push("/travaux")
    }
  };

  const handleRetour = () => {
    dispatch(clearLogementType())
    router.push("/logement-type")
  }

  let selectedLessThanTwo = {};
  let selectedBetweenTwoAndFifteen = {}
  let selectedMoreThanFifteen = {}
  if(lessThanTwo){
    selectedLessThanTwo = {border: "solid 1px black"}
  }
  if(betweenTwoAndFifteen){
    selectedBetweenTwoAndFifteen = {border: "solid 1px black"}
  }
  if(moreThanFifteen){
    selectedMoreThanFifteen = {border: "solid 1px black"}
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
        <p>RETOUR</p>
        </div>

          <h2>De quand date la construction du logement concerné par les travaux ?</h2>
          <p>Cela permet de nous assurer de votre éligibilité aux différentes aides.</p>
          <div className={styles.choice}>
            <label>
              <div style={selectedLessThanTwo} className={styles.type} >
                <Image src="/images2/3.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Moins de 2 ans</h4>
                <input className={styles.radioBtn} type="radio" value="lessThanTwo" name="logementConstruction" checked={lessThanTwo} onChange={handleLessThanTwoChange}/>
              </div>
            </label>
            <label>
              <div style={selectedBetweenTwoAndFifteen} className={styles.type} >
                <Image src="/images2/3.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Entre 2 ans et 15 ans</h4>
                <input className={styles.radioBtn} type="radio" value="betweenTwoAndFifteen" name="logementConstruction" checked={betweenTwoAndFifteen} onChange={handleBetweenTwoAndFifteenChange}/>
              </div>
            </label>
            <label>
            <div style={selectedMoreThanFifteen} className={styles.type} >
              <Image src="/images2/3.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Plus de 15 ans</h4>
              <input className={styles.radioBtn} type="radio" value="moreThanFifteen" name="logementConstruction" checked={moreThanFifteen} onChange={handleMoreThanFifteenChange}/>
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

export default LogementConstruction;