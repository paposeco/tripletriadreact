// controlar se o jogador ja jogou e o que é que jogou. updatar no outro jogador.
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
//import { getAuth } from "firebase/auth";

import type { OpenGameDataDB } from "./common/types";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyByd6NQd_0wjJw8_tKuXHzp7t729326ffM",
  authDomain: "tripletriadreact.firebaseapp.com",
  projectId: "tripletriadreact",
  storageBucket: "tripletriadreact.appspot.com",
  messagingSenderId: "19443678235",
  appId: "1:19443678235:web:08aa233f800a1448818cbe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("db started");

const checkForOpenGames = async function() {
  const querySnapshot = await getDocs(collection(db, "opengames"));
  if (querySnapshot.empty) {
    //create game. player 1 is always the first player to join
    //updateGame
  } else {
    let docID: string = "";
    //  let docData;
    querySnapshot.forEach((doc) => {
      if (docID === "") {
        docID = doc.id;
        //        docData = doc.data();
      }
    });
    updateGame(docID);
    //send signal to show game
    // move this game to games ongoing
    return true;
  }
};

const createGame = async function() { };

// after auth is working, need to keep playerid
const updateGame = async function(docID: string) {
  const gameRef = doc(db, "opengames", docID);
  const flipcoin = getRandomInt(2);
  if (flipcoin === 1) {
    await updateDoc(gameRef, {
      players: increment(1),
      player2: "lkl",
      redplayer: "player1",
    });
  } else if (flipcoin === 0) {
    await updateDoc(gameRef, {
      players: increment(1),
      player2: "lkl",
      redplayer: "player2",
    });
  }
};

const moveGameToOnGoing = async function() {
  // setdoc. collection doesnt exist yet. need to make sure it gets set if it doesnt exist
};

const getRandomInt = function(max: number) {
  return Math.floor(Math.random() * max);
};

export default checkForOpenGames;

/* const startDB = function() {
 *     console.log("db started");
 *     const app = initializeApp(firebaseConfig);
 *     console.log(app);
 *     const db = getFirestore(app);
 *     console.log(db);
 *     return db;
 * };
 *
 * const checkDB = async function() {
 *     console.log("check db");
 *     const querySnapshot = await getDocs(collection(database, "opengames"));
 *     querySnapshot.forEach((doc) => {
 *         console.log(`${doc.id} => ${doc.data()}`);
 *     });
 * };
 *
 * const database = startDB();
 * export default checkDB; */

// who is red or blue player should be random

// what happens if a player leaves a game?
