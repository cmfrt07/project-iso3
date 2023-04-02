import React from 'react'
import { useState } from 'react'
import styles from '../styles/ThirdPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import LogementType from './steps/LogementType';
import ConstructionDate from './steps/ConstructionDate';
import WhatWork from './steps/WhatWork';
import Surface from './steps/Surface';
import Where from './steps/Where';
import StepOfYourProject from './steps/StepOfYourProject';
import InfosClient from './steps/InfosClient'
import Subscribe from './steps/Subscribe';
import Intro from './steps/Intro';


function FirstPage(){

  const[component, setComponent] = useState('')

  const keepGoing = () =>{
    if(component === ""){
      setComponent(component = "Intro")
    }
    else if(component === "Intro"){
      setComponent(component = "ConstructionDate")
    }
    else if(component === "ConstructionDate"){
      setComponent(component = "WhatWork")
    }
    else if(component === "WhatWork"){
      setComponent(component = "Surface")
    }
    else if(component === "Surface"){
      setComponent(component = "Where")
    }
    else if(component === "Where"){
      setComponent(component = "StepOfYourProject")
    }
    else if(component === "StepOfYourProject"){
      setComponent(component = "InfosClient")
    }
    else if(component === "InfosClient"){
      setComponent(component = "Subscribe")
    }
  }

  const goBack = () =>{
    if(component === "Subscribe"){
      setComponent(component = "InfosClient")
    }
    else if(component === "InfosClient"){
      setComponent(component = "StepOfYourProject")
    }
    else if(component === "StepOfYourProject"){
      setComponent(component = "Where")
    }
    else if(component === "Where"){
      setComponent(component = "Surface")
    }
    else if(component === "Surface"){
      setComponent(component = "WhatWork")
    }
    else if(component === "WhatWork"){
      setComponent(component = "ConstructionDate")
    }
    else if(component === "ConstructionDate"){
      setComponent(component = "Intro")
    }
    else if(component === "Intro"){
      setComponent(component = "")
    }
  }


  let retourbtn;
  let keepgoingBtn = "Continuer"
  let btnAction = () => keepGoing();

  let currentComponent = <LogementType/>
  if(component === ""){
    currentComponent = <Intro/>
    retourbtn = {"display": "none"}
    keepgoingBtn = "Essayer"
  }
  else if(component === "ConstructionDate"){
    currentComponent = <ConstructionDate/>
  }
  else if( component === "WhatWork"){
    currentComponent = <WhatWork/>
  }
  else if( component === "Surface"){
    currentComponent = <Surface/>
  }
  else if( component === "Where"){
    currentComponent = <Where/>
  }
  else if( component === "StepOfYourProject"){
    currentComponent = <StepOfYourProject/>
  }
  else if( component === "InfosClient"){
    currentComponent = <InfosClient/>
  }
  else if( component === "Subscribe"){
    currentComponent = <Subscribe/>
  }


  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.intro}>
          <h1>name</h1>
          <span className={styles.line}></span>
          <p className={styles.displayNone}>Votre isolation de qualité : <span>estimez le prix de vos travaux en 2 minutes.*</span></p>
        </div>
        <h4><span className={styles.displayNone}>Déjà un projet avec name ?</span><span className={styles.connexion} onClick={() => router.push("/login")} > Se connecter</span></h4>
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
          <div className={styles.stepShaded}>
            <span className={styles.stepLineShaded}></span>
            <div>
              <h4>Vos informations</h4>
            </div>
          </div>
          <div className={styles.step}>
            <span className={styles.stepLine}></span>
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

        <div style={retourbtn} className={styles.retourBtn} onClick={() => goBack()}>
        <FontAwesomeIcon icon={faArrowLeft}/>
        <p>retour</p>
        </div>
        {/*Changement de composant*/ }
        {currentComponent}
        {/*Changement de composant*/ }
        <button className={styles.continue} onClick={btnAction} >{keepgoingBtn}</button>

      </div>
    </div>
  </main>
  );
}

export default FirstPage;