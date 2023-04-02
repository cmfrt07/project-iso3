import React from 'react'
import { useState } from 'react'
import styles from '../styles/UtilisateurIdentite.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { clearMenageRevenus } from '../reducers/plan';
import { setPrenom } from '../reducers/plan';
import { setNom } from '../reducers/plan';
import { setNewPhoneNumber } from '../reducers/plan';
import { setGenre } from '../reducers/plan';
import { setFenetres } from '../reducers/plan';
import { logout } from '../reducers/user';
import { useEffect } from 'react';



function UtilisateurIdentite(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [monsieur, setMonsieur] = useState(true)
  const [madame, setMadame] = useState(false)
  const [firstname, setFirstname] = useState('')
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [verifChamp, setVerifChamp] = useState("")
  const user = useSelector((state) =>state.user.value.token);
const [loggedOrNot, setLoggedOrNot] = useState(null);



  const selectMadame = () => {
    setMonsieur(false);
    setMadame(true)
  }

  const selectMonsieur = () => {
    setMonsieur(true);
    setMadame(false)
  }
  
  let madameStyle = {};
  let monsieurStyle = {};
  if(monsieur){
    monsieurStyle = {border: "solid 1px black"}
  }
  if(madame){
    madameStyle = {border: "solid 1px black"}
  }



  const handleContinue = () => {
    const phoneRegex = new RegExp(/^(06|07)[0-9]{8}/gi);
    if(firstname.length > 1 && name.length > 1 && phoneRegex.test(phoneNumber)){
      if(monsieur){
        dispatch(setGenre("Mr"))
      }else{
        dispatch(setGenre("Mme"))
      }
      dispatch(setPrenom(firstname))
      dispatch(setNom(name))
      dispatch(setNewPhoneNumber(phoneNumber))
      router.push("/utilisateur-creation")
      
    }else{
      setVerifChamp(<span style ={{fontWeight: "bold", color: "#990000", marginTop: "20px", marginBottom: "-20px", textAlign: "center"}}>Veuillez remplir tous les champs</span>)
    }
  };

  const handleRetour = () => {
    dispatch(clearMenageRevenus())
    router.push("/menage-revenus");
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
        <h2>Comment vous appelez-vous ?</h2>
        <p>Vous bénéficierez de notre service d’assistance téléphonique <br/> et serez rappelé gratuitement afin de vous accompagner dans votre projet.</p>
        <div className={styles.globalWidth} >
        <div className={styles.gender}>
          <div className={styles.mrMs} style={monsieurStyle} onClick={() => selectMonsieur()}>
            <p>Monsieur</p>
          </div>
          <div className={styles.mrMs} style={madameStyle} onClick={() => selectMadame()}>
            <p>Madame</p>
          </div>
        </div>
        <div className={styles.inputBox}>
          <label>Prénom</label>
          <input placeholder= "Prénom" type="text" onChange={(e) => setFirstname(e.target.value)} value={firstname}/>
        </div>
        <div className={styles.inputBox}>
          <label>Nom</label>
          <input placeholder= "Nom" type="text" onChange={(e) => setName(e.target.value)} value={name}/>
        </div>
        <div className={styles.inputBox}>
          <label>Téléphone</label>
          <input placeholder= "06 00 00 00 00" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber}/>
          {verifChamp}
        </div>
        <div className={styles.opposition}>
        <p>Conformément à l’article L.223-1 du C. code de la consommation, vous avez le droit de vous inscrire gratuitement sur une liste d’opposition au démarchage téléphonique afin de ne plus être recontacté par des professionnels hors contrat en cours d’exécution.</p>
        </div>
        </div>
        <button className={styles.continue} onClick={handleContinue}>Continuer</button>
      </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default UtilisateurIdentite;