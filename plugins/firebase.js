// import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// these variables are not secret
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
  });
}
firebase.auth().languageCode = "ja";

// nuxt-firebase-sns-example https://github.com/potato4d/nuxt-firebase-sns-example
export default (context, inject) => {
  inject('firebase', firebase);
  inject('firestore', firebase.firestore());
  inject('auth', firebase.auth());
}

