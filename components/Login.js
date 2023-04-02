import React from 'react'
import { useState } from 'react'
import styles from '../styles/Login.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { login } from '../reducers/user';
import { useEffect } from 'react';




function Login(){

  const dispatch = useDispatch()
  const router = useRouter()
  const [signUpEmail, setSignUpEmail] = useState('');
	const [signUpPassword, setSignUpPassword] = useState('');
  const [verifChamp, setVerifChamp] = useState("")

  const signUp = () => {
    if(signUpEmail.length < 1 || signUpPassword.length < 1){
      setVerifChamp(<p style ={{fontWeight: "bold", color: "#990000", marginTop: "20px", marginBottom:"0px", textAlign: "center"}}>Veuillez remplir tous les champs</p>)
    }else{
      fetch('https://projetiso-backend.vercel.app/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          dispatch(login({ email: signUpEmail, token: data.token }));
          router.push('/user')
        }
      });
    }
  }


  const handleRetour = () => {
    router.back();
  }




  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <div className={styles.intro}>
          <h1>name</h1>
          <span className={styles.line}></span>
          <p className={styles.displayNone}>Votre isolation de qualité : <span>estimez le prix de vos travaux en 2 minutes.*</span></p>
        </div>
        <h4><span className={styles.displayNone}>Déjà un projet avec name ?</span><span className={styles.connexion}> Se connecter</span></h4>
      </div>
        <div className={styles.mapContainer}>
      <div className={styles.tree}>

        <div className={styles.retourBtn} onClick={() => handleRetour()}>
        <FontAwesomeIcon icon={faArrowLeft}/>
        <p>retour</p>
        </div>

        {/*Changement de composant*/ }
        <div className={styles.mainDiv}>
        <h2>Identifiez-vous</h2>
        <div class={styles.inputBox}>
          <label>Email</label>
          <input placeholder= "Email" type="text" name="surface" min="0" max="1000" onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} required/>
        </div>
        <div class={styles.inputBox}>
          <label>Mot de passe</label>
          <input placeholder= "Password" type="password" name="surface" min="0" max="1000" onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} required/>
        {verifChamp}
        </div>

        <button className={styles.continue} onClick={() => signUp()} >Continuer</button>
      </div>
        {/*Changement de composant*/ }
      </div>
    </div>
  </main>
  );
}

export default Login;