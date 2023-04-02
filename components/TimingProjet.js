import React from 'react'
import { useState } from 'react'
import styles from '../styles/TimingProjet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setTimingProjet } from '../reducers/plan';
import { clearStatutProjet } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';




function TimingProjet(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [plusTotPossible, setPlusTotPossible] = useState(true);
  const [sixProchainsMois, setSixProchainsMois] = useState(false);
  const [plusTard, setPlusTard] = useState(false);
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);



  const handleplusTotPossibleChange = (event) => {
    setPlusTotPossible(event.target.checked);
    setSixProchainsMois(false);
    setPlusTard(false);
  };

  const handlesixProchainsMoisChange = (event) => {
    setSixProchainsMois(event.target.checked);
    setPlusTotPossible(false);
    setPlusTard(false);
  };

  const handleplusTardChange = (event) => {
    setPlusTard(event.target.checked);
    setPlusTotPossible(false);
    setSixProchainsMois(false);
  };



  const handleContinue = () => {
    if(plusTotPossible) {
      dispatch(setTimingProjet("Le plus tôt possible"));
      router.push("/logement-energie")
    }else if(sixProchainsMois) {
      dispatch(setTimingProjet("Dans les 6 prochains mois"));
      router.push("/logement-energie")
    }else if(plusTard) {
      dispatch(setTimingProjet('Plus tard / Je ne sait pas'));
      router.push("/logement-energie")
    }
  };

  const handleRetour = () => {
    dispatch(clearStatutProjet())
    router.push("/statut-projet");
  }

  let selectedplusTotPossible = {};
  let selectedsixProchainsMois = {}
  let selectedplusTard = {}


  if(plusTotPossible){
    selectedplusTotPossible = {border: "solid 1px black"}
  }
  if(sixProchainsMois){
    selectedsixProchainsMois = {border: "solid 1px black"}
  }
  if(plusTard){
    selectedplusTard = {border: "solid 1px black"}
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
          <h2>Quand souhaitez-vous démarrer vos travaux ?</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedplusTotPossible} className={styles.type}>
                <Image src="/images2/25.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Le plus tôt possible</h4>
                <input className={styles.radioBtn} type="radio" value="plusTotPossible" name="statutProjet" checked={plusTotPossible} onChange={handleplusTotPossibleChange}/>
              </div>
            </label>
            <label>
              <div style={selectedsixProchainsMois} className={styles.type}>
                <Image src="/images2/26.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Dans les 6 prochains mois</h4>
                <input className={styles.radioBtn} type="radio" value="sixProchainsMois" name="statutProjet" checked={sixProchainsMois} onChange={handlesixProchainsMoisChange}/>
              </div>
            </label>
            <label>
            <div style={selectedplusTard} className={styles.type}>
              <Image src="/images2/12.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Plus tard / Je ne sais pas</h4>
              <input className={styles.radioBtn} type="radio" value="plusTard" name="statutProjet" checked={plusTard} onChange={handleplusTardChange}/>
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

export default TimingProjet;