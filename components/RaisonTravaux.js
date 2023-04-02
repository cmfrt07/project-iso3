import React from 'react'
import { useState } from 'react'
import styles from '../styles/option-travaux/RaisonTravaux.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setRaisonTravaux } from '../reducers/plan';
import { clearRaisonTravaux } from '../reducers/plan';
import { clearCpt } from '../reducers/travaux';
import { logout } from '../reducers/user';
import { useEffect } from 'react';
import { clearComblesType } from '../reducers/plan';
import { clearComblesSurface } from '../reducers/plan';
import { clearMursType } from '../reducers/plan';
import { clearMursSurface } from '../reducers/plan';
import { clearSousSolType } from '../reducers/plan';
import { clearSousSolSurface } from '../reducers/plan';
import { clearFenetres } from '../reducers/plan';
import { clearTravauxType } from '../reducers/plan';



function RaisonTravaux(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [froid, setFroid] = useState(true);
  const [reduireFacture, setReduireFacture] = useState(false);
  const [ameliorerDiag, setAmeliorerDiag] = useState(false);
  const [autre, setAutre] = useState(false)
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);

  const handleFroidChange = (event) => {
    setFroid(event.target.checked);
    setReduireFacture(false);
    setAmeliorerDiag(false);
    setAutre(false)
  };

  const handleReduireFactureChange = (event) => {
    setReduireFacture(event.target.checked);
    setFroid(false);
    setAmeliorerDiag(false);
    setAutre(false)
  };

  const handleAmeliorerDiagChange = (event) => {
    setAmeliorerDiag(event.target.checked);
    setFroid(false);
    setReduireFacture(false);
    setAutre(false)
  };

  const handleAutreChange = (event) => {
    setAutre(event.target.checked);
    setFroid(false);
    setReduireFacture(false);
    setAmeliorerDiag(false);
  };

  const handleContinue = () => {
    if(froid) {
      dispatch(setRaisonTravaux("J'ai froid"));
      router.push("/travaux-adresse")
    }else if(reduireFacture) {
      dispatch(setRaisonTravaux("Je souhaite réduire ma facture"));
      router.push("/travaux-adresse")
    }else if(ameliorerDiag) {
      dispatch(setRaisonTravaux('Je veux améliorer mon diagnostic énergetique'));
      router.push("/travaux-adresse")
    }else if(autre) {
      dispatch(setRaisonTravaux('Autre'));
      router.push("/travaux-adresse")
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
    router.push("/travaux");
  }

  let selectedFroid = {};
  let selectedReduireFacture = {}
  let selectedAmeliorerDiag = {}
  let selectedAutre = {}

  if(froid){
    selectedFroid = {border: "solid 1px black"}
  }
  if(reduireFacture){
    selectedReduireFacture = {border: "solid 1px black"}
  }
  if(ameliorerDiag){
    selectedAmeliorerDiag = {border: "solid 1px black"}
  }
  if(autre){
    selectedAutre = {border: "solid 1px black"}
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
          <h2>Pourquoi souhaitez-vous faire ces travaux ?</h2>
          <p>Sélectionnez la raison principale pour ces travaux</p>
          <div className={styles.choice}>
            <label>
              <div style={selectedFroid} className={styles.type} >
                <Image src="/images2/17.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>J'ai froid dans ma maison</h4>
                <input className={styles.radioBtn} type="radio" value="froid" name="raisonTravaux" checked={froid} onChange={handleFroidChange}/>
              </div>
            </label>
            <label>
              <div style={selectedReduireFacture} className={styles.type} >
                <Image src="/images2/18.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Je veux réduire ma facture d'éléctricité</h4>
                <input className={styles.radioBtn} type="radio" value="reduireFacture" name="raisonTravaux" checked={reduireFacture} onChange={handleReduireFactureChange}/>
              </div>
            </label>
            <label>
            <div style={selectedAmeliorerDiag} className={styles.type} >
              <Image src="/images2/19.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Je veux améliorer mon diagnostic energetique</h4>
              <input className={styles.radioBtn} type="radio" value="ameliorerDiag" name="raisonTravaux" checked={ameliorerDiag} onChange={handleAmeliorerDiagChange}/>
            </div>
          </label>
          <label>
          <div style={selectedAutre} className={styles.type} >
            <Image src="/images2/20.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Autre</h4>
            <input className={styles.radioBtn} type="radio" value="autre" name="raisonTravaux" checked={autre} onChange={handleAutreChange}/>
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

export default RaisonTravaux;