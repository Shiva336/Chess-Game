import { bishopMove } from './BishopRules';
import {rookMove} from './RookRules';
import { isTileOccupied, isTileOccupiedByOpponent } from './GeneralRules';

export const queenMove = (initialPosition,desiredPosition,type,team,boardState) => {
    return (bishopMove(initialPosition,desiredPosition,type,team,boardState) || rookMove(initialPosition,desiredPosition,type,team,boardState));
}

export const getPossibleQueenMoves = (queen,boardState) => {
    const possibleMoves = [];
    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x + i, y: queen.position.y + i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x + i, y: queen.position.y - i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x - i, y: queen.position.y - i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x - i, y: queen.position.y + i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x + i, y: queen.position.y};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x - i, y: queen.position.y};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x, y: queen.position.y + i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: queen.position.x, y: queen.position.y - i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,queen.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;
}