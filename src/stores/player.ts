import { writable } from 'svelte/store';

export type Direction = 'left' | 'right';

export interface PlayerState {
	x: number;
	y: number;
	speed: number;
	direction: Direction;
	moving: boolean;
}

export const player = writable<PlayerState>({
	x: 10,
	y: 540,
	speed: 5,
	direction: 'right',
	moving: false
});