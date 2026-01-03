import type { Game } from "../types";


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