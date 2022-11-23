// controlar se o jogador ja jogou e o que é que jogou. updatar no outro jogador.
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth();

// currentplayerID?

const checkForOpenGame = async function() {
  const querySnapshot = await getDocs(collection(db, "opengames"));
  if (querySnapshot.empty) {
    return false;
  }
  return true;
};

// join game, empty or otherwise
const joinGame = async function() {
  const querySnapshot = await getDocs(collection(db, "opengames"));
  if (querySnapshot.empty) {
    //create game. player 1 is always the first player to join
    const gameref = createGame(); //isto só devia acontecer depois do jogador clicar no botão
    return gameref;
  } else {
    //updateGame
    const currentplayerID = "segundo";
    let docID: string = "";
    let player1: string = "";
    //  let docData;
    querySnapshot.forEach((doc) => {
      if (docID === "") {
        docID = doc.id;
        const docData = doc.data();
        player1 = docData.player1;
      }
    });
    updateGame(docID, player1, currentplayerID);
    return docID;
  }
};

const createGame = async function() {
  const currentplayerID = "primeiro";
  //add doc to db with firebase generated id
  const newGameRef = doc(collection(db, "opengames"));
  await setDoc(newGameRef, {
    players: 1,
    player1: currentplayerID,
    player2: "",
    timestarted: serverTimestamp(),
  });
  return newGameRef.id;
};

// after auth is working, need to keep playerid
const updateGame = async function(
  docID: string,
  player1ID: string,
  player2ID: string
) {
  const gameRef = doc(db, "opengames", docID);
  const flipcoin = getRandomInt(2);
  await updateDoc(gameRef, {
    players: increment(1),
    player2: player2ID,
  });
  if (flipcoin === 1) {
    // player1 is redplayer
    moveGameToOnGoing(docID, player1ID, player2ID);
  } else if (flipcoin === 0) {
    // player2 is redplayer
    moveGameToOnGoing(docID, player2ID, player1ID);
  }
};

// each user needs to have a deck
// when game moves to ongoing, fetch player deck and display
// on signup, provide deck

const moveGameToOnGoing = async function(
  docID: string,
  redplayer: string,
  blueplayer: string
) {
  // setdoc. collection doesnt exist yet. need to make sure it gets set if it doesnt exist
  await setDoc(doc(db, "ongoinggames", docID), {
    redplayerID: redplayer,
    blueplayerID: blueplayer,
    winner: "",
    finished: false,
  });
};

const fetchGameInfo = async function(docID: string) {
  const docRef = doc(db, "ongoinggames", docID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const gameinfo = docSnap.data();
    const redplayer = gameinfo.redplayer;
    const blueplayer = gameinfo.blueplayer;
    // fetch decks
  } else {
    console.log("No such document!");
  }
};

const deleteGame = async function(docID: string) {
  await deleteDoc(doc(db, "opengames", docID));
};

// auth things

const checkIfUserIsSignedIn = async function() {
  let userinfo: [boolean, string] = [false, ""];
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userinfo[0] = true;
      userinfo[1] = user.uid;
    }
  });
  return userinfo;
};

const getRandomInt = function(max: number) {
  return Math.floor(Math.random() * max);
};

export default checkForOpenGame;
export { joinGame, checkIfUserIsSignedIn };

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
