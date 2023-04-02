import React from 'react'
import { useState } from 'react'
import styles from '../styles/LogementType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setLogementType } from '../reducers/plan';
import { clearLogementType } from '../reducers/plan';
import { clearCpt } from '../reducers/travaux';
import { logout } from '../reducers/user';
import { useEffect } from 'react';
import { clearAllPlan } from '../reducers/plan';



function LogementType(){
  const dispatch = useDispatch()
  const router = useRouter()
  const [isHouse, setIsHouse] = useState(true);
  const [isApartment, setIsApartment] = useState(false);
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleHouseChange = (event) => {
    setIsHouse(event.target.checked);
    setIsApartment(false);
  };

  const handleApartmentChange = (event) => {
    setIsApartment(event.target.checked);
    setIsHouse(false);
  };

  const handleContinue = () => {
    dispatch(clearAllPlan())
    dispatch(clearCpt());
    if(isHouse) {
      dispatch(setLogementType('maison'));
      router.push("/logement-construction")
    }else if(isApartment) {
      dispatch(setLogementType('appartement'));
      router.push("/logement-construction")
    }
  };

  const handleRetour = () => {
    dispatch(clearLogementType())
    router.push("/");
  }

  let selectedHouse = {};
  let selectedApartment = {}
  if(isHouse){
    selectedHouse = {border: "solid 1px black"}
  }
  if(isApartment){
    selectedApartment = {border: "solid 1px black"}
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
          <h2>Calculez vos aides et obtenez un devis pour votre <span style={{color: "#0070f3"}}>isolation*</span></h2>
          <span className={styles.subLine}></span>
          <h2>Votre projet concerne :</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedHouse} className={styles.type} >
                <Image src="/images2/1.png" alt="Logo" width={"90%"} height={"90%"} />
                <h4>Une maison</h4>
                <input className={styles.radioBtn} type="radio" value="house" name="logementType" checked={isHouse} onChange={handleHouseChange}/>
              </div>
            </label>
            <label>
              <div style={selectedApartment} className={styles.type} >
                <Image src="/images2/2.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Un appartement</h4>
                <input className={styles.radioBtn} type="radio" value="apartment" name="logementType" checked={isApartment} onChange={handleApartmentChange}/>
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

export default LogementType;