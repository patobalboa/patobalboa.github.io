import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {addDoc, collection, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, getDoc} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBV2VBZfmfCzCoLColOzHlcPjXkSZHZfqo",
    authDomain: "progweb-c1a5f.firebaseapp.com",
    projectId: "progweb-c1a5f",
    storageBucket: "progweb-c1a5f.appspot.com",
    messagingSenderId: "393954053878",
    appId: "1:393954053878:web:77cbace629984da152a6d7"
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