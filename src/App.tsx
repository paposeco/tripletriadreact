import "./App.css";
import type { Card } from "./common/types";
//import Getcardfromcollection from "./Game";
import { blueplayerdeck, redplayerdeck, getcardfromcollection } from "./Game";
import { useState, useEffect } from "react";

const App = function() {
  const [selectedsquare, setselectedsquare] = useState("");
  const [cardselected, setcardselected] = useState("");
  const [finishedselectingcard, setfinishedselectingcard] = useState(false);
  const [finishedselectingsquare, setfinishedselectingsquare] = useState(false);
  const [currentplayer, setcurrentplayer] = useState("");

  const selectCard = function(event: React.MouseEvent<HTMLDivElement>): void {
    if (currentplayer !== event.currentTarget.parentElement.id) {
      return;
    }
    if (finishedselectingcard) {
      return;
    }
    const playerdiv = document.getElementById(currentplayer);
    if (playerdiv !== null) {
      const playerdeck = playerdiv.children;
      if (playerdeck.length !== 0) {
        setcardselected(event.currentTarget.dataset.card);
        setfinishedselectingcard(true);
        if (currentplayer === "redplayer") {
          // movesperround.redplayercard(event.currentTarget.dataset.card);
        } else if (currentplayer === "blueplayer") {
          //  keeptrackofmoves.blueplayercard(event.currentTarget.dataset.card);
        }
      }
    }
  };

  const selectSquare = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    if (!cardselected) {
      return;
    }
    setselectedsquare(event.currentTarget.id);
    setfinishedselectingsquare(true);
    //    const card = getcardfromcollection(cardselected);
    const card = {
      name: "sabotender",
      power: [4, 3, 3, 3],
      face: "",
      cardID: "cardid1",
    };
    if (card !== undefined) {
      const cardtitle = document.createElement("h3");
      this.appendChild(cardtitle);
      cardtitle.textContent = card[0].name;
      const newdiv = document.createElement("div");
      this.appendChild(newdiv);
      newdiv.classList.add("boardcard");
      const toppower = document.createElement("div");
      newdiv.appendChild(toppower);
      toppower.textContent = `${card[0].power[0]}`;
      const midpowers = document.createElement("div");
      newdiv.appendChild(midpowers);
      midpowers.classList.add("boardcardmid");
      const rightpower = document.createElement("div");
      rightpower.textContent = `${card[0].power[1]}`;
      const leftpower = document.createElement("div");
      midpowers.appendChild(leftpower);
      midpowers.appendChild(rightpower);
      leftpower.textContent = `${card[0].power[3]}`;
      const bottompower = document.createElement("div");
      newdiv.appendChild(bottompower);
      bottompower.textContent = `${card[0].power[2]}`;
    }
    const squareclass = currentplayer + "card";
    event.currentTarget.classList.add(squareclass);
    if (currentplayer === "redplayer") {
      //keeptrackofmoves.redplayersquare(selectedsquare);
    } else if (currentplayer === "blueplayer") {
      //keeptrackofmoves.blueplayersquare(selectedsquare);
    }
  };

  const displayDeck = function(playerid: string, deck: Card[]): void {
    const numberofcards = deck.length;
    const playerdiv = document.getElementById(playerid);
    if (numberofcards > 0 && playerdiv.children.length === 0) {
      if (playerdiv !== null) {
        const h2player = document.createElement("h2");
        playerdiv.appendChild(h2player);
        if (playerid === "redplayer") {
          h2player.textContent = "Red Player";
        } else {
          h2player.textContent = "Blue Player";
        }
        for (let i = 0; i < numberofcards; i++) {
          const newdiv = document.createElement("div");
          playerdiv.appendChild(newdiv);
          const title = document.createElement("h3");
          title.classList.add("cardtitle");
          title.textContent = deck[i].name;
          newdiv.appendChild(title);
          newdiv.classList.add("boardcard");
          const toppower = document.createElement("div");
          toppower.textContent = `${deck[i].power[0]}`;
          const midpowers = document.createElement("div");
          const rightpower = document.createElement("div");
          rightpower.textContent = `${deck[i].power[1]}`;
          const bottompower = document.createElement("div");
          bottompower.textContent = `${deck[i].power[2]}`;
          const leftpower = document.createElement("div");
          leftpower.textContent = `${deck[i].power[3]}`;
          midpowers.appendChild(leftpower);
          midpowers.appendChild(rightpower);
          newdiv.appendChild(toppower);
          newdiv.appendChild(midpowers);
          newdiv.appendChild(bottompower);
          newdiv.dataset.card = `${deck[i].cardID}`;
          midpowers.classList.add("boardcardmid");
        }
      }
    }
  };

  useEffect(() => {
    displayDeck("redplayer", redplayerdeck);
    // displayDeck("blueplayer", blueplayerdeck);
  }, []);

  useEffect(() => {
    // get currentplayer from db
    // but how will it rerender? maybe I can import a function from db to check for updates
    setcurrentplayer("redplayer");
  }, []);

  // se calhar tenho de começar por implementar os cliques e a base de dados. já que isto é dinamico. não dá para ser frontend só e esta logica dos cliques não fazem sentido.

  //a logica da ronda tem de ser na base de dados. a app é igual para os dois jogadores. o rendering é que vai actualizando com a base de dados?

  // quando o proximo jogador jogar, tem de se fazer setstate. ou faz refresh a tudo?

  //o score pode ser o modulo diferente
  return (
    <div className="App">
      <div id="redplayer" className="playerdeck" onClick={selectCard}></div>
      <div>
        <div id="score">
          <div>Red Player:</div>
          <div id="scorered">5</div>
          <div>Blue Player:</div>
          <div id="scoreblue">5</div>
        </div>
        <div id="main">
          <div
            id="topleft"
            className="boardsquare cornersquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="topmid"
            className="boardsquare midsquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="topright"
            className="boardsquare cornersquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="midleft"
            className="boardsquare extsquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="midmid"
            className="boardsquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="midright"
            className="boardsquare extsquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="bottomleft"
            className="boardsquare cornersquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="bottommid"
            className="boardsquare midsquare emptysquare"
            onClick={selectSquare}
          ></div>
          <div
            id="bottomright"
            className="boardsquare cornersquare emptysquare"
            onClick={selectSquare}
          ></div>
        </div>
      </div>
      <div id="blueplayer" className="playerdeck" onClick={selectCard}></div>
    </div>
  );
};

export default App;
