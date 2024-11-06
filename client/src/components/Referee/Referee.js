import Chessboard from "../Chessboard/Chessboard";
import { useState, useRef, useEffect } from "react";
import initialBoardState from "../initialBoardState";
import { PieceType, TeamType, samePosition } from "../Constants";
import { getCastlingMoves, getPossiblKingMoves, getPossibleBishopMoves, getPossibleKnightMoves, getPossiblePawnMoves, getPossibleQueenMoves , getPossibleRookMoves } from "../../referee/Rules/Index";
import './Referee.css';

export default function Referee() {
    const [pieces,setPieces] = useState(initialBoardState);
    const [promotionPawn, setPromotionPawn] = useState(null);
    const modalRef = useRef(null);
    const checkmateRef = useRef(null);
    const [totalTurns, setTotalTurns] = useState(1);
    let winningTeam = -1;
    const [message,setMessage] = useState("");

    useEffect(()=> {
        updatePossibleMoves();
    },[])

    function gameResult(enemyMoves, pawnPromotion) {
        const fakepieces = pieces.filter(p => totalTurns === 0 ? p.team !== currentTeam() : p.team === currentTeam()).some(p => p.possibleMoves!== undefined && p.possibleMoves.length > 0);
        
        if(fakepieces || pawnPromotion) {
                return;
        }

        const kingPosition = pieces.find(p=> p.type === PieceType.KING && p.team === currentTeam()).position;

        if(enemyMoves.some(m => samePosition(m,kingPosition))) {
            winningTeam = currentTeam() === TeamType.OUR? 0 : 1;
            setMessage(`The winning team is: ${winningTeam === 1 ? "white" : "black"}`)
        } else {
            setMessage("It's a stalemate!")
        }
        checkmateRef.current?.classList.remove("hidden");
    }

    function updateAllMoves() {
        setPieces((currentpieces) => {
            return currentpieces.map((p) => {
                p.possibleMoves =  getValidMoves(p, currentpieces);
                return p;
            });
        });

        const updatedPieces = [...pieces];
        for (const king of updatedPieces.filter(p => p.type === PieceType.KING)) {
            if (king.possibleMoves === undefined) continue;

            king.possibleMoves = [...king.possibleMoves, ...getCastlingMoves(king, pieces)];
        }
        setPieces(updatedPieces);
    }

    function updatePossibleMoves(pawnPromotion = false) { 
        updateAllMoves();
        checkCurrentTeamMoves();

        const enemyMoves = pieces.filter(p => p.team !== currentTeam()).map(p => p.possibleMoves).flat();
        const modifiedPieces = [...pieces];
        for(const piece of modifiedPieces.filter( p=> p.team !== currentTeam())) {
            piece.possibleMoves = [];
        }
        setPieces(modifiedPieces);  

        gameResult(enemyMoves,pawnPromotion);
    }

    function currentTeam() {
        if(totalTurns%2 === 1)  return TeamType.OPPONENT;
        else return TeamType.OUR;
    }   

    function checkCurrentTeamMoves() {
        for (const piece of pieces.filter( p=> p.team === currentTeam())) {
            if(piece?.possibleMoves === undefined) continue;

            for(const move of piece.possibleMoves) {
                let fakepieces = JSON.parse(JSON.stringify(pieces));
                fakepieces = fakepieces.filter(p => !samePosition(p.position,move));

                const clonedPiece = fakepieces.find(p => samePosition(p.position, piece.position));
                if(clonedPiece === undefined) {
                    continue;
                }
                clonedPiece.position = move;

                const king = fakepieces.find(p => p.type === PieceType.KING && p.team === currentTeam())

                for(const enemy of fakepieces.filter(p => p.team !== currentTeam())) {
                    enemy.possibleMoves = getValidMoves(enemy,fakepieces);
                    if(enemy.possibleMoves === undefined || king === undefined || king.position === undefined)  continue;

                    if(enemy.type === TeamType.PAWN) {
                        if(enemy.possibleMoves.some(m => m.x !== enemy.position.x && samePosition(king.position, m))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !samePosition(m,move));
                        }
                    } else {
                        if(enemy.possibleMoves.some(m =>samePosition(king.position, m))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !samePosition(m,move));
                        }
                    }
                }
            }
        }
    }

    function playMove(Playedpiece, destination) {
        if(Playedpiece.possibleMoves === undefined) return false;
        if(Playedpiece.team === TeamType.OPPONENT && totalTurns%2 !== 0)    return false;
        if(Playedpiece.team === TeamType.OUR && totalTurns%2 !== 1)    return false;

        const validMove = Playedpiece.possibleMoves?.some(m => samePosition(m,destination));  //check if move is valid
        if(!validMove)
            return false;

        const enPassantMove = isEnPassantMove(Playedpiece.position,destination,Playedpiece.type,Playedpiece.team);
        
        const pawnDirection = Playedpiece.team === TeamType.OUR ? 1 : -1;
        const destinationPiece = pieces.find(p => samePosition(p.position,destination));

        if(destinationPiece && Playedpiece.type === PieceType.KING && destinationPiece.type === PieceType.ROOK && destinationPiece.team === Playedpiece.team) {
            const direction = (destinationPiece.position.x - Playedpiece.position.x > 0) ? 1 : -1;
            const kingNewPosition = Playedpiece.position.x + 2 * direction;

            setPieces((currentpieces) => {
                return currentpieces.map((piece) => {
                    if(samePosition(piece.position,Playedpiece.position)) {
                        piece.position.x = kingNewPosition;
                    } else if(samePosition(piece.position, destinationPiece.position)) {
                        piece.position.x = kingNewPosition - direction;
                    }
                    return piece;
                })
            });

            setTotalTurns(totalTurns +1);
            //updatePossibleMoves();
            setPieces((currentpieces) => {
                return currentpieces.map((p) => {
                    p.possibleMoves =  getValidMoves(p, currentpieces);
                    return p;
                });
            });
            const modifiedPieces = [...pieces];
            for(const piece of modifiedPieces.filter( p=> p.team !== currentTeam())) {
                piece.possibleMoves = [];
            }
            setPieces(modifiedPieces);
            return true;
        }

        else if(enPassantMove) {
            const updatedPieces = pieces.reduce((results,piece) => {
                if(samePosition(piece.position, Playedpiece.position)) {
                    piece.enPassant = false;
                    piece.position.x = destination.x; 
                    piece.position.y = destination.y;
                    piece.hasMoved = true;
                    results.push(piece);
                }
                else if(!(piece.position.x === destination.x && piece.position.y === destination.y - pawnDirection)) {
                    if(piece.type === PieceType.PAWN) {
                        piece.enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            },[]);
            updatePossibleMoves();
            setPieces(updatedPieces);
        }

        else if(validMove) {
            let pp = false;
            const updatedPieces = pieces.reduce((results, piece) => {
                if(samePosition(piece.position,destination)) {
                    
                }
                else if(samePosition(piece.position, Playedpiece.position)) {
                    if(piece.type === PieceType.PAWN)
                        piece.enPassant = Math.abs(Playedpiece.position.y - destination.y) === 2 && piece.type === PieceType.PAWN;
                    piece.position.x = destination.x; 
                    piece.position.y = destination.y;
                    piece.hasMoved = true;

                    let promotionRow = (piece.team === TeamType.OUR) ? 7 : 0;
                    if(destination.y === promotionRow && piece.type === PieceType.PAWN) {
                        modalRef.current?.classList.remove('hidden');
                        pp=true;
                        setPromotionPawn(piece);
                    }
                    results.push(piece);
                }
                else if(!(samePosition(piece.position,destination))) {
                    if(piece.type === PieceType.PAWN) {
                        piece.enPassant = false;
                    }
                    results.push(piece);
                }
                return results;
            }, []);
            updatePossibleMoves(pp);
            setPieces(updatedPieces);   
        }
        else {
            return false;
        }    
        setTotalTurns(totalTurns +1);
        return true;
    }

    function isEnPassantMove(initialPosition,desiredPosition,type,team) {
        const pawnDirection = (team === TeamType.OUR) ? 1 : -1;
        if(type === PieceType.PAWN) {
            if((desiredPosition.x-initialPosition.x === -1 || desiredPosition.x-initialPosition.x === 1) && desiredPosition.y-initialPosition.y === pawnDirection) { //piece in left or right side 
                const piece = pieces.find((p )=> p.position.x === desiredPosition.x && p.position.y === desiredPosition.y - pawnDirection && p.enPassant); 
                if(piece) 
                    return true;
            }
        }
        return false;
    }

    function getValidMoves(piece, pieces) {
        switch(piece.type) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece,pieces);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece,pieces);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece,pieces);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece,pieces);
            case PieceType.KING:
                return getPossiblKingMoves(piece,pieces);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece,pieces);
            default:
                return [];
        }
    }

    function promotePawn(pieceType) {
        const updatedPieces = pieces.reduce((results,piece) => {
            if(samePosition(piece.position,promotionPawn.position)) {
                piece.type = pieceType;
                const teamType = (piece.team === TeamType.OUR) ? "w" : "b";
                let image = "";
                switch(pieceType) {
                    case PieceType.ROOK: 
                        image = "rook";
                        break;
                    case PieceType.KNIGHT: 
                        image = "knight";
                        break;
                    case PieceType.BISHOP: 
                        image = "bishop";
                        break;
                    case PieceType.QUEEN: 
                        image = "queen";
                        break;
                    default:
                        image = undefined;
                        break; 
                }
                piece.image = `assets/images/${image}_${teamType}.png`;
                piece.hasMoved = true;
            }
            results.push(piece);
            return results;
        },[]);
        updatePossibleMoves();
        setPieces(updatedPieces);
        modalRef.current?.classList.add('hidden');
    }

    function promotionTeamType() {
        return (promotionPawn?.team === TeamType.OUR) ? "w" : "b"; 
    }

    function RestartGame() {
        window.location.reload();
    }

    return <>
    <div className='modal hidden' ref={modalRef}>
        <div className='modal-body'>
            <img alt='promotion piece' onClick={() => promotePawn(PieceType.ROOK)} src={`assets/images/rook_${promotionTeamType()}.png`} />
            <img alt='promotion piece' onClick={() => promotePawn(PieceType.BISHOP)} src={`assets/images/bishop_${promotionTeamType()}.png`} />
            <img alt='promotion piece' onClick={() => promotePawn(PieceType.KNIGHT)} src={`assets/images/knight_${promotionTeamType()}.png`} />
            <img alt='promotion piece' onClick={() => promotePawn(PieceType.QUEEN)} src={`assets/images/queen_${promotionTeamType()}.png`} />
        </div>
    </div>
    <div className='modal hidden' ref={checkmateRef}>
        <div className="modal-body">
            <div className="checkmate-body">
                <span> {message} </span>
                <button onClick={RestartGame}>Play again</button>
            </div>
        </div>
    </div>
    <main>
        <Chessboard pieces={pieces} playMove={playMove}/>
        <div className="information">
            <p>Total turns: {totalTurns-1}</p>
            <p>Current team: {currentTeam() === TeamType.OUR ? "black" : "white"}</p>
        </div>
    </main>
    </>
}