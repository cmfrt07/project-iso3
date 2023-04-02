import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { 
    logementType: null,
    logementConstruction: null,
    travaux: null,
    fenetres: null,
    combles: {
      type: null, surface: null,
    },
    murs: {
      type: null, surface: null,
    },
    sousSol: {
      type: null, surface: null,
    },
    raisonTravaux: null,
    adresse: null,
    statutProjet: null,
    timingProjet: null,
    chauffageEnergie: null,
    gaz: null,
    fioul: null,
    electrique: null,
    utilisateurStatut: null,
    codePostal: null,
    menageComposition: null,
    menageRevenus: null,

      genre: null,
      nom: null,
      prenom: null,
      phoneNumber: null,

  },
};

export const planSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setLogementType: (state, action) => {
      state.value.logementType = action.payload;
    },
    clearLogementType: (state, action) => {
      state.value.logementType = null;
    },
    setLogementConstruction: (state, action) => {
      state.value.logementConstruction = action.payload;
    },
    clearLogementConstruction: (state, action) => {
      state.value.logementConstruction = null;
    },
    setTravauxType: (state, action) => {
      state.value.travaux = action.payload;
    },
    clearTravauxType: (state, action) => {
      state.value.travaux = null;
    },

    setComblesType: (state, action) => {
      state.value.combles.type = action.payload;
    },
    clearComblesType: (state, action) => {
      state.value.combles.type = null;
    },
    setComblesSurface: (state, action) => {
      state.value.combles.surface = action.payload;
    },
    clearComblesSurface: (state, action) => {
      state.value.combles.surface = null;
    },

    setMursType: (state, action) => {
      state.value.murs.type = action.payload;
    },
    clearMursType: (state, action) => {
      state.value.murs.type = null;
    },
    setMursSurface: (state, action) => {
      state.value.murs.surface = action.payload;
    },
    clearMursSurface: (state, action) => {
      state.value.murs.surface = null;
    },

    setSousSolType: (state, action) => {
      state.value.sousSol.type = action.payload;
    },
    clearSousSolType: (state, action) => {
      state.value.sousSol.type = null;
    },
    setSousSolSurface: (state, action) => {
      state.value.sousSol.surface = action.payload;
    },
    clearSousSolSurface: (state, action) => {
      state.value.sousSol.surface = null;
    },

    setFenetres: (state, action) => {
      state.value.fenetres = action.payload;
    },
    clearFenetres: (state, action) => {
      state.value.sousSol.type = null;
    },

    setRaisonTravaux: (state, action) => {
      state.value.raisonTravaux = action.payload;
    },
    clearRaisonTravaux: (state, action) => {
      state.value.raisonTravaux = null;
    },

    setAdresse: (state, action) => {
      state.value.adresse = action.payload;
    },
    clearAdresse: (state, action) => {
      state.value.adresse = null;
    },

    setStatutProjet: (state, action) => {
      state.value.statutProjet = action.payload;
    },
    clearStatutProjet: (state, action) => {
      state.value.statutProjet = null;
    },

    setTimingProjet: (state, action) => {
      state.value.timingProjet = action.payload;
    },
    clearTimingProjet: (state, action) => {
      state.value.timingProjet = null;
    },

    setChauffageEnergie: (state, action) => {
      state.value.chauffageEnergie = action.payload;
    },
    clearChauffageEnergie: (state, action) => {
      state.value.chauffageEnergie = null;
    },

    setGaz: (state, action) => {
      state.value.gaz = action.payload;
    },
    clearGaz: (state, action) => {
      state.value.gaz = null;
    },

    setFioul: (state, action) => {
      state.value.fioul = action.payload;
    },
    clearFioul: (state, action) => {
      state.value.fioul = null;
    },

    setElectrique: (state, action) => {
      state.value.electrique = action.payload;
    },
    clearElectrique: (state, action) => {
      state.value.electrique = null;
    },

    setUtilisateurStatut: (state, action) => {
      state.value.utilisateurStatut = action.payload;
    },
    clearUtilisateurStatut: (state, action) => {
      state.value.utilisateurStatut = null;
    },

    setNewCodePostal: (state, action) => {
      state.value.codePostal = action.payload;
    },
    clearCodePostal: (state, action) => {
      state.value.codePostal = null;
    },

    setMenageComposition: (state, action) => {
      state.value.menageComposition = action.payload;
    },
    clearMenageComposition: (state, action) => {
      state.value.menageComposition = null;
    },

    setMenageRevenus: (state, action) => {
      state.value.menageRevenus = action.payload;
    },
    clearMenageRevenus: (state, action) => {
      state.value.menageRevenus = null;
    },

    setPrenom: (state, action) => {
      state.value.prenom = action.payload;
    },
    clearPrenom: (state, action) => {
      state.value.prenom = null;
    },

    setNom: (state, action) => {
      state.value.nom = action.payload;
    },
    clearNom: (state, action) => {
      state.value.nom = null;
    },

    setNewPhoneNumber: (state, action) => {
      state.value.phoneNumber = action.payload;
    },
    clearNewPhoneNumber: (state, action) => {
      state.value.phoneNumber = null;
    },

    setGenre: (state, action) => {
      state.value.genre = action.payload;
    },
    clearGenre: (state, action) => {
      state.value.genre = null;
    },


    clearAllPlan: (state, action) => {
      state.value.logementType = null;
      state.value.logementConstruction = null;
      state.value.travaux = null;
      state.value.fenetres = null;
      state.value.combles.type = null;
      state.value.combles.surface = null;
      state.value.murs.type = null;
      state.value.murs.surface = null;
      state.value.sousSol.type = null;
      state.value.sousSol.surface = null;

      state.value.raisonTravaux = null;
      state.value.adresse = null;
      state.value.statutProjet = null;
      state.value.timingProjet = null;
      state.value.chauffageEnergie = null;
      state.value.gaz = null;
      state.value.fioul = null;
      state.value.electrique = null;
      state.value.utilisateurStatut = null;
      state.value.codePostal = null;
      state.value.menageComposition = null;
      state.value.menageRevenus = null;

      state.value.genre = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.phoneNumber = null; 
    },
  },
});

export const { 
  setLogementType,
  clearLogementType,
  setLogementConstruction,
  clearLogementConstruction,
  setTravauxType,
  clearTravauxType,

  setComblesType,
  clearComblesType,
  setComblesSurface,
  clearComblesSurface,

  setMursType,
  clearMursType,
  setMursSurface,
  clearMursSurface,

  setSousSolType,
  clearSousSolType,
  setSousSolSurface,
  clearSousSolSurface,

  setFenetres,
  clearFenetres,

  setRaisonTravaux,
  clearRaisonTravaux,

  setAdresse,
  clearAdresse,

  setStatutProjet,
  clearStatutProjet,

  setTimingProjet,
  clearTimingProjet,
  
  setChauffageEnergie,
  clearChauffageEnergie,

  setGaz,
  clearGaz,

  setFioul,
  clearFioul,

  setElectrique,
  clearElectrique,

  setUtilisateurStatut,
  clearUtilisateurStatut,

  setNewCodePostal,
  clearCodePostal,

  setMenageComposition,
  clearMenageComposition,

  setMenageRevenus,
  clearMenageRevenus,

  setPrenom,
  clearPrenom,

  setNom,
  clearNom,

  setNewPhoneNumber,
  clearNewPhoneNumber,

  setGenre,
  clearGenre,

  clearAllPlan,

} = planSlice.actions;
export default planSlice.reducer;