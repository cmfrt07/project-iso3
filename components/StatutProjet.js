import React from 'react'
import { useState } from 'react'
import styles from '../styles/StatutProjet.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setStatutProjet } from '../reducers/plan';
import { clearAdresse } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';



function StatutProjet(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [reflexion, setReflexion] = useState(true);
  const [rechercheArtisan, setRechercheArtisan] = useState(false);
  const [vaSigner, setVaSigner] = useState(false);
  const [aDejaSigne, setADejaSigne] = useState(false)
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handlereflexionChange = (event) => {
    setReflexion(event.target.checked);
    setRechercheArtisan(false);
    setVaSigner(false);
    setADejaSigne(false)

  };

  const handlerechercheArtisanChange = (event) => {
    setRechercheArtisan(event.target.checked);
    setReflexion(false);
    setVaSigner(false);
    setADejaSigne(false)

  };

  const handlevaSignerChange = (event) => {
    setVaSigner(event.target.checked);
    setReflexion(false);
    setRechercheArtisan(false);
    setADejaSigne(false)

  };

  const handleaDejaSigneChange = (event) => {
    setADejaSigne(event.target.checked);
    setReflexion(false);
    setRechercheArtisan(false);
    setVaSigner(false);

  };

  const handleContinue = () => {
    if(reflexion) {
      dispatch(setStatutProjet("Réfléchis à ses travaux"));
      router.push("/timing-projet")
    }else if(rechercheArtisan) {
      dispatch(setStatutProjet("Recherche un artisan RGE"));
      router.push("/logement-energie")
    }else if(vaSigner) {
      dispatch(setStatutProjet('Va signer son devis'));
      router.push("/logement-energie")
    }else if(aDejaSigne) {
      dispatch(setStatutProjet('A déjà signé son devis'));
      router.push("/logement-energie")
    }
  };

  const handleRetour = () => {
    dispatch(clearAdresse())
    router.push("/travaux-adresse");
  }

  let selectedreflexion = {};
  let selectedrechercheArtisan = {}
  let selectedvaSigner = {}
  let selectedaDejaSigne = {}

  if(reflexion){
    selectedreflexion = {border: "solid 1px black"}
  }
  if(rechercheArtisan){
    selectedrechercheArtisan = {border: "solid 1px black"}
  }
  if(vaSigner){
    selectedvaSigner = {border: "solid 1px black"}
  }
  if(aDejaSigne){
    selectedaDejaSigne = {border: "solid 1px black"}
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
          <h2>Où en êtes-vous dans votre projet ?</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedreflexion} className={styles.type} >
                <Image src="/images2/21.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Je réfléchis à mes travaux</h4>
                <input className={styles.radioBtn} type="radio" value="reflexion" name="statutProjet" checked={reflexion} onChange={handlereflexionChange}/>
              </div>
            </label>
            <label>
              <div style={selectedrechercheArtisan} className={styles.type} >
                <Image src="/images2/22.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Je recherche un artisan RGE</h4>
                <input className={styles.radioBtn} type="radio" value="rechercheArtisan" name="statutProjet" checked={rechercheArtisan} onChange={handlerechercheArtisanChange}/>
              </div>
            </label>
            <label>
            <div style={selectedvaSigner} className={styles.type} >
              <Image src="/images2/23.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Je vais signer mon devis</h4>
              <input className={styles.radioBtn} type="radio" value="vaSigner" name="statutProjet" checked={vaSigner} onChange={handlevaSignerChange}/>
            </div>
          </label>
          <label>
          <div style={selectedaDejaSigne} className={styles.type} >
            <Image src="/images2/24.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>J'ai déja signé mon devis</h4>
            <input className={styles.radioBtn} type="radio" value="aDejaSigne" name="statutProjet" checked={aDejaSigne} onChange={handleaDejaSigneChange}/>
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

export default StatutProjet;