import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import checkForOpenGame from "./Firebase";
import { joinGame } from "./Firebase";

const WaitingRoom = function() {
  const [opengame, setopengame] = useState(false);
  const [waitingforplayer, setwaitingforplayer] = useState(false);
  const [gameID, setgameID] = useState("");
  const [checkingdb, setcheckingdb] = useState(true);
  const navigate = useNavigate();

  const gameAvailable = async function() {
    const check = await checkForOpenGame();
    setcheckingdb(false);
    setopengame(check);
  };
  useEffect(() => {
    gameAvailable();
  }, []);

  // if there is player show button, join game

  // else start game and wait

  const handleClickJoin = function(event): void {
    // dispatch to game with docid
    navigate("/game", { state: { gameid: gameID } });
  };

  const handleClickCreate = async function(event) {
    // show waiting
    // listen for changes somehow
    const startgame = await joinGame();
    setgameID(startgame);
    setwaitingforplayer(true);
  };
  return (
    <div>
      {checkingdb && <p>looking for games</p>}
      {opengame && !waitingforplayer && !checkingdb && (
        <button onClick={handleClickJoin}>Join game</button>
      )}
      {!opengame && !waitingforplayer && !checkingdb && (
        <button onClick={handleClickCreate}>Create game</button>
      )}
      {waitingforplayer && <p>waiting for player</p>}
    </div>
  );
};

export default WaitingRoom;

// create user + add deck
// login
