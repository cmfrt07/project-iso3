import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-energie/Electrique.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setElectrique } from '../../reducers/plan';
import { clearChauffageEnergie } from '../../reducers/plan';
import { logout } from '../../reducers/user';
import { useEffect } from 'react';



function Electrique(){
  const user = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch()
  const router = useRouter()
  const [chaudiereElectrique, setChaudiereElectrique] = useState(true);
  const [plafonds, setPlafonds] = useState(false);
  const [radiateursElectriques, setRadiateursElectriques] = useState(false);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handlechaudiereElectriqueChange = (event) => {
    setChaudiereElectrique(event.target.checked);
    setPlafonds(false);
    setRadiateursElectriques(false);
  };

  const handleplafondsChange = (event) => {
    setPlafonds(event.target.checked);
    setChaudiereElectrique(false);
    setRadiateursElectriques(false);
  };

  const handleradiateursElectriquesChange = (event) => {
    setRadiateursElectriques(event.target.checked);
    setChaudiereElectrique(false);
    setPlafonds(false);
  };


  const handleContinue = () => {
    if(chaudiereElectrique) {
      dispatch(setElectrique("Chaudière à condensation"));
      router.push("/utilisateur-statut")
    }else if(plafonds) {
      dispatch(setElectrique("Chaudière classique"));
      router.push("/utilisateur-statut")
    }else if(radiateursElectriques) {
      dispatch(setElectrique('Poêle'));
      router.push("/utilisateur-statut")
    }
  };

  const handleRetour = () => {
    dispatch(clearChauffageEnergie())
    router.push("/logement-energie");
  }

  let selectedchaudiereElectrique = {};
  let selectedplafonds = {}
  let selectedradiateursElectriques = {}

  if(chaudiereElectrique){
    selectedchaudiereElectrique = {border: "solid 1px black"}
  }
  if(plafonds){
    selectedplafonds = {border: "solid 1px black"}
  }
  if(radiateursElectriques){
    selectedradiateursElectriques = {border: "solid 1px black"}
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

          <h2>Quel type d'équipement électrique est installé ?</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedchaudiereElectrique} className={styles.type}>
                <Image src="/images2/37.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Chaudière électrique</h4>
                <input className={styles.radioBtn} type="radio" value="chaudiereElectrique" name="electrique" checked={chaudiereElectrique} onChange={handlechaudiereElectriqueChange}/>
              </div>
            </label>
            <label>
              <div style={selectedplafonds} className={styles.type}>
                <Image src="/images2/38.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Plafonds ou planchers chauffants</h4>
                <input className={styles.radioBtn} type="radio" value="plafonds" name="electrique" checked={plafonds} onChange={handleplafondsChange}/>
              </div>
            </label>
            <label>
            <div style={selectedradiateursElectriques} className={styles.type}>
              <Image src="/images2/39.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Radiateurs électriques</h4>
              <input className={styles.radioBtn} type="radio" value="radiateursElectriques" name="electrique" checked={radiateursElectriques} onChange={handleradiateursElectriquesChange}/>
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

export default Electrique;