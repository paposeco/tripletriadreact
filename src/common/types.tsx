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

export { Square, Card };
