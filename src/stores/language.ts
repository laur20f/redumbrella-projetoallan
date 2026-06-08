import { writable } from 'svelte/store';

export const language = writable<'pt' | 'en'>('pt');