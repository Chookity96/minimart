const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const firebaseConfig = {

  apiKey: "AIzaSyD0GrbuTRiToDlZO0R6bKQ0U2smhYJPF3w",

  authDomain: "minimart-ee4e4.firebaseapp.com",

  projectId: "minimart-ee4e4",

  storageBucket: "minimart-ee4e4.appspot.com",

  messagingSenderId: "213666383284",

  appId: "1:213666383284:web:09a50c23e6ff2e76091ee1"

};

const serviceAccount = require('./serviceAccount.json');
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
module.exports = db;

