import React, { useRef,useState } from 'react';
import './Chessboard.css'
import Tile from '../Tile/Tile';
  import { xaxis, yaxis, gridSize, samePosition } from '../Constants';

function Chessboard({pieces, playMove}) {
    const [activePiece, setActivePiece] = useState(null);
    const [grabPosition, setGrabPosition] = useState({x: -1, y:-1});
    const chessboardRef = useRef(null);
    let board = [];

    function playMoveSound(path) {
        const moveSound = new Audio(path);
        moveSound.currentTime = 0;  
        moveSound.play();           
    }

    function grabPiece(e) {
        const element = e.target;
        const chessboard = chessboardRef.current;
        e.preventDefault();
        
        if(element.classList.contains("chess-piece") && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft)/gridSize);
            const grabY = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/gridSize));
            setGrabPosition({x: grabX, y:grabY});

            const x = e.clientX - 50;
            const y = e.clientY  -50;
            element.style.position = 'absolute';
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;
            
            setActivePiece(element);
        }
    }
    
    function movePiece(e) {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard) {
            const minX = chessboard.offsetLeft-25;
            const minY = chessboard.offsetTop-25;
            const maxX = chessboard.offsetLeft + chessboard.clientWidth-75;
            const maxY = chessboard.offsetTop + chessboard.clientHeight-75;
            const x = e.clientX - 50;
            const y = e.clientY  -50;
            activePiece.style.position = 'absolute';

            activePiece.style.left = (x < minX) ? `${minX}px` : `${x}px`;
            activePiece.style.top = (y < minY) ? `${minY}px` : `${y}px`;
            activePiece.style.left = (x > maxX) ? `${maxX}px` : `${x}px`;
            activePiece.style.top = (y > maxY) ? `${maxY}px` : `${y}px`;
        }
    }
    
    function dropPiece(e) {
        const chessboard = chessboardRef.current;
        if(activePiece && chessboard) {
            const x = Math.floor((e.clientX - chessboard.offsetLeft)/gridSize);
            const y = Math.abs(Math.ceil((e.clientY - chessboard.offsetTop - 800)/gridSize));
            const currentpiece = pieces.find(p => samePosition(grabPosition, p.position));

            if(currentpiece) {
                var success = playMove(currentpiece, {x,y});
                if(!success) {
                    activePiece.style.position = 'relative';
                    activePiece.style.removeProperty('top');
                    activePiece.style.removeProperty('left');
                } else {
                    playMoveSound('assets/audio/move-self.mp3')
                    console.log("music")
                }
            }
            setActivePiece(null);
        }
    }

    for(let j=yaxis.length-1; j>=0; j--) {
        for(let i=0; i<xaxis.length; i++) {
            const n = i+j+2;
            const piece = pieces.find(p => samePosition(p.position, {x: i, y: j}));
            let image = piece? piece.image : undefined;

            let currentpiece = (activePiece != null) ? pieces.find(p => samePosition(grabPosition, p.position)) : undefined;
            let highlight = (currentpiece?.possibleMoves) ? currentpiece.possibleMoves.some(p=> samePosition(p, {x:i, y:j})) : false;

            board.push(<Tile key={`${i},${j}`} number={n} image={image} highlight={highlight}/>)  
        }
    }
  return (
    <>
    <div 
        onMouseMove={e => movePiece(e)} 
        onMouseDown={e => grabPiece(e)} 
        onMouseUp={e => dropPiece(e)} 
        id='chessboard'
        ref={chessboardRef}
    >
        {board}
    </div>
    </>
  )
}

export default Chessboard