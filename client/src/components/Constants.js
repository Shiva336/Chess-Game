export const xaxis = ['a','b','c','d','e','f','g','h'];
export const yaxis = ['1','2','3','4','5','6','7','8'];

export const gridSize = 100;

export function samePosition(p1, p2) {
  return p1.x === p2.x && p1.y === p2.y;
}

export const position = {
  x: 0,
  y: 0
};

export const PieceType = {
    PAWN: 0,
    BISHOP: 1,
    KNIGHT: 2,
    ROOK: 3,
    QUEEN: 4,
    KING: 5
  };

export const TeamType = {
    OPPONENT: 0,
    OUR: 1
};