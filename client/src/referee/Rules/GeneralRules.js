import { samePosition } from "../../components/Constants";

export const isTileOccupied = (tilePosition,boardState) => {
    const piece = boardState.find(p => samePosition(tilePosition,p.position));

    if(piece) return true;
    else return false;
}

export const isTileOccupiedByOpponent = (tilePosition,boardState,team) => {
    const piece = boardState.find(p =>samePosition(tilePosition,p.position) && p.team !== team);
    
    if(piece) return true;
    else return false;
}

export const isTileEmptyOrOccupiedByOpponent = (tilePosition,boardState,team) => {
    return (!isTileOccupied(tilePosition,boardState,team) || isTileOccupiedByOpponent(tilePosition,boardState,team));
}