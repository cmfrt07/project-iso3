import ComblesType from '../components/option-travaux/ComblesType'
import MursType from '../components/option-travaux/MursType'
import SousSolType from '../components/option-travaux/SousSolType'
import FenetresQuantite from '../components/option-travaux/FenetresQuantite'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';



function OptionsTravauxPage() {
  //ATTENTION FONCTIONNE, MAIS POSE DES PROBLEMES AVEC LE REDUCER PERSIST
  const dispatch = useDispatch();
  const router = useRouter();
  const options = useSelector((state)=> state.travaux.value.travaux);
  const cpt = useSelector((state)=> state.travaux.value.cpt);


  let firstComponent = <p></p>;

  if(options.length === 1 && cpt < 1){
    if(options[0] == "combles"){
      console.log("combles"+ " here")
      firstComponent = <ComblesType/>;
    }else if(options[0] == "murs"){
      console.log("murs"+ " here")
      firstComponent = <MursType/>;
    }else if(options[0] == "sousSol"){
      console.log("sousSol"+ " here")
      firstComponent = <SousSolType/>;
    }else if(options[0] == "fenetres"){
      console.log("fenetres"+ " here")
      firstComponent = <FenetresQuantite/>;
    }
  }
  else if(options.length === 1 && cpt === 1){
    router.push('/raison-travaux')
  }
  
  if (options.length === 2 && cpt < 1){
    if(options[0] == "combles"){
      console.log("combles"+ " here")
      firstComponent = <ComblesType/>;
    }else if(options[0] == "murs"){
      console.log("murs"+ " here")
      firstComponent = <MursType/>;
    }else if(options[0] == "sousSol"){
      console.log("sousSol"+ " here")
      firstComponent = <SousSolType/>;
    }else if(options[0] == "fenetres"){
      console.log("fenetres"+ " here")
      firstComponent = <FenetresQuantite/>;
    }
  }else if(options.length === 2 && cpt < 2){
    if(options[1] == "combles"){
      console.log("combles"+ " here")
      firstComponent = <ComblesType/>;
    }else if(options[1] == "murs"){
      console.log("murs"+ " here")
      firstComponent = <MursType/>;
    }else if(options[1] == "sousSol"){
      console.log("sousSol"+ " here")
      firstComponent = <SousSolType/>;
    }else if(options[1] == "fenetres"){
      console.log("fenetres"+ " here")
      firstComponent = <FenetresQuantite/>;
    }
  }else if(options.length === 2 && cpt === 2){
    router.push('/raison-travaux')
  }
  




  return firstComponent; 
}

export default OptionsTravauxPage;
