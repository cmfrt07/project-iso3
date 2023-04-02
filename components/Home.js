import React from 'react'
import styles from '../styles/Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import {useSelector, useDispatch} from 'react-redux';
import Image from 'next/image';
import { setLogementType } from '../reducers/plan';
import { clearLogementType } from '../reducers/plan';
import { clearCpt } from '../reducers/travaux';
import { logout } from '../reducers/user';
import { useEffect } from 'react';
import { clearAllPlan } from '../reducers/plan';
import { useState } from 'react'


function Home() {
  const dispatch = useDispatch()
  const router = useRouter()
  const user = useSelector((state) =>state.user.value.token);
  const [loggedOrNot, setLoggedOrNot] = useState(null);



  const handleContinue = () => {
    dispatch(clearAllPlan())

      router.push("/logement-type")
    
  };



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

        <div className={styles.containerBox}>
        <div className={styles.leftBox}>
          <h1>Vos travaux de <span style={{color: "#f25619"}}>rénovation énergétique</span> en toute sérénité</h1>
          <p>Bénéficiez d'un accompagnement personnalisé pour réaliser votre projet et profitez des meilleurs conseils pour faire des économies d'énergie</p>
          <button className={styles.continue} onClick={() => handleContinue()}>Commencer</button>
        </div>
        <div className={styles.rightBox}>
        <Image src="/images2/banner.png" alt="banner" width={800} height={500} />
        </div>
      </div>

    </main>
  );
}

export default Home;
