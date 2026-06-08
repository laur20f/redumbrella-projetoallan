<script lang="ts">
	import Menu from './scenes/Menu.svelte';
	import Forest from './scenes/Forest.svelte';
	import { player } from './stores/player';
    import { cameraX } from './stores/camera';

	let currentScreen: 'menu' | 'game' = 'menu';

	function startGame() {
	player.set({
		x: 10,
		y: 540,
		speed: 5,
		direction: 'right',
		moving: false
	});

	cameraX.set(0);

	currentScreen = 'game';
}

	function backToMenu() {
		currentScreen = 'menu';
	}
</script>

{#if currentScreen === 'menu'}
	<Menu onStart={startGame}/>
{:else}
	<Forest onBackToMenu={backToMenu}/>
{/if}