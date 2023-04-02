import React from 'react'
import { useState } from 'react'
import styles from '../styles/LogementEnergie.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setChauffageEnergie } from '../reducers/plan';
import { clearStatutProjet } from '../reducers/plan';
import { clearTimingProjet } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';





function LogementEnergie(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [fioul, setFioul] = useState(true);
  const [electrique, setElectrique] = useState(false);
  const [gaz, setGaz] = useState(false);
  const [charbon, setCharbon] = useState(false);
  const [bois, setBois] = useState(false);
  const [pompeAChaleur, setPompeAChaleur] = useState(false);
  const user = useSelector((state) =>state.user.value.token);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handlefioulChange = (event) => {
    setFioul(event.target.checked);
    setElectrique(false);
    setGaz(false);
    setCharbon(false)
    setBois(false)
    setPompeAChaleur(false)
  };

  const handleelectriqueChange = (event) => {
    setElectrique(event.target.checked);
    setFioul(false);
    setGaz(false);
    setCharbon(false)
    setBois(false)
    setPompeAChaleur(false)
  };

  const handlegazChange = (event) => {
    setGaz(event.target.checked);
    setFioul(false);
    setElectrique(false);
    setCharbon(false)
    setBois(false)
    setPompeAChaleur(false)
  };

  const handlecharbonChange = (event) => {
    setCharbon(event.target.checked);
    setFioul(false);
    setElectrique(false);
    setGaz(false);
    setBois(false)
    setPompeAChaleur(false)
  };

  const handleboisChange = (event) => {
    setBois(event.target.checked);
    setFioul(false);
    setElectrique(false);
    setGaz(false);
    setCharbon(false)
    setPompeAChaleur(false)
  };

  const handlepompeAChaleurChange = (event) => {
    setPompeAChaleur(event.target.checked);
    setFioul(false);
    setElectrique(false);
    setGaz(false);
    setBois(false)
    setCharbon(false)
  };

  const handleContinue = () => {
    if(fioul) {
      dispatch(setChauffageEnergie("Chauffage au fioul"));
      router.push("/fioul")
    }else if(electrique) {
      dispatch(setChauffageEnergie("Chauffage éléctrique"));
      router.push("/electrique")
    }else if(gaz) {
      dispatch(setChauffageEnergie('Chauffage au gaz'));
      router.push("/gaz")
    }else if(charbon) {
      dispatch(setChauffageEnergie('Chauffage au charbon'));
      router.push("/utilisateur-statut")
    }else if(pompeAChaleur) {
      dispatch(setChauffageEnergie('Pompe à chaleur'));
      router.push("/utilisateur-statut")
    }else if(bois) {
      dispatch(setChauffageEnergie('Chauffage au bois'));
      router.push("/utilisateur-statut")
    }
  };

  const handleRetour = () => {
    dispatch(clearStatutProjet())
    dispatch(clearTimingProjet())
    router.push("/statut-projet");
  }

  let selectedfioul = {};
  let selectedelectrique = {}
  let selectedgaz = {}
  let selectedcharbon = {}
  let selectedbois = {}
  let selectedpompeAChaleur = {}

  if(fioul){
    selectedfioul = {border: "solid 1px black"}
  }
  if(electrique){
    selectedelectrique = {border: "solid 1px black"}
  }
  if(gaz){
    selectedgaz = {border: "solid 1px black"}
  }
  if(charbon){
    selectedcharbon = {border: "solid 1px black"}
  }
  if(bois){
    selectedbois = {border: "solid 1px black"}
  }
  if(pompeAChaleur){
    selectedpompeAChaleur = {border: "solid 1px black"}
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
          <h2>Quelle est l’énergie de chauffage actuelle de votre logement ?</h2>
          <p>Si vous avez plusieurs énergies de chauffage, indiquez-nous la principale</p>
          <div className={styles.choice}>
            <label>
              <div style={selectedfioul} className={styles.type}>
                <Image src="/images2/28.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Chauffage au fioul</h4>
                <input className={styles.radioBtn} type="radio" value="fioul" name="raisonTravaux" checked={fioul} onChange={handlefioulChange}/>
              </div>
            </label>
            <label>
              <div style={selectedelectrique} className={styles.type}>
                <Image src="/images2/29.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Chauffage électrique</h4>
                <input className={styles.radioBtn} type="radio" value="electrique" name="raisonTravaux" checked={electrique} onChange={handleelectriqueChange}/>
              </div>
            </label>
            <label>
            <div style={selectedgaz} className={styles.type}>
              <Image src="/images2/30.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Chauffage au gaz</h4>
              <input className={styles.radioBtn} type="radio" value="gaz" name="raisonTravaux" checked={gaz} onChange={handlegazChange}/>
            </div>
          </label>
          <label>
          <div style={selectedcharbon} className={styles.type}>
            <Image src="/images2/32.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Chauffage au charbon</h4>
            <input className={styles.radioBtn} type="radio" value="charbon" name="raisonTravaux" checked={charbon} onChange={handlecharbonChange}/>
          </div>
        </label>
        <label>
          <div style={selectedpompeAChaleur} className={styles.type}>
            <Image src="/images2/31.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Pompe à chaleur</h4>
            <input className={styles.radioBtn} type="radio" value="pompeAChaleur" name="raisonTravaux" checked={pompeAChaleur} onChange={handlepompeAChaleurChange}/>
          </div>
        </label>
        <label>
          <div style={selectedbois} className={styles.type}>
            <Image src="/images2/34.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Chauffage au bois</h4>
            <input className={styles.radioBtn} type="radio" value="bois" name="raisonTravaux" checked={bois} onChange={handleboisChange}/>
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

export default LogementEnergie;