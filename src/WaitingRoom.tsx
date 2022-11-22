import React, { useEffect } from "react";
import checkForOpenGames from "./Firebase";

const WaitingRoom = function() {
  useEffect(() => {
    checkForOpenGames();
  }, []);

  // if there is player show button, join game

  // else start game and wait

  return <div></div>;
};

export default WaitingRoom;
