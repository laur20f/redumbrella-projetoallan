<script lang="ts">
	import { onMount } from 'svelte';

	import forest from '../assets/cenarios/forest.png';

	import cutscenePortal1 from '../assets/cutscene/cutscene_portal1.png';
	import cutscenePortal2 from '../assets/cutscene/cutscene_portal2.png';
	import cutscenePortal3 from '../assets/cutscene/cutscene_portal3.png';
	import cutscenePortal4 from '../assets/cutscene/cutscene_portal4.png';
	import cutscenePortal5 from '../assets/cutscene/cutscene_portal5.png';
	import cutscenePortal6 from '../assets/cutscene/cutscene_portal6.png';

    import lucasIdleRight from '../assets/personagens/lucas_idle_right1.png';
    import lucasIdleLeft from '../assets/personagens/lucas_idle_left1.png';

    import lucasWalkRight1 from '../assets/personagens/lucas_walk_right1.png';
    import lucasWalkRight2 from '../assets/personagens/lucas_walk_right2.png';

    import lucasWalkLeft1 from '../assets/personagens/lucas_walk_left1.png';
    import lucasWalkLeft2 from '../assets/personagens/lucas_walk_left2.png';

	import cutsceneRescue1 from '../assets/cutscene/cutscene_rescue1.png';
	import cutsceneRescue2 from '../assets/cutscene/cutscene_rescue2.png';
	import cutsceneRescue3 from '../assets/cutscene/cutscene_rescue3.png';

	import redIdleRight from '../assets/personagens/red_idle_right1.png';
	import redIdleLeft from '../assets/personagens/red_idle_left1.png';

	import redWalkRight1 from '../assets/personagens/red_walk_right1.png';
	import redWalkRight2 from '../assets/personagens/red_walk_right2.png';

	import redWalkLeft1 from '../assets/personagens/red_walk_left1.png';
	import redWalkLeft2 from '../assets/personagens/red_walk_left2.png';

	import { player } from '../stores/player';
	import { cameraX } from '../stores/camera';

	const portalCutscenes: string[] = [
		cutscenePortal1,
		cutscenePortal2,
		cutscenePortal3,
		cutscenePortal4,
		cutscenePortal5,
		cutscenePortal6
	];

	const rescueCutscenes: string[] = [
		cutsceneRescue1,
		cutsceneRescue2,
		cutsceneRescue3
	];

    let lucasVisible = false;
    let lucasSprite = lucasIdleRight;

	let portalTriggered = false;
	let canMove = true;

	let showPortalCutscene = false;
	let currentPortalCutscene = 0;

	let showMinigame = false;
	let rescuePower = 0;
	const maxRescuePower = 20;

	let showRescueCutscene = false;
	let currentRescueCutscene = 0;

	let currentSprite = redIdleRight;
	let frame = 0;
    
    let lucasPosition: 'front' | 'back' = 'front';

    let showFirstDialog = false;

    let dialogIndex = 0;

    type Speaker = 'Red' | 'Lucas';

type DialogLine = {
	speaker: Speaker;
	text: string;
};

const firstDialog: DialogLine[] = [
	{ speaker: 'Red', text: 'Você está bem?' },
	{ speaker: 'Lucas', text: 'Acho que sim...' },
	{ speaker: 'Lucas', text: 'Onde eu estou?' },
	{ speaker: 'Red', text: 'Eu te tirei daquele portal.' },
	{ speaker: 'Lucas', text: 'Obrigado.' }
];

function getDialogLeft() {
	const currentLine = firstDialog[dialogIndex];

	if (currentLine.speaker === 'Red') {
		return $player.x + 20;
	}

	return lucasPosition === 'front'
		? $player.x + 160
		: $player.x - 120;
}
	$: {
		if ($player.x >= 1500 && !portalTriggered) {
			portalTriggered = true;
			canMove = false;

			player.update((p) => ({
				...p,
				moving: false
			}));

			showPortalCutscene = true;
			currentPortalCutscene = 0;
			playPortalCutscene();
		}
	}

	$: {
		const centerScreen = 640;
		const newCameraX = Math.max(0, $player.x - centerScreen);
		cameraX.set(newCameraX);
	}

	function playPortalCutscene() {
		const interval = setInterval(() => {
            
			if (currentPortalCutscene < portalCutscenes.length - 1) {
				currentPortalCutscene += 1;
			} else {
				clearInterval(interval);
				showPortalCutscene = false;
				showMinigame = true;
			}
		}, 900);
	}

	function playRescueCutscene() {
		showRescueCutscene = true;
		currentRescueCutscene = 0;

		const interval = setInterval(() => {
			if (currentRescueCutscene < rescueCutscenes.length - 1) {
				currentRescueCutscene += 1;
			} else {
	        clearInterval(interval);
	        showRescueCutscene = false;

	         player.update((p) => ({
		    ...p,
		    x: 2700,
		    direction: 'right',
		    moving: false
	}));

   lucasVisible = true;

   lucasPosition = 'front';

   showFirstDialog = true;

   canMove = false;

}
		}, 900);
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (showMinigame && event.key.toLowerCase() === 'a') {
			rescuePower += 1;

			if (rescuePower >= maxRescuePower) {
				showMinigame = false;
				playRescueCutscene();
			}

			return;
		}

		if (!canMove) return;

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

		const animationInterval = setInterval(() => {
	frame = frame === 0 ? 1 : 0;

	player.update((p) => {

		if (!p.moving) {

			currentSprite =
				p.direction === 'right'
					? redIdleRight
					: redIdleLeft;

			if (lucasPosition === 'front') {

	lucasSprite = lucasIdleLeft;

} else {

	lucasSprite =
		p.direction === 'right'
			? lucasIdleRight
			: lucasIdleLeft;
}

			return p;
		}

		if (p.direction === 'right') {

			currentSprite =
				frame === 0
					? redWalkRight1
					: redWalkRight2;

			lucasSprite =
				frame === 0
					? lucasWalkRight1
					: lucasWalkRight2;

		} else {

			currentSprite =
				frame === 0
					? redWalkLeft1
					: redWalkLeft2;

			lucasSprite =
				frame === 0
					? lucasWalkLeft1
					: lucasWalkLeft2;
		}

		return p;
	});
}, 200);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
			clearInterval(animationInterval);
		};
	});

    function nextDialog() {

	if (dialogIndex < firstDialog.length - 1) {

		dialogIndex++;

	} else {

		showFirstDialog = false;

		lucasPosition = 'back';

		canMove = true;

		dialogIndex = 0;
	}
}
</script>

