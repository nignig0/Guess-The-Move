import type { RESULTS, TURNS } from "./enum"


export interface Identified {
    _id?: string
    created_at: Date,
    updated_at: Date
}

export interface Player extends Identified {
    name: string
}
export interface Move {
    moveNumber?: number, 
    notation: string,
    turn: TURNS
}

export interface Game extends Identified {
    white_player: string,
    black_player: string,
    result: RESULTS,
    event: string,
    year: number,
    moves: Move[],
    white_elo?: number,
    black_elo?: number,

}
