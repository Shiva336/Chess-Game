import { PieceType, TeamType } from "./Constants";
let initialBoardState = [];

for(let p=0; p<2; p++) {
    const teamType = (p===0) ? TeamType.OPPONENT : TeamType.OUR;
    const type = (teamType === TeamType.OPPONENT) ? "b" : "w";
    const y = (teamType === TeamType.OPPONENT)? 7 : 0;

    initialBoardState.push({image:`assets/images/rook_${type}.png` , position: {x:0, y:y}, type: PieceType.ROOK,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/rook_${type}.png` , position: {x:7, y:y}, type: PieceType.ROOK,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/knight_${type}.png` , position: {x:1, y:y}, type: PieceType.KNIGHT,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/knight_${type}.png` , position: {x:6, y:y}, type: PieceType.KNIGHT,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/bishop_${type}.png` , position: {x:2, y:y}, type: PieceType.BISHOP,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/bishop_${type}.png` , position: {x:5, y:y}, type: PieceType.BISHOP,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/queen_${type}.png` , position: {x:3, y:y}, type: PieceType.QUEEN,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
    initialBoardState.push({image:`assets/images/king_${type}.png` , position: {x:4, y:y}, type: PieceType.KING,team: teamType, enPassant: false, possibleMoves: [], hasMoved: false});
}

for(let i=0; i<8; i++) {
    initialBoardState.push({image:"assets/images/pawn_b.png" , position: {x:i, y:6}, type: PieceType.PAWN,team: TeamType.OPPONENT, enPassant: false, possibleMoves: [], hasMoved: false});
}

for(let i=0; i<8; i++) {
    initialBoardState.push({image:"assets/images/pawn_w.png" , position: {x:i, y:1}, type: PieceType.PAWN,team: TeamType.OUR, enPassant: false, possibleMoves: []});
}

export default initialBoardState;