<div class="game">
	<div class="world" style="transform: translateX(-{$cameraX}px);">
		<img class="forest" src={forest} alt="Forest" />

		<img
			class="player"
			src={currentSprite}
			alt="Red"
			style="
				left: {$player.x}px;
				top: {$player.y}px;
			"
		/>
        {#if lucasVisible}
        {#if showFirstDialog}
	<div
		class="speech-box"
		style="
			left: {getDialogLeft()}px;
			top: {$player.y - 120}px;
		"
	>
		<div class="speaker-name">
			{firstDialog[dialogIndex].speaker}
		</div>

		<div class="speech-text">
			{firstDialog[dialogIndex].text}
		</div>

		<button on:click={nextDialog}>▶</button>
	</div>
{/if}
	<img
		class="lucas"
		src={lucasSprite}
		alt="Lucas"
		style="
			left: {lucasPosition === 'front'? $player.x + 140: $player.x - 140}px;
			top: {$player.y}px;
		"
	/>
         {/if}

	</div>

	{#if showPortalCutscene}
		<div class="cutscene-screen">
			<img
				class="cutscene-image"
				src={portalCutscenes[currentPortalCutscene]}
				alt="Cutscene do portal"
			/>
		</div>
	{/if}

	{#if showMinigame}
		<div class="minigame-screen">
			<h1>AJUDE LUCAS!</h1>

			<div class="bar">
				<div
					class="bar-fill"
					style="width: {(rescuePower / maxRescuePower) * 100}%;"
				></div>
			</div>

			<div class="key">A</div>
			<p>Pressione A repetidamente</p>
		</div>
	{/if}

	{#if showRescueCutscene}
		<div class="cutscene-screen">
			<img
				class="cutscene-image"
				src={rescueCutscenes[currentRescueCutscene]}
				alt="Cutscene do resgate"
			/>
		</div>
	{/if}
</div>

<style>
	.game {
		width: 1280px;
		height: 720px;
		overflow: hidden;
		position: relative;
		border: 2px solid black;
		background: black;
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
	}

	.player {
		image-rendering: pixelated;
		position: absolute;
		width: 160px;
	}

	.cutscene-screen,
	.minigame-screen {
		position: absolute;
		left: 0;
		top: 0;
		width: 1280px;
		height: 720px;
		background: black;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.cutscene-image {
		width: 1280px;
		height: 720px;
		object-fit: cover;
		image-rendering: pixelated;
	}

	.minigame-screen {
		flex-direction: column;
		color: black;
		background: white;
		font-family: Arial, sans-serif;
	}

	.minigame-screen h1 {
		font-size: 48px;
		margin-bottom: 40px;
	}

	.bar {
		width: 500px;
		height: 35px;
		border: 4px solid black;
		margin-bottom: 30px;
	}

	.bar-fill {
		height: 100%;
		background: black;
	}

	.key {
		width: 90px;
		height: 90px;
		border: 5px solid black;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 50px;
		font-weight: bold;
		margin-bottom: 15px;
	}

	p {
		font-size: 24px;
	}

    .lucas {
	image-rendering: pixelated;
	position: absolute;
	width: 160px;
}
.speech-box {
	position: absolute;

	width: 260px;
	min-height: 80px;

	background: rgba(0, 0, 0, 0.85);
	border: 3px solid white;
	border-radius: 10px;

	color: white;
	padding: 10px;

	z-index: 5;
}

.speaker-name {
	position: absolute;
	top: -28px;
	left: 10px;

	background: black;
	border: 2px solid white;
	padding: 3px 10px;

	font-size: 16px;
	font-weight: bold;
}

.speech-text {
	font-size: 18px;
	margin-bottom: 8px;
}

.speech-box button {
	position: absolute;
	right: 8px;
	bottom: 6px;

	background: white;
	color: black;
	border: none;
	cursor: pointer;
}
</style>