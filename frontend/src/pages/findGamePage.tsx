import { useState } from "react";
import type { GameItem } from "../types";
import { getGameByPlayerName } from "../api/games";
import { GameItemComponent } from "../components/GameItem";
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";

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
        <div className='flex flex-col justify-start items-center h-screen w-full'>
            <div className='flex flex-col'>
                <Input 
                    className="w-[500px] h-10 mb-1 mt-1 p-1"
                    placeholder="Search for a player you'd like to study"

                    type='text' onChange={(event)=>setPlayerName(event.target.value)} />
                <Button 
                    variant='outline'
                    className='w-[100px] border border-neutral-900 cursor-pointer hover:[bg-black text-white]'
                    onClick={getGames}
                >Search</Button>
            </div>
            <div>
                {games.map((game: GameItem, index:number)=>(
                    <GameItemComponent game={game} key={index}/>
                ))}
            </div>
        </div>
    );
}