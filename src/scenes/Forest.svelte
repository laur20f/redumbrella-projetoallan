<script lang="ts">
    import forest from '../assets/cenarios/forest.png';
	
	import redIdleRight from '../assets/personagens/red_idle_right1.png';
    import redIdleLeft from '../assets/personagens/red_idle_left1.png';

    import redIdleRight2 from '../assets/personagens/red_idle_right2.png';
    import redIdleLeft2 from '../assets/personagens/red_idle_left2.png';

    import redWalkRight1 from '../assets/personagens/red_walk_right1.png';
    import redWalkRight2 from '../assets/personagens/red_walk_right2.png';

    import redWalkLeft1 from '../assets/personagens/red_walk_left1.png';
    import redWalkLeft2 from '../assets/personagens/red_walk_left2.png';

	import { player } from '../stores/player';
    import { cameraX } from '../stores/camera';
    import { onMount } from 'svelte';

function handleKeyDown(event: KeyboardEvent) {
	if (event.key === 'ArrowRight') {
		player.update((p) => ({
			...p,
			x: p.x + p.speed,
			direction: 'right',
			moving: true
		}));
	}

	if (event.key === 'ArrowLeft') {
		player.update((p) => ({
			...p,
			x: Math.max(10, p.x - p.speed),
			direction: 'left',
			moving: true
		}));
	}
}

function handleKeyUp() {
	player.update((p) => ({
		...p,
		moving: false
	}));
}

onMount(() => {
	window.addEventListener('keydown', handleKeyDown);
	window.addEventListener('keyup', handleKeyUp);

	return () => {
		window.removeEventListener('keydown', handleKeyDown);
		window.removeEventListener('keyup', handleKeyUp);
	};
});
    $: {
	const centerScreen = 640; // metade de 1280

	const newCameraX = Math.max(
		0,
		$player.x - centerScreen
	);

	cameraX.set(newCameraX);
}

let currentSprite = redIdleRight;
let frame = 0;

setInterval(() => {
	frame = frame === 0 ? 1 : 0;

	player.update((p) => {
		if (!p.moving) {
			currentSprite =
				p.direction === 'right'
					? redIdleRight
					: redIdleLeft;

			return p;
		}

		if (p.direction === 'right') {
			currentSprite =
				frame === 0
					? redWalkRight1
					: redWalkRight2;
		} else {
			currentSprite =
				frame === 0
					? redWalkLeft1
					: redWalkLeft2;
		}

		return p;
	});
}, 200);
</script>
<div class="game">
	<div
	class="world"
	style="transform:  translateX(-{$cameraX}px);"
	
>
		<img
			class="forest"
			src={forest}
			alt="Forest"
		/>

		<img
			class="player"
			src={currentSprite}
			alt="Red"
			style="
				left: {$player.x}px;
                top: {$player.y}px;
			"
		/>

	</div>
</div>


<style>
	.game {
	width: 1280px;
	height: 720px;

	overflow: hidden;
	position: relative;

	border: 2px solid black;
}

.world {
	position: relative;

	width: 4000px;
	height: 720px;
}

.forest {
    image-rendering: pixelated;
	position: absolute;

	left: 0;
	top: 0;

	width: 4000px;
	height: 723px;

	object-fit: fill;
}

.player {
    image-rendering: pixelated;
	position: absolute;

	width: 160px;
}
</style>