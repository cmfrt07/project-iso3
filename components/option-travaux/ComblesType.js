import React from 'react'
import { useState } from 'react'
import styles from '../../styles/option-travaux/ComblesType.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setComblesType } from '../../reducers/plan';
import { clearComblesType } from '../../reducers/plan';
import { clearComblesSurface } from '../../reducers/plan';
import { clearMursType } from '../../reducers/plan';
import { clearMursSurface } from '../../reducers/plan';
import { clearSousSolType } from '../../reducers/plan';
import { clearSousSolSurface } from '../../reducers/plan';
import { clearFenetres } from '../../reducers/plan';
import { clearTravauxType } from '../../reducers/plan';
import { clearCpt } from '../../reducers/travaux';
import { logout } from '../../reducers/user';
import { useEffect } from 'react';


function ComblesType(){
  const user = useSelector((state) => state.user.value.token);
  const dispatch = useDispatch()
  const router = useRouter()
  const [comblesPerdus, setComblesPerdus] = useState(true);
  const [comblesAmenages, setComblesAmenages] = useState(false);
  const [loggedOrNot, setLoggedOrNot] = useState(null);

  console.log(comblesAmenages + " amenag;"+ comblesPerdus + " perdus;")

  const handleLessThanTwoChange = (event) => {
    setComblesPerdus(event.target.checked);
    setComblesAmenages(false);
  };

  const handleBetweenTwoAndFifteenChange = (event) => {
    setComblesAmenages(event.target.checked);
    setComblesPerdus(false);
  };


  const handleContinue = () => {
    if(comblesPerdus) {
      dispatch(setComblesType('combles perdus'));
      router.push("/combles-surface")
    }else if(comblesAmenages) {
      dispatch(setComblesType('combles amnenagés'));
      router.push("/combles-surface")
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
    router.push("/travaux")
  }

  let selectedLessThanTwo = {};
  let selectedBetweenTwoAndFifteen = {}

  if(comblesPerdus){
    selectedLessThanTwo = {border: "solid 1px black"}
  }
  if(comblesAmenages){
    selectedBetweenTwoAndFifteen = {border: "solid 1px black"}
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
          <h2>L’isolation des combles concerne :</h2>
          <div className={styles.choice}>
            <label>
              <div style={selectedLessThanTwo} className={styles.type} >
                <Image src="/images2/7.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Des combles perdus</h4>
                <input className={styles.radioBtn} type="radio" value="comblesPerdus" name="comblesType" checked={comblesPerdus} onChange={handleLessThanTwoChange}/>
              </div>
            </label>
            <label>
              <div style={selectedBetweenTwoAndFifteen} className={styles.type} >
                <Image src="/images2/9.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Des combles aménagés</h4>
                <input className={styles.radioBtn} type="radio" value="comblesAmenages" name="comblesType" checked={comblesAmenages} onChange={handleBetweenTwoAndFifteenChange}/>
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

export default ComblesType;