import React from 'react'
import { useState } from 'react'
import styles from '../styles/MenageRevenus.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setMenageRevenus } from '../reducers/plan';
import { clearMenageComposition } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';




function MenageRevenus(){


  const user = useSelector((state) =>state.user.value.token);
  const [loggedOrNot, setLoggedOrNot] = useState(null);
  const dispatch = useDispatch()
  const router = useRouter()
  const [inferieur23734, setInferieur23734] = useState(true);
  const [entre23734et30427, setEntre23734et30427] = useState(false);
  const [entre30427et42848, setEntre30427et42848] = useState(false);
  const [superieurA42848, setSuperieurA42848] = useState(false)
  const newProject = useSelector((state) =>state.plan.value);

  const handleinferieur23734Change = (event) => {
    setInferieur23734(event.target.checked);
    setEntre23734et30427(false);
    setEntre30427et42848(false);
    setSuperieurA42848(false)
  };

  const handleentre23734et30427Change = (event) => {
    setEntre23734et30427(event.target.checked);
    setInferieur23734(false);
    setEntre30427et42848(false);
    setSuperieurA42848(false)
  };

  const handleentre30427et42848Change = (event) => {
    setEntre30427et42848(event.target.checked);
    setInferieur23734(false);
    setEntre23734et30427(false);
    setSuperieurA42848(false)
  };

  const handlesuperieurA42848Change = (event) => {
    setSuperieurA42848(event.target.checked);
    setInferieur23734(false);
    setEntre23734et30427(false);
    setEntre30427et42848(false);
  };

  function removeNullProperties(obj) {
    const cleanedObj = {};
    for (const key in obj) {
      if (obj[key] !== null) {
        if (typeof obj[key] === 'object') {
          cleanedObj[key] = removeNullProperties(obj[key]);
        } else {
          cleanedObj[key] = obj[key];
        }
      }
    }
    return cleanedObj;
  }

  const handleContinue = () => {
    if(user !== null){

      const travauxValues = newProject.travaux.map(item => {
        switch (Object.values(item)[0]) {
          case 'f':
            return 'fenetres';
          case 'm':
            return 'murs';
          case 'c':
            return 'combles';
          case 's':
            return 'sousSol';
          case 'g':
            return 'garage';
          default:
            return '';
        }
      });

      fetch('https://projetiso-backend.vercel.app/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(removeNullProperties({
          token: user,
          logementType: newProject.logementType,
          logementConstruction: newProject.logementConstruction,
          travaux: travauxValues,
          fenetres: newProject.fenetres,
          combles: {
            type: newProject.combles.type,
            surface: newProject.combles.surface,
          },
          murs: {
            type: newProject.murs.type,
            surface: newProject.murs.surface,
          },
          sousSol: {
            type: newProject.sousSol.type,
            surface: newProject.sousSol.surface,
          },
          typeDeChauffage: {
            gaz: newProject.gaz,
            fioul: newProject.fioul,
            electrique: newProject.electrique,
          },
          raisonTravaux: newProject.raisonTravaux,
          adresse: newProject.adresse,
          statutProjet: newProject.statutProjet,
          timingProjet: newProject.timingProjet,
          chauffageEnergie: newProject.chauffageEnergie,
          utilisateurStatut: newProject.utilisateurStatut,
          codePostal: newProject.codePostal,
          menageComposition: newProject.menageComposition,
          menageRevenus: newProject.menageRevenus,
        })),
      })
        .then(response => response.json())
        .then(data => {
          router.push('/user')
        });
    }else{
      if(inferieur23734) {
        dispatch(setMenageRevenus("Inférieur à 23 734 €"));
        router.push("/utilisateur-identite")
      }else if(entre23734et30427) {
        dispatch(setMenageRevenus("Entre 23 734 € et 30 427€"));
        router.push("/utilisateur-identite")
      }else if(entre30427et42848) {
        dispatch(setMenageRevenus('Entre 30 427 € et 42 848 €'));
        router.push("/utilisateur-identite")
      }else if(superieurA42848) {
        dispatch(setMenageRevenus('Supérieur à 42 848 €'));
        router.push("/utilisateur-identite")
      }
    }
  };







  const handleRetour = () => {
    dispatch(clearMenageComposition())
    router.push("/menage-composition");
  }

  let selectedinferieur23734 = {};
  let selectedentre23734et30427 = {}
  let selectedentre30427et42848 = {}
  let selectedsuperieurA42848 = {}

  if(inferieur23734){
    selectedinferieur23734 = {border: "solid 1px black"}
  }
  if(entre23734et30427){
    selectedentre23734et30427 = {border: "solid 1px black"}
  }
  if(entre30427et42848){
    selectedentre30427et42848 = {border: "solid 1px black"}
  }
  if(superieurA42848){
    selectedsuperieurA42848 = {border: "solid 1px black"}
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
          <h2>À combien s'élève le revenu total de votre foyer fiscal ?</h2>
          <p>Le revenu fiscal de référence est utilisé pour calculer le montant de vos aides au plus juste.</p>
          <div className={styles.choice}>
            <label>
              <div style={selectedinferieur23734} className={styles.type}>
                <Image src="/images2/49.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Inférieur à 23 734 €</h4>
                <input className={styles.radioBtn} type="radio" value="inferieur23734" name="menageRevenus" checked={inferieur23734} onChange={handleinferieur23734Change}/>
              </div>
            </label>
            <label>
              <div style={selectedentre23734et30427} className={styles.type}>
                <Image src="/images2/50.png" alt="Logo" width={"90%"} height={"90%"}/>
                <h4>Entre 23 734 € et 30 427 €</h4>
                <input className={styles.radioBtn} type="radio" value="entre23734et30427" name="menageRevenus" checked={entre23734et30427} onChange={handleentre23734et30427Change}/>
              </div>
            </label>
            <label>
            <div style={selectedentre30427et42848} className={styles.type}>
              <Image src="/images2/51.png" alt="Logo" width={"90%"} height={"90%"}/>
              <h4>Entre 30 427 € et 42 848 €</h4>
              <input className={styles.radioBtn} type="radio" value="entre30427et42848" name="menageRevenus" checked={entre30427et42848} onChange={handleentre30427et42848Change}/>
            </div>
          </label>
          <label>
          <div style={selectedsuperieurA42848} className={styles.type}>
            <Image src="/images2/52.png" alt="Logo" width={"90%"} height={"90%"}/>
            <h4>Supérieur a 42 848 €</h4>
            <input className={styles.radioBtn} type="radio" value="superieurA42848" name="menageRevenus" checked={superieurA42848} onChange={handlesuperieurA42848Change}/>
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

export default MenageRevenus;

