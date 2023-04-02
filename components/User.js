import React from 'react'
import styles from '../styles/User.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Image from 'next/image';





function User(){
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  console.log(user.token)

  const handleLogout = () => {
    dispatch(logout());
    router.push("/logement-type")
  }

  return (
    <main className={styles.main} style={{backgroundColor: "#f7f9ff"}}>
    <div className={styles.header}>
      <div className={styles.intro}>
        <h1>name</h1>
        <span className={styles.line}></span>
        <p className={styles.displayNone}>Votre isolation de qualité : <span>estimez le prix de vos travaux en 2 minutes.*</span></p>
      </div>
      <h4><span className={styles.connexion} onClick={() => handleLogout()}> Se déconnecter</span></h4>
    </div>
    <h1 style={{marginLeft: "20%", marginTop: "5%", fontSize: 22}}>Estimez le prix de vos travaux:</h1>
    <div className={styles.content}>
      <div className={styles.left}>
      <h3>Merci monsieur x, suite à votre estimation, l'un de nos conseiller vous contactera très prochainement au 06XXXXXXXX concernant votre devis.</h3>
      <p>Nous pouvons vous également vous mettre en relation avec nos artisans RGE partenaires afin d'obtenir des devis pour vos travaux. Demandez pour cela à être appelé par l'un de nos conseiller.</p>
      <button className={styles.callMe} onClick={() => console.log("callMe")} >J'AI BESOIN D'ACCOMPAGNEMENT</button>
      <h5>Si vous ne souhaitez pas être mis en relation avec un artisan partenaire, vous pouvez également être rappelé</h5>
      </div>
      <div className={styles.right}>
        <Image src="/images/conseiller.svg" alt="Logo" width={350} height={350}/>
      </div>
    </div>
    <h1 style={{marginLeft: "20%", marginTop: "5%", fontSize: 22}}>Mes Estimations:</h1>
    <div className={styles.content}>
      <div className={styles.left}>
      <h3>Retrouvez ici vos différentes estimations:</h3>
      <p>Vous l’avez compris, nous avons à cœur de rendre simples et accessibles les travaux de rénovation énergétique pour tous les Français.​ Estimez le prix de vos travaux en quelques clics!</p>
      <button className={styles.callMe} onClick={() => console.log("callMe")} >DEMANDER UN DEVIS</button>
      </div>
      <div className={styles.right}>
        <Image src="/images/devis.svg" alt="Logo" width={350} height={350}/>
      </div>
    </div>

</main>
  );
}

export default User;