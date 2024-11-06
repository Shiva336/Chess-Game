const router = require("express").Router();
const {getPossiblKingMoves, getPossibleBishopMoves, getPossiblePawnMoves, getPossibleRookMoves, getPossibleQueenMoves, getPossibleKnightMoves}  = require('../rules/index');

router.get("/pawnmoves", async(req,res)=> {
  try{
    const possibleMoves =  getPossiblePawnMoves(req.body.piece, req.body.board);
    res.status(200).json({possibleMoves: possibleMoves});
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

router.get("/knightmoves", async(req,res)=> {
  try{
    const possibleMoves =  getPossibleKnightMoves(req.body.piece, req.body.board);
    res.status(200).json({possibleMoves: possibleMoves});
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

router.get("/bishopmoves", async(req,res)=> {
  try{
    const possibleMoves =  getPossibleBishopMoves(req.body.piece, req.body.board);
    res.status(200).json({possibleMoves: possibleMoves});
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

router.get("/queenmoves", async(req,res)=> {
  try{
    const possibleMoves =  getPossibleQueenMoves(req.body.piece, req.body.board);
    res.status(200).json({possibleMoves: possibleMoves});
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

router.get("/kingmoves", async(req,res)=> {
  try{
    const possibleMoves =  getPossiblKingMoves(req.body.piece, req.body.board);
    res.status(200).json({possibleMoves: possibleMoves});
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

router.get("/rookmoves", async(req,res)=> {
  try{
    const possibleMoves =  getPossibleRookMoves(req.body.piece, req.body.board);
    res.status(200).json({possibleMoves: possibleMoves});
  }
  catch(err) {
    return res.status(500).json(err);
  }
});

module.exports = router;