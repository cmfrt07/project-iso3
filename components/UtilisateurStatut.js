import React from 'react'
import { useState } from 'react'
import styles from '../styles/UtilisateurStatut.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setUtilisateurStatut } from '../reducers/plan';
import { clearElectrique } from '../reducers/plan';
import { clearFioul } from '../reducers/plan';
import { clearGaz } from '../reducers/plan';
import { clearChauffageEnergie } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';




function UtilisateurStatut(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [proprietaireOccupant, setProprietaireOccupant] = useState(true);
  const [proprietaireResidenceSecondaire, setProprietaireResidenceSecondaire] = useState(false);
  const [proprietaireBailleur, setProprietaireBailleur] = useState(false);
  const [locataire, setLocataire] = useState(false)
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleproprietaireOccupantChange = (event) => {
    setProprietaireOccupant(event.target.checked);
    setProprietaireResidenceSecondaire(false);
    setProprietaireBailleur(false);
    setLocataire(false)
  };

  const handleproprietaireResidenceSecondaireChange = (event) => {
    setProprietaireResidenceSecondaire(event.target.checked);
    setProprietaireOccupant(false);
    setProprietaireBailleur(false);
    setLocataire(false)
  };

  const handleproprietaireBailleurChange = (event) => {
    setProprietaireBailleur(event.target.checked);
    setProprietaireOccupant(false);
    setProprietaireResidenceSecondaire(false);
    setLocataire(false)
  };

  const handlelocataireChange = (event) => {
    setLocataire(event.target.checked);
    setProprietaireOccupant(false);
    setProprietaireResidenceSecondaire(false);
    setProprietaireBailleur(false);
  };

  const handleContinue = () => {
    if(proprietaireOccupant) {
      dispatch(setUtilisateurStatut("Propriétaire occupant"));
      router.push("/codepostal-logement")
    }else if(proprietaireResidenceSecondaire) {
      dispatch(setUtilisateurStatut("Propriétaire d'une résidence secondaire"));
      router.push("/codepostal-logement")
    }else if(proprietaireBailleur) {
      dispatch(setUtilisateurStatut('Propriétaire bailleur'));
      router.push("/codepostal-logement")
    }else if(locataire) {
      dispatch(setUtilisateurStatut('Locataire'));
      router.push("/codepostal-logement")
    }
  };

  const handleRetour = () => {
    dispatch(clearElectrique())
    dispatch(clearFioul())
    dispatch(clearGaz())
    dispatch(clearChauffageEnergie())
    router.push("/logement-energie");
  }

  let selectedproprietaireOccupant = {};
  let selectedproprietaireResidenceSecondaire = {}
  let selectedproprietaireBailleur = {}
  let selectedlocataire = {}

  if(proprietaireOccupant){
    selectedproprietaireOccupant = {border: "solid 1px black"}
  }
  if(proprietaireResidenceSecondaire){
    selectedproprietaireResidenceSecondaire = {border: "solid 1px black"}
  }
  if(proprietaireBailleur){
    selectedproprietaireBailleur = {border: "solid 1px black"}
  }
  if(locataire){
    selectedlocataire = {border: "solid 1px black"}
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
          <div className={styles.stepShaded}>
            <span className={styles.stepLineShaded}></span>
            <div>
              <h4>Votre projet</h4>
              <p>Décrivez votre logement et détaillez votre projet de travaux.</p>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepLine}></span>
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
          <h2>Dans ce logement, vous êtes :</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedproprietaireOccupant} className={styles.type}>
                <Image src="/images2/44.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Propiétaire occupant</h4>
                <input className={styles.radioBtn} type="radio" value="proprietaireOccupant" name="utilisateurStatut" checked={proprietaireOccupant} onChange={handleproprietaireOccupantChange}/>
              </div>
            </label>
            <label>
              <div style={selectedproprietaireResidenceSecondaire} className={styles.type}>
                <Image src="/images2/45.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Propriétaire d'une résidence secondaire</h4>
                <input className={styles.radioBtn} type="radio" value="proprietaireResidenceSecondaire" name="utilisateurStatut" checked={proprietaireResidenceSecondaire} onChange={handleproprietaireResidenceSecondaireChange}/>
              </div>
            </label>
            <label>
            <div style={selectedproprietaireBailleur} className={styles.type}>
              <Image src="/images2/46.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Propriétaire bailleur</h4>
              <input className={styles.radioBtn} type="radio" value="proprietaireBailleur" name="utilisateurStatut" checked={proprietaireBailleur} onChange={handleproprietaireBailleurChange}/>
            </div>
          </label>
          <label>
          <div style={selectedlocataire} className={styles.type}>
            <Image src="/images2/48.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Locataire</h4>
            <input className={styles.radioBtn} type="radio" value="locataire" name="utilisateurStatut" checked={locataire} onChange={handlelocataireChange}/>
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

export default UtilisateurStatut;