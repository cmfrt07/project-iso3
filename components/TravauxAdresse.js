import React from 'react'
import { useState } from 'react'
import styles from '../styles/option-travaux/TravauxAdresse.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import Image from 'next/image';
import { setAdresse } from '../reducers/plan';
import { clearRaisonTravaux } from '../reducers/plan';
import { logout } from '../reducers/user';





function TravauxAdresse(){

  const dispatch = useDispatch();
  const router = useRouter();
  const [location, setLocation] = useState('')
  const [suggestions, setSuggestions] = useState([]);
  const [displaySugg, setDisplaySugg] = useState(false);
  const [verifChamp, setVerifChamp] = useState("");
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);


  const handleContinue = () => {
    if(location.length < 1){
      setVerifChamp(<p style ={{fontWeight: "bold", color: "#990000", marginTop: "20px", textAlign: "center"}}>Veuillez remplir tous les champs</p>)
    }else{
      if(location.length < 5){
        return;
      }else{
        setVerifChamp("")
        dispatch(setAdresse(location));
        router.push("/statut-projet")
      }
    }
  };

  const handleRetour = () => {
    dispatch(clearRaisonTravaux())
    router.push("/raison-travaux");
  }
  useEffect (()=>{
    if(location.length >= 5){
      setDisplaySugg(true)
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${location}`)
      .then((response) => response.json())
      .then((data) => {
        setSuggestions(data.features.map(feature => feature.properties.label));
      });
    }
  },[location]);


  const handleSelectSuggestion = (suggestion) => {
    setLocation(suggestion);
    setDisplaySugg(false);
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
        <h4><span className={styles.displayNone}>Déjà un projet avec name ?</span><span className={styles.connexion} onClick={loggedOrNot?.toDo} >{loggedOrNot?.text}</span></h4>      </div>
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
          <h2>Où se situe le logement concerné par les travaux ?</h2>
            <p>Le montant de vos aides peut varier en fonction de votre localisation.</p>
            <div className={styles.cptDiv}>
              <p>Adresse:</p>
              <input type="Text" placeholder="Adresse du logement" onChange={(e) => setLocation(e.target.value)} value={location}/>
              {displaySugg && suggestions.length > 0 ? (
                <ul>
                  {suggestions.map((suggestion, index) => (
                    <li key={index} onClick={() => handleSelectSuggestion(suggestion)}>{suggestion}</li>
                  ))}
                </ul>
              ) : null}
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

export default TravauxAdresse;