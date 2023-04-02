import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-energie/Gaz.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setGaz } from '../../reducers/plan';
import { clearChauffageEnergie } from '../../reducers/plan';
import { logout } from '../../reducers/user';
import { useEffect } from 'react';



function Gaz(){
  const user = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch()
  const router = useRouter()
  const [chaudiereACondensation, setChaudiereACondensation] = useState(true);
  const [chaudiereClassique, setChaudiereClassique] = useState(false);
  const [radiateurAuGaz, setRadiateurAuGaz] = useState(false);
  const [poeleAuGaz, setPoeleAuGaz] = useState(false)
  const [loggedOrNot, setLoggedOrNot] = useState(null);


  const handlechaudiereACondensationChange = (event) => {
    setChaudiereACondensation(event.target.checked);
    setChaudiereClassique(false);
    setRadiateurAuGaz(false);
    setPoeleAuGaz(false)
  };

  const handlechaudiereClassiqueChange = (event) => {
    setChaudiereClassique(event.target.checked);
    setChaudiereACondensation(false);
    setRadiateurAuGaz(false);
    setPoeleAuGaz(false)
  };

  const handleradiateurAuGazChange = (event) => {
    setRadiateurAuGaz(event.target.checked);
    setChaudiereACondensation(false);
    setChaudiereClassique(false);
    setPoeleAuGaz(false)
  };

  const handlepoeleAuGazChange = (event) => {
    setPoeleAuGaz(event.target.checked);
    setChaudiereACondensation(false);
    setChaudiereClassique(false);
    setRadiateurAuGaz(false);
  };

  const handleContinue = () => {
    if(chaudiereACondensation) {
      dispatch(setGaz("Chaudière à condensation"));
      router.push("/utilisateur-statut")
    }else if(chaudiereClassique) {
      dispatch(setGaz("Chaudière classique"));
      router.push("/utilisateur-statut")
    }else if(radiateurAuGaz) {
      dispatch(setGaz('Radiateur au gaz'));
      router.push("/utilisateur-statut")
    }else if(poeleAuGaz) {
      dispatch(setGaz('Poêle au gaz'));
      router.push("/utilisateur-statut")
    }
  };

  const handleRetour = () => {
    dispatch(clearChauffageEnergie())
    router.push("/logement-energie");
  }

  let selectedchaudiereACondensation = {};
  let selectedchaudiereClassique = {}
  let selectedradiateurAuGaz = {}
  let selectedpoeleAuGaz = {}

  if(chaudiereACondensation){
    selectedchaudiereACondensation = {border: "solid 1px black"}
  }
  if(chaudiereClassique){
    selectedchaudiereClassique = {border: "solid 1px black"}
  }
  if(radiateurAuGaz){
    selectedradiateurAuGaz = {border: "solid 1px black"}
  }
  if(poeleAuGaz){
    selectedpoeleAuGaz = {border: "solid 1px black"}
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
          <h2>Quel type d'équipement au gaz est installé ?</h2>
          <p>Les chaudières installées depuis moins de 10 ans sont généralement à condensation</p>
          <div className={styles.choice}>
            <label>
              <div style={selectedchaudiereACondensation} className={styles.type}>
                <Image src="/images2/40.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Chaudière à condensation</h4>
                <input className={styles.radioBtn} type="radio" value="chaudiereACondensation" name="gaz" checked={chaudiereACondensation} onChange={handlechaudiereACondensationChange}/>
              </div>
            </label>
            <label>
              <div style={selectedchaudiereClassique} className={styles.type}>
                <Image src="/images2/41.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Chaudière classique</h4>
                <input className={styles.radioBtn} type="radio" value="chaudiereClassique" name="gaz" checked={chaudiereClassique} onChange={handlechaudiereClassiqueChange}/>
              </div>
            </label>
            <label>
            <div style={selectedradiateurAuGaz} className={styles.type}>
              <Image src="/images2/42.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Radiateur au gaz</h4>
              <input className={styles.radioBtn} type="radio" value="radiateurAuGaz" name="gaz" checked={radiateurAuGaz} onChange={handleradiateurAuGazChange}/>
            </div>
          </label>
          <label>
          <div style={selectedpoeleAuGaz} className={styles.type}>
            <Image src="/images2/43.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Poêle au gaz</h4>
            <input className={styles.radioBtn} type="radio" value="poeleAuGaz" name="gaz" checked={poeleAuGaz} onChange={handlepoeleAuGazChange}/>
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

export default Gaz;