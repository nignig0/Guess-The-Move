import type { Game, GameItem } from "../types";


const path = 'games';
const baseUrl = import.meta.env.VITE_API_URL;
export const getGameById = async(gameId: string)=>{
    try {
        const response = await fetch(`${baseUrl}/${path}/${gameId}`);
        if(!response.ok){
            console.error('There was an error with the response -> ', response);
            return;
        }

        const result = await response.json();
        const game: Game = result.data;
        console.log(game);
        return game;
    } catch (error) {
        console.log('There was an error with the response -> ', error);
    }
}

export const getGameByPlayerName = async(playerName: string)=>{
    try{
        const response = await fetch(`${baseUrl}/${path}/player/${playerName}`);
        if(!response.ok){
            console.error("There was an error with the response -> ", response);
            return;
        }

        const result = await response.json();
        console.log(result.data);
        const games: GameItem[] = result.data.map((data:any)=>{
            return{
                white_player: data.white_player,
                black_player: data.black_player,
                result: data.result,
                event: data.event,
                year: data.year,
                white_elo: data.white_elo,
                black_elo: data.black_elo,
                _id: data._id
            }
        });
        return games;
    }catch(error){
        console.log('There was an error with the response -> ', error);
    }
}