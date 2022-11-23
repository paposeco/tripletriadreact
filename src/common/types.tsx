interface Card {
    name: string;
    power: [number, number, number, number];
    face: string;
    cardID: string;
}

interface Square {
    playerID: string;
    cardID: string;
    power: [number, number, number, number];
}

interface OpenGameDataDB {
    players: number;
    player1: string;
    player2: string;
}

export { Square, Card, OpenGameDataDB };
