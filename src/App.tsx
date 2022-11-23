import "./App.css";
import type { Card } from "./common/types";
import movesperround from "./Game";
import { blueplayerdeck, redplayerdeck, getcardfromcollection } from "./Game";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const App = function() {
  const [selectedsquare, setselectedsquare] = useState("");
  const [cardselected, setcardselected] = useState("");
  const [finishedselectingcard, setfinishedselectingcard] = useState(false);
  const [currentplayer, setcurrentplayer] = useState("");
  const [count, setcount] = useState(0);
  const [deckdisplayedRed, setdeckdisplayedRed] = useState(false);
  const [deckdisplayedBlue, setdeckdisplayedBlue] = useState(false);
  const [moves, setmoves] = useState([]);
  const [scorered, setscorered] = useState(5);
  const [scoreblue, setscoreblue] = useState(5);
  const keeptrackofmoves = movesperround();
  const location = useLocation();
  const currentGameId = location.state.gameid;

  // with gameid, fetch players ids from db and players decks.

  const selectCard = function(event: React.MouseEvent<HTMLDivElement>): void {
    setcount(count + 1);
    const carddataset = event.currentTarget.dataset.card;
    if (currentplayer !== event.currentTarget.parentElement.id) {
      return;
    }
    if (finishedselectingcard) {
      return;
    }
    event.currentTarget.classList.add("selected");
    const playerdiv = document.getElementById(currentplayer);
    if (playerdiv !== null) {
      const playerdeck = playerdiv.children;
      if (playerdeck.length !== 0) {
        setcardselected(carddataset);
        setmoves((moves) => [...moves, carddataset]);
        setfinishedselectingcard(true);
        if (currentplayer === "redplayer") {
          console.log("keep track red: " + carddataset);
          keeptrackofmoves.redplayercard(carddataset);
        } else if (currentplayer === "blueplayer") {
          console.log("keep track blue: " + carddataset);
          keeptrackofmoves.blueplayercard(carddataset);
        }
      }
    }
  };

  const selectSquare = function(
    event: React.MouseEvent<HTMLDivElement>
  ): void {
    if (!finishedselectingcard) {
      return;
    }
    const squareID = event.currentTarget.id;
    setselectedsquare(squareID);
    setmoves((moves) => [...moves, squareID]);
    const card = getcardfromcollection(cardselected);
    if (card !== undefined) {
      const cardtitle = document.createElement("h3");
      event.currentTarget.appendChild(cardtitle);
      cardtitle.textContent = card.name;
      const newdiv = document.createElement("div");
      event.currentTarget.appendChild(newdiv);
      newdiv.classList.add("boardcard");
      const toppower = document.createElement("div");
      newdiv.appendChild(toppower);
      toppower.textContent = `${card.power[0]}`;
      const midpowers = document.createElement("div");
      newdiv.appendChild(midpowers);
      midpowers.classList.add("boardcardmid");
      const rightpower = document.createElement("div");
      rightpower.textContent = `${card.power[1]}`;
      const leftpower = document.createElement("div");
      midpowers.appendChild(leftpower);
      midpowers.appendChild(rightpower);
      leftpower.textContent = `${card.power[3]}`;
      const bottompower = document.createElement("div");
      newdiv.appendChild(bottompower);
      bottompower.textContent = `${card.power[2]}`;

      const squareclass = currentplayer + "card";
      event.currentTarget.classList.add(squareclass);
      if (currentplayer === "redplayer") {
        const updateGameStatus = keeptrackofmoves.redplayersquare(squareID);
        if (updateGameStatus.length !== 0) {
          updateGameStatus.forEach((square) => changeClassCapturedCard(square));
        }
        setcurrentplayer("blueplayer");
      } else if (currentplayer === "blueplayer") {
        const updateGameStatus = keeptrackofmoves.blueplayersquare(squareID);
        if (updateGameStatus.length !== 0) {
          updateGameStatus.forEach((square) => changeClassCapturedCard(square));
        }
        setcurrentplayer("redplayer");
      }
      setfinishedselectingcard(false);
    }
  };

  const displayDeck = function(playerid: string, deck: Card[]): void {
    const numberofcards = deck.length;
    const playerdiv = document.getElementById(playerid);
    if (numberofcards > 0) {
      if (playerdiv !== null) {
        const carddivs = playerdiv.querySelectorAll<HTMLDivElement>(
          "div.boardcard"
        );

        for (let i = 0; i < numberofcards; i++) {
          const carddiv: HTMLDivElement = carddivs[i];
          carddiv.dataset["card"] = `${deck[i].cardID}`;
          const carddivtitle = carddiv.querySelector("h3");
          carddivtitle.textContent = deck[i].name;
          const toppower = carddiv.querySelector("div.toppower");
          toppower.textContent = `${deck[i].power[0]}`;
          const rightpower = carddiv.querySelector("div.rightpower");
          rightpower.textContent = `${deck[i].power[1]}`;
          const bottompower = carddiv.querySelector("div.bottompower");
          bottompower.textContent = `${deck[i].power[2]}`;
          const leftpower = carddiv.querySelector("div.leftpower");
          leftpower.textContent = `${deck[i].power[3]}`;
        }
      }
    }
  };

  const changeClassCapturedCard = function(squareid: string) {
    const div = document.getElementById(squareid);
    if (div !== undefined) {
      if (currentplayer === "redplayer") {
        div.classList.replace("blueplayercard", "redplayercard");
        setscorered(scorered + 1);
        setscoreblue(scoreblue - 1);
      } else if (currentplayer === "blueplayer") {
        div.classList.replace("redplayercard", "blueplayercard");
        setscoreblue(scoreblue + 1);
        setscorered(scorered - 1);
      }
    }
  };

  useEffect(() => {
    if (!deckdisplayedRed) {
      displayDeck("redplayer", redplayerdeck);
      setdeckdisplayedRed(true);
    }
    if (!deckdisplayedBlue) {
      displayDeck("blueplayer", blueplayerdeck);
      setdeckdisplayedBlue(true);
    }
  }, []);

  useEffect(() => {
    const selectedsquares = document.querySelectorAll("div.selected");
    const selectedsquaresmod = selectedsquares.length % 2;
    if (selectedsquaresmod === 0) {
      setcurrentplayer("redplayer");
    } else if (selectedsquaresmod === 1) {
      setcurrentplayer("blueplayer");
    }
  }, []);

  // se calhar tenho de começar por implementar os cliques e a base de dados. já que isto é dinamico. não dá para ser frontend só e esta logica dos cliques não fazem sentido.

  //a logica da ronda tem de ser na base de dados. a app é igual para os dois jogadores. o rendering é que vai actualizando com a base de dados?

  // quando o proximo jogador jogar, tem de se fazer setstate. ou faz refresh a tudo?

  //o score pode ser o modulo diferente
  return (
    <div className="App">
      <div id="redplayer" className="playerdeck">
        <h2>Red Player</h2>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
      </div>
      <div>
        <div id="score">
          <div>Red Player: </div>
          <div id="scorered">{scorered}</div>
          <div>Blue Player: </div>
          <div id="scoreblue">{scoreblue}</div>
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
      <div id="blueplayer" className="playerdeck">
        <h2>Blue Player</h2>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
        <div className="boardcard" data-card="" onClick={selectCard}>
          <h3 className="cardtitle"></h3>
          <div className="toppower"></div>
          <div className="boardcardmid">
            <div className="leftpower"></div>
            <div className="rightpower"></div>
          </div>
          <div className="bottompower"></div>
        </div>
      </div>
    </div>
  );
};

export default App;
