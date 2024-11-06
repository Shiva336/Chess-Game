import React from "react";
import './Tile.css';

function Tile({ number, image, highlight}) {
  const className = ["tile", number%2 === 0 && "black-tile", number%2 === 1 && "white-tile", highlight && "tile-highlight",
    image && "chess-piece-tile"
  ].filter(Boolean).join(' ');

    return (
      <div className={className}>
        { image && <div style={{backgroundImage: `url(${image})`}} className='chess-piece'></div>}
      </div>
    )
}

export default Tile