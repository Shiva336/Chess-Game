import { PieceType, samePosition } from "../../components/Constants";
import {isTileEmptyOrOccupiedByOpponent, isTileOccupied, isTileOccupiedByOpponent} from './GeneralRules';

export const kingMove = (initialPosition,desiredPosition,type,team,boardState) => {
    let multiplierX = (desiredPosition.x < initialPosition.x) ? -1 : (desiredPosition.x > initialPosition.x) ? 1 : 0;
    let multiplierY = (desiredPosition.y < initialPosition.y) ? -1 : (desiredPosition.y > initialPosition.y) ? 1 : 0;

    let passedPosition = {x: initialPosition.x + multiplierX, y: initialPosition.y + multiplierY};  
    if(samePosition(passedPosition,desiredPosition)) {
        if(isTileEmptyOrOccupiedByOpponent(passedPosition,boardState,team)) {
            return true;
        }
    }

    return false;
}

function checkOutOfBounds(destination) {
    if(destination.x < 0 || destination.x > 7 || destination.y < 0 || destination.y > 7) return true;
    return false;
}

export const getPossiblKingMoves = (king,boardState) => {
    const possibleMoves = [];
    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x + i, y: king.position.y + i};
        if(checkOutOfBounds(destination)) break;

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x + i, y: king.position.y - i};
        if(checkOutOfBounds(destination)) break;
        
        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x - i, y: king.position.y - i};
        if(checkOutOfBounds(destination)) break;

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x - i, y: king.position.y + i};
        if(checkOutOfBounds(destination)) break;

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x + i, y: king.position.y};
        if(checkOutOfBounds(destination)) break;

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x - i, y: king.position.y};
        if(checkOutOfBounds(destination)) break;

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x, y: king.position.y + i};
        if(checkOutOfBounds(destination)) break;

        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    for(let i=1; i<2; i++) {
        const destination = {x: king.position.x, y: king.position.y - i};
        if(checkOutOfBounds(destination)) break;
        
        if(!isTileOccupied(destination,boardState)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination,boardState,king.team)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }
    return possibleMoves
}

export const getCastlingMoves = (king,boardState) => {
    const possibleMoves = [];
    if(king.hasMoved) return possibleMoves;
    
    const rooks = boardState.filter(p => p.type === PieceType.ROOK && !p.hasMoved && p.team === king.team);

    for(const rook of rooks) {
        const direction = (rook.position.x - king.position.x > 0) ? 1 : -1;

        const originalPosition = king.position;
        const adjacentPosition = JSON.parse(JSON.stringify(king.position));
        adjacentPosition.x += direction;

        if(!rook.possibleMoves?.some(m => samePosition(m,adjacentPosition))) continue;

        const concerningTiles = rook.possibleMoves.filter(m => m.y === king.position.y);

        const enemyPieces = boardState.filter(p => p.team !== king.team);

        let valid = true;

        for(const enemy of enemyPieces) {
            if(enemy.possibleMoves === undefined) continue;

            for(const move of enemy.possibleMoves) {
                if(samePosition(king.position,move)) {
                    valid = false;
                }
                else if(concerningTiles.some(t => samePosition(move,t))) {
                    valid = false;
                }
          
                if(!valid)
                    break;
            }
            if(!valid) break;
        }
        if(!valid)continue;

        possibleMoves.push(rook.position);
        king.position = originalPosition;
    }

    return possibleMoves;
}