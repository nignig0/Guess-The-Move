import { Chess } from "chess.js";
import { useState, useRef, useEffect } from "react";
import { type PieceDropHandlerArgs, Chessboard } from "react-chessboard";
import { getGameById } from "../api/games";
import { TURNS } from "../enum";
import { useParams } from "react-router-dom";

export const GamePage = ()=>{

  interface CorrectMoveArrayType {
    moveNumber: number
    whiteMove: string, 
    blackMove?: string,
  }

  const { gameId, color } = useParams();

  const [chess, setChess] = useState(new Chess());
  const moveNumber = useRef<number>(0);
  const [moves, setMoves] = useState<CorrectMoveArrayType[]>([]);
  const correctGuesses = useRef<number>(0);

  useEffect(()=>{
    console.log('loading game');
    const loadGame = async()=>{
      const game = await getGameById(gameId!);
      if(!game) return;
      const gameMoves = game.moves;
      const newMoves = new Array(gameMoves.length+1);
      
      for(let i = 0; i<gameMoves.length; i+=2){
        const moveNumber = gameMoves[i].moveNumber!;
        const whiteMove = gameMoves[i].notation;
        const blackMove = (i+1 < gameMoves.length) ? gameMoves[i+1].notation : undefined;

        newMoves[moveNumber] = {
          moveNumber,
          whiteMove, 
          blackMove,
        };
      }

      setMoves(newMoves);
    }

    loadGame();
    
    //add listener for the backwards keystroke
    // document.addEventListener('keydown', (e: KeyboardEvent)=>{
    //   if(e.key === "ArrowLeft"){
    //     loadMove(false);
    //   }else if(e.key === "ArrowRight"){
    //     loadMove();
    //   }
    // })
    

  }, []);

  useEffect(()=>{
    if(moves.length === 0) return;
    loadInitialPositions();
  }, [moves])

  const handlePieceDrop = ({piece, sourceSquare, targetSquare} :PieceDropHandlerArgs)=>{

    const currentMoveNumber = moveNumber.current;

    const chessboardCopy = new Chess(chess.fen());
    const move = chessboardCopy.move({from: sourceSquare, to: targetSquare!});
    console.log('currentMove -> ', moveNumber);
    console.log(moves);
    const correctMove = (color === TURNS.WHITE) ? moves[currentMoveNumber+1].whiteMove : moves[currentMoveNumber].blackMove!;
    console.log("Correct move -> ", correctMove);
    console.log("Guess -> ", move.san);
    if(correctMove === move.san){
      correctGuesses.current+=1;
      alert('nice!');
    }else{
      alert("Better luck next time!");
    }

    //if the move that we gussed hasn't been guessed before (and it most likely hasn't been)
    //mark it as guessed

    loadMove();
    
    return true;
  }

  const loadInitialPositions = async()=>{
    const chessboardCopy = new Chess(chess.fen());
    for(let i = 1; i<= Math.min(15, moves.length); ++i){
      chessboardCopy.move(moves[i].whiteMove);

      if(moves[i].blackMove) {
        chessboardCopy.move(moves[i].blackMove!);
      }
      moveNumber.current+=1;
    }
    if(color === TURNS.BLACK && moves.length >= 16){
        chessboardCopy.move(moves[16].whiteMove);
        moveNumber.current+=1;
    }
        
    
    setChess(new Chess(chessboardCopy.fen()));
  }

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const loadMove = async (next:boolean = true)=>{
    const isUserWhite = (color === TURNS.WHITE);
    let newMoveNumber = (isUserWhite) ?  moveNumber.current+1 : moveNumber.current;
    //the user should not be able to skip forward 

    const chessboardCopy = new Chess(chess.fen());

    chessboardCopy.move((isUserWhite) ? moves[newMoveNumber].whiteMove : moves[newMoveNumber].blackMove!);
    
    setChess(new Chess(chessboardCopy.fen()));
    await delay(1000);
    if(isUserWhite && moves[newMoveNumber].blackMove) {
        chessboardCopy.move(moves[newMoveNumber].blackMove!);
        setChess(new Chess(chessboardCopy.fen()));
        
    }else{
        //if the user is black then
        //we make the next move 
        //and increment the move number
        newMoveNumber+=1;
        chessboardCopy.move(moves[newMoveNumber].whiteMove);
        setChess(new Chess(chessboardCopy.fen()));
        console.log('After white move => ', newMoveNumber);
        
    }
    moveNumber.current = newMoveNumber;
    if(moveNumber.current === moves.length - 1) console.log(`Game over! You guessed ${correctGuesses.current}/${moves.length - 15} moves correct!`);
    

  }


  return (
    <>
    <div>
      <Chessboard options={{
        position: chess.fen(),
        onPieceDrop: handlePieceDrop,
        showAnimations: true,
        animationDurationInMs: 1000,
        boardOrientation: (color === TURNS.WHITE) ? 'white' : 'black',
    
      }} />
    </div>
    </>
  )

};