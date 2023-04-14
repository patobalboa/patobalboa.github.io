import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {addDoc, collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4vkGITcSXYY9nS4_2WE7kSwqRjWQ4RnI",
    authDomain: "certamen-e8a5d.firebaseapp.com",
    projectId: "certamen-e8a5d",
    storageBucket: "certamen-e8a5d.appspot.com",
    messagingSenderId: "890551137499",
    appId: "1:890551137499:web:45a2c2c6fc322ce12508fe"
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