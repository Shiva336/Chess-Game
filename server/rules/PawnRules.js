import { samePosition, TeamType } from "./Constants";
import {isTileOccupied, isTileOccupiedByOpponent} from './GeneralRules';

export const pawnMove = (initialPosition,desiredPosition,type,team,boardState) => {
    const specialrow = (team === TeamType.OUR) ? 1 : 6;
    const pawnDirection = (team === TeamType.OUR) ? 1 : -1;

    if(initialPosition.x === desiredPosition.x && initialPosition.y === specialrow &&  desiredPosition.y - initialPosition.y === 2*pawnDirection) {
        if(!isTileOccupied(desiredPosition,boardState) && !isTileOccupied({x: desiredPosition.x, y: desiredPosition.y-pawnDirection },boardState))
             return true;
    }
    else if(initialPosition.x === desiredPosition.x && desiredPosition.y - initialPosition.y === pawnDirection) {
        if(!isTileOccupied(desiredPosition,boardState)) 
            return true;
    }

        //ATTACK Pawn
    else if(desiredPosition.x - initialPosition.x === -1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        if(isTileOccupiedByOpponent(desiredPosition,boardState,team)) {
            return true;
        }
    }
    else if(desiredPosition.x - initialPosition.x === 1 && desiredPosition.y - initialPosition.y === pawnDirection) {
        if(isTileOccupiedByOpponent(desiredPosition,boardState,team)) {
            return true;
        }
    }
    return false;
}

export const getPossiblePawnMoves = (pawn, boardState) => {
    const possibleMoves = [];
    const specialrow = (pawn.team === TeamType.OUR) ? 1 : 6;
    const pawnDirection = (pawn.team === TeamType.OUR) ? 1: -1;

    const normalMove = {x: pawn.position.x, y: pawn.position.y + pawnDirection};
    const specialMove = {x: pawn.position.x, y: pawn.position.y + pawnDirection * 2};
    const leftAttack = {x: pawn.position.x-1, y: pawn.position.y + pawnDirection};
    const rightAttack ={x: pawn.position.x+1, y: pawn.position.y + pawnDirection};
    const leftPosition = {x: pawn.position.x-1, y: pawn.position.y};
    const rightPosition ={x: pawn.position.x+1, y: pawn.position.y};

    if(!isTileOccupied(normalMove, boardState)) {
        possibleMoves.push(normalMove);
        if(pawn.position.y === specialrow && !isTileOccupied(specialMove, boardState)) {
            possibleMoves.push(specialMove);
        }
    }

    if(isTileOccupiedByOpponent(leftAttack,boardState,pawn.team)) {
        possibleMoves.push(leftAttack);
    } else if(!isTileOccupied(leftAttack,boardState)) {
        const leftPiece = boardState.find(p => samePosition(p.position,leftPosition));
        if(leftPiece != null && leftPiece.enPassant) {
            possibleMoves.push(leftAttack);
        }
    }

    if(isTileOccupiedByOpponent(rightAttack,boardState,pawn.team)) {
        possibleMoves.push(rightAttack);
    } else if(!isTileOccupied(rightAttack,boardState)) {
        const rightPiece = boardState.find(p => samePosition(p.position,rightPosition));
        if(rightPiece != null && rightPiece.enPassant) {
            possibleMoves.push(rightAttack);
        }
    }

    return possibleMoves;
}