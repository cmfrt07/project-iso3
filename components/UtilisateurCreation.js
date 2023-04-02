import React from 'react'
import { useState } from 'react'
import styles from '../styles/UtilisateurCreation.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { login } from '../reducers/user';
import { logout } from '../reducers/user';
import { useEffect } from 'react';
import { clearGenre } from '../reducers/plan';
import { clearNewPhoneNumber } from '../reducers/plan';
import { clearNom } from '../reducers/plan';
import { clearPrenom } from '../reducers/plan';




function UtilisateurCreation(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
  const [verifChamp, setVerifChamp] = useState("")
  const user = useSelector((state) =>state.user.value.token);
  const nameSave = useSelector((state) =>state.plan.value.nom);
  const surnameSave = useSelector((state) =>state.plan.value.prenom);
  const genreSave = useSelector((state) =>state.plan.value.genre);
  const newPhoneNumberSave = useSelector((state) =>state.plan.value.phoneNumber);
  const [loggedOrNot, setLoggedOrNot] = useState(null);
  const newProject = useSelector((state) =>state.plan.value);


  const handleConnectInstead = () => {
    router.push("/login")
  }



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


  const signUp = () => {
    if (signUpEmail.length < 1 || signUpPassword.length < 1) {
      setVerifChamp(<p style={{ fontWeight: "bold", color: "#990000", marginTop: "20px", marginBottom: "0px", textAlign: "center" }}>Veuillez remplir tous les champs</p>)
    } else {
      fetch('https://projetiso-backend.vercel.app/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword, newPhoneNumber: newPhoneNumberSave, gender: genreSave, name: nameSave, surname: surnameSave }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.result) {
            let myToken = data.token;
            dispatch(login({ email: signUpEmail, token: data.token }));
            router.push('/user')
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
                token: myToken,
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
                console.log(data)
              });
          } else if (data.result === false) {
            setVerifChamp(<p style={{ fontWeight: "bold", color: "#990000", marginTop: "20px", marginBottom: "0px", textAlign: "center" }}>Cet email est déjà utilisé, <span style={{ color: "#0070f3", cursor: "pointer" }} onClick={() => handleConnectInstead()}> se connecter ?</span></p>)
          }
        });
    }
  }
  




  const handleRetour = () => {
    dispatch(clearGenre())
    dispatch(clearPrenom())
    dispatch(clearNom())
    dispatch(clearNewPhoneNumber())
    router.push("/utilisateur-identite");
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

        <h2>Dernière étape : créez votre compte name</h2>
        <p>Vous pourrez y retrouver tous les éléments de votre dossier et suivre chaque étape de votre projet.</p>
        <div className={styles.globalWidth}>
        <div className={styles.inputBox}>
          <label>Email</label>
          <input placeholder= "Email" type="text" name="surface" min="0" max="1000" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} required/>
        </div>
        <div className={styles.inputBox}>
          <label>Mot de passe</label>
          <input placeholder= "Password" type="password" name="surface" min="0" max="1000" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} required/>
        {verifChamp}
        </div>
        <div className={styles.checkBoxBox}>
        <input type="checkbox" name="CGV"/>
        <label>Je reconnais avoir pris connaissance de la Politique de Protection des Données <br/>et des Conditions Générales de Vente Name Liberté que j'accepte en cliquant sur «Valider».</label>
        </div>
        <div className={styles.checkBoxBox}>
        <input type="checkbox" name="Newsletter"/>
        <label>Je M'inscris à la newsLetter</label>
        </div>
        </div>
        <button className={styles.continue} onClick={() => signUp()} >Continuer</button>
      </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default UtilisateurCreation;