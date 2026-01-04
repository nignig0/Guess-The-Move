import { useEffect, useState } from "react";
import type { GameItem } from "../types";
import '../styles/findGamePage.css'
import { getGameByPlayerName } from "../api/games";
import { GameItemComponent } from "../components/GameItem";

export const FindGamePage = ()=>{
    const [playerName, setPlayerName] = useState<string>('');
    const [games, setGames] = useState<GameItem[]>([]);

    const getGames = async()=>{
        const result: GameItem[] | undefined = await getGameByPlayerName(playerName);
        if(!result) return;
        setGames(result!);
        console.log(result);
    }


    return (
        <div id='main'>
            <div>
                <input 
                    style={{
                        width: '500px',
                        height: '40px',
                        margin: '10px',
                        padding: '4px'
                    }}
                    placeholder="Search for a player you'd like to study"

                    type='text' onChange={(event)=>setPlayerName(event.target.value)} />
                <button
                    style={{
                        height: '50px'
                    }}
                    onClick={getGames}
                >Search</button>
            </div>
            <div>
                {games.map((game: GameItem, index:number)=>(
                    <GameItemComponent game={game} key={index}/>
                ))}
            </div>
        </div>
    );
}