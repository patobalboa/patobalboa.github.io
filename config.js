import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {addDoc, collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBR1BC-L2Oi2wMu_iQ1nfudRGXTs4Ma1OU",
    authDomain: "certamen1-30278.firebaseapp.com",
    projectId: "certamen1-30278",
    storageBucket: "certamen1-30278.appspot.com",
    messagingSenderId: "1002551611304",
    appId: "1:1002551611304:web:2f5c88c34d921b5e02179d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//función que retorna la base de datos
const db = getFirestore()

export const guardar = (run, nombre, email, telefono, cargo) => addDoc(collection(db,'postulantes'),{run, nombre, email, telefono, cargo})

export const obtenerall = (retorno) => onSnapshot(collection(db,'postulantes'),retorno)

export const eliminar = (id) => deleteDoc(doc(db,'postulantes',id))

export const obtenerUno = async (id) => getDoc(doc(db,'postulantes',id))

export const editar = (id, datos) => updateDoc(doc(db,'postulantes',id),datos)