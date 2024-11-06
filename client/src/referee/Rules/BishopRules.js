import { samePosition } from "../../components/Constants";
import {isTileEmptyOrOccupiedByOpponent, isTileOccupied, isTileOccupiedByOpponent} from './GeneralRules';

export const bishopMove = (initialPosition,desiredPosition,type,team,boardState) => {
    for(let i=1; i<8; i++) {
        let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : 1;
        let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : 1;

        let passedPosition = {x: initialPosition.x + (i * multiplierX), y: initialPosition.y + (i * multiplierY)};
        if(samePosition(desiredPosition,passedPosition)) {
            if(isTileEmptyOrOccupiedByOpponent(desiredPosition,boardState,team)) {
                return true;
            }  
        }
            else if(isTileOccupied(passedPosition,boardState)) {
            break;
        } 
    }   
    return false;     
}

export const getPossibleBishopMoves = (bishop,boardState) => {
    const possibleMoves = [];
    for(let i=1; i<8; i++) {
        const destination = {x: bishop.position.x + i, y: bishop.position.y + i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: bishop.position.x + i, y: bishop.position.y - i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: bishop.position.x - i, y: bishop.position.y - i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<8; i++) {
        const destination = {x: bishop.position.x - i, y: bishop.position.y + i};

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,bishop.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves;    
}