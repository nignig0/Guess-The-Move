import type { GameItem } from "../types";
import '../styles/gameItemComponent.css';
import { useNavigate } from "react-router-dom";

interface GameItemComponentProps {
        game: GameItem
    }
 
export const GameItemComponent = ({game}: GameItemComponentProps)=>{
    const navigate = useNavigate();
    console.log(game._id);
    return (
        <div id='mainComponentDiv'>
            <div 
                id='whiteDiv' className='playerDiv'
                onClick = {()=>{
                    navigate(`/game/w/${game._id!}`);
                }}
            >
                <h2>{game.white_player}</h2>
                <h3>{game.white_elo ?? ''}</h3>
                <p>{game.event} {game.year}</p>
            </div>
             <div 
                id='blackDiv' className='playerDiv'
                onClick = {()=>{
                    navigate(`/game/b/${game._id!}`);
                }}    
            >
                <h2>{game.black_player}</h2>
                <h3>{game.black_elo ?? ''}</h3>
                <p>result: {game.result}</p>
             </div>
        </div>
    );
}