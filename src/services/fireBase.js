import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlN4AZv3nVNPh7XufKicjpGXsB1auIe1o",
  authDomain: "fptu-dsc-blog-project.firebaseapp.com",
  projectId: "fptu-dsc-blog-project",
  storageBucket: "fptu-dsc-blog-project.appspot.com",
  messagingSenderId: "470922310561",
  appId: "1:470922310561:web:bed90edda99cd7696ad1e0",
  measurementId: "G-95ZKDCWKXY",
};

initializeApp(firebaseConfig);
export default getFirestore();
