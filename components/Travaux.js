import React from 'react'
import { useState } from 'react'
import styles from '../styles/Travaux.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setTravaux } from '../reducers/travaux';
import { clearLogementConstruction } from '../reducers/plan';
import { useEffect } from 'react';
import { setTravauxType } from '../reducers/plan';
import { logout } from '../reducers/user';




function Travaux(){
  const dispatch = useDispatch()
  const router = useRouter()
  const [combles, setCombles] = useState(false);
  const [murs, setMurs] = useState(false);
  const [sousSol, setSousSol] = useState(false);
  const [fenetres, setFenetres] = useState(false);
  const [selected, setSelected] = useState([]);
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);



  const handleComblesChange = () => {
    if (selected.includes('combles')) {
      setCombles(false);
      setSelected(selected.filter((item) => item !== 'combles'));
      return;
    }
    if (selected.length >= 2) {
      return;
    }
    setCombles(true);
    setSelected([...selected, 'combles']);
  };

  const handleMursChange = () => {
    if (selected.includes('murs')) {
      setMurs(false);
      setSelected(selected.filter(item => item !== 'murs'));
      return;
    }
    if (selected.length >= 2) {
      return;
    }
    setMurs(true);
    setSelected([...selected, 'murs']);
  };

  const handleSousSolChange = () => {
    if (selected.includes('sousSol')) {
      setSousSol(false);
      setSelected(selected.filter(item => item !== 'sousSol'));
      return;
    }
    if (selected.length >= 2) {
      return;
    }
    setSousSol(true);
    setSelected([...selected, 'sousSol']);
  };
  
  const handleFenetresChange = () => {
    if (selected.includes('fenetres')) {
      setFenetres(false);
      setSelected(selected.filter(item => item !== 'fenetres'));
      return;
    }
    if (selected.length >= 2) {
      return;
    }
    setFenetres(true);
    setSelected([...selected, 'fenetres']);
  };

  let disabledCombles = false;
  let disabledMurs = false;
  let disabledSousSol = false;
  let disabledFenetres = false;
  if (selected.length === 2) {
    disabledCombles = !selected.includes('combles');
    disabledMurs = !selected.includes('murs');
    disabledSousSol = !selected.includes('sousSol');
    disabledFenetres = !selected.includes('fenetres');
  }


  const [noOption, setNoOption] = useState('')


  const handleContinue = () => {
    if(selected.length === 0){
      setNoOption('Veuillez choisir au moins une option')
      return;
    }
    dispatch(setTravaux(selected))
    if(selected.length > 0){
      dispatch(setTravauxType(selected))
      router.push("/option-travaux")
    }
  };

  const handleRetour = () => {
    dispatch(clearLogementConstruction())
    router.push("/logement-construction");
  }

  let selectedCombles = {};
  let selectedMurs = {}
  let selectedSousSol = {}
  let selectedFenetres = {}
  if(combles){
    selectedCombles = {border: "solid 1px black"}
  }
  if(murs){
    selectedMurs = {border: "solid 1px black"}
  }
  if(sousSol){
    selectedSousSol = {border: "solid 1px black"}
  }
  if(fenetres){
    selectedFenetres = {border: "solid 1px black"}
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
          <h2>Quels travaux d’isolation souhaitez-vous réaliser ?</h2>
          <p>Sélectionnez jusqu’à 2 éléments</p>

          <div className={styles.choice}>
            <label>
              <div style={selectedCombles} className={styles.type}>
                <Image src="/images2/4.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Isolation des combles</h4>
                <input className={styles.radioBtn} type="checkbox" value="combles" onChange={handleComblesChange} disabled={disabledCombles}/>
              </div>
            </label>
            <label>
              <div style={selectedMurs} className={styles.type}>
                <Image src="/images2/5.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Isolation des murs</h4>
                <input className={styles.radioBtn} type="checkbox" value="murs" onChange={handleMursChange} disabled={disabledMurs}/>
              </div>
            </label>
            <label>
            <div style={selectedSousSol} className={styles.type}>
              <Image src="/images2/6.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Isolation du sous-sol/garage</h4>
              <input className={styles.radioBtn} type="checkbox" value="sousSol" onChange={handleSousSolChange} disabled={disabledSousSol}/>
            </div>
          </label>
          <label>
          <div style={selectedFenetres} className={styles.type}>
            <Image src="/images2/6-2.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Fenêtres/Porte-fenêtres</h4>
            <input className={styles.radioBtn} type="checkbox" value="fenetres" onChange={handleFenetresChange} disabled={disabledFenetres}/>
          </div>
          </label>
          </div>
          <p style={{color: "#CC0000", fontWeight: "bold", marginTop: 0}}>{noOption}</p>
          <button className={styles.continue} onClick={handleContinue}>Continuer</button>
        </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default Travaux;