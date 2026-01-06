import type { GameItem } from "../types";
import { useNavigate } from "react-router-dom";

interface GameItemComponentProps {
        game: GameItem
    } 
 
export const GameItemComponent = ({game}: GameItemComponentProps)=>{
    const navigate = useNavigate();
    console.log(game._id);

    const h2ClassNames = 'p-0 m-0 text-[14px]';
    const h3ClassNames = 'p-0 m-0 text-[10px]';
    const pClassNames = 'p-0 m-0 text-[10px]';
    const playerDivClassNames = 'w-full flex flex-col justify-start pl-1 pr-1 h-full'; 
    return (
        <div className='flex justify-center w-[600px] h-[54px] border border-black m-2.5 cursor-pointer'>
            <div 
                className={`${playerDivClassNames} m-0 hover:shadow-[3px_3px_3px_grey]`} 
                onClick = {()=>{
                    navigate(`/game/w/${game._id!}`);
                }}
            >
                <h2 className={`${h2ClassNames} text-black`}>{game.white_player}</h2>
                <h3 className={`${h3ClassNames} text-black`}>{game.white_elo ?? ''}</h3>
                <p className={`${pClassNames} text-black`}>{game.event} {game.year}</p>
            </div>
             <div 
                className={`${playerDivClassNames} bg-black m-0 items-end hover:shadow-[3px_3px_3px_grey]`}
                onClick = {()=>{
                    navigate(`/game/b/${game._id!}`);
                }}    
            >
                <h2 className={`${h2ClassNames} text-white`}>{game.black_player}</h2>
                <h3 className={`${h3ClassNames} text-white`}>{game.black_elo ?? ''}</h3>
                <p className={`${pClassNames} text-white`}>result: {game.result}</p>
             </div>
        </div>
    );
}