import { samePosition } from "../../components/Constants";
import {isTileEmptyOrOccupiedByOpponent, isTileOccupiedByOpponent, isTileOccupied} from './GeneralRules';

export const rookMove = (initialPosition,desiredPosition,type,team,boardState) => {
    if(initialPosition.x === desiredPosition.x) {
        for(let i=1; i<8; i++) {
            let multiplier = (desiredPosition.y < initialPosition.y) ? -1 : 1;
            let passedPosition = {x: initialPosition.x, y:initialPosition.y + (i * multiplier)};
            if(samePosition(passedPosition,desiredPosition)) {
                if(isTileEmptyOrOccupiedByOpponent(passedPosition,boardState,team)) {
                    return true;
                }
            } 
            else if(isTileOccupied(passedPosition,boardState)){
                break;
            }
        }
    }

    if(initialPosition.y === desiredPosition.y) {
        for(let i=1; i<8; i++) {
            let multiplier = (desiredPosition.x < initialPosition.x) ? -1 : 1;
            let passedPosition = {x: initialPosition.x + (i * multiplier), y:initialPosition.y};
            if(samePosition(passedPosition,desiredPosition)) {
                if(isTileEmptyOrOccupiedByOpponent(passedPosition,boardState,team)) {
                    return true;
                }
            }
            else if(isTileOccupied(passedPosition,boardState)){
                break;
            }
        }
    }
    return false;
}

export const getPossibleRookMoves = (rook,boardState) => {
    const possibleMoves = [];
    for(let i=1; i<8; i++) {
        if(rook.position.x + i > 7) break;
        const destination = {x: rook.position.x + i, y: rook.position.y};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        if(rook.position.x - i < 0) break;
        const destination = {x: rook.position.x - i, y: rook.position.y};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        if(rook.position.y + i > 7) break;
        const destination = {x: rook.position.x, y: rook.position.y + i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        if(rook.position.x - i < 0) break;
        const destination = {x: rook.position.x, y: rook.position.y - i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,rook.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    
    return possibleMoves;    
}