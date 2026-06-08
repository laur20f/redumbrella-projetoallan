<script lang="ts">
	import { onMount } from 'svelte';
    export let onBackToMenu: () => void;

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

    import pt from '../data/i18n/pt';
    import en from '../data/i18n/en';

import { language } from '../stores/language';

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

    let campTriggered = false;
    let showCampDialog = false;
    let showTimeSkip = false;
    let showPauseMenu = false;
    

    let texts = pt;

     $: texts = $language === 'pt' ? pt : en;

    $: {
	if ($player.x >= 2920 && lucasVisible && !campTriggered) {
		campTriggered = true;
		canMove = false;

		player.update((p) => ({
			...p,
			moving: false
		}));

		showCampDialog = true;
	}
}
function togglePause() {
	showPauseMenu = !showPauseMenu;
}

function startCamp() {
	showCampDialog = false;
	showTimeSkip = true;

	setTimeout(() => {
		showTimeSkip = false;

		player.update((p) => ({
			...p,
			x: 3550,
			direction: 'right',
			moving: false
		}));

		canMove = true;
	}, 2000);
}

    type Speaker = 'Red' | 'Lucas';

type DialogLine = {
	speaker: Speaker;
	text: string;
};

let firstDialog: DialogLine[] = [];

$: firstDialog = [
	{ speaker: 'Lucas', text: texts.dialog.lucasWhereAmI },
	{ speaker: 'Red', text: texts.dialog.redForest },
	{ speaker: 'Lucas', text: texts.dialog.lucasYouSavedMe },
	{ speaker: 'Red', text: texts.dialog.redYes },
	{ speaker: 'Lucas', text: texts.dialog.lucasNoMemory },
	{ speaker: 'Red', text: texts.dialog.redComeWithMe }
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
	const screenWidth = 1280;
	const mapWidth = 4000;
	const maxCameraX = mapWidth - screenWidth;

	const newCameraX = Math.min(
		maxCameraX,
		Math.max(0, $player.x - screenWidth / 2)
	);

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
		x: Math.min(3840, p.x + p.speed),
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
<button
	class="menu-button"
	on:click={togglePause}
>
	MENU
</button>
{#if showPauseMenu}
	<div class="pause-overlay">

		<div class="pause-menu">

			<button on:click={() => showPauseMenu = false}>
	{texts.pause.continue}
</button>

<button on:click={onBackToMenu}>
	{texts.pause.mainMenu}
</button>

		</div>

	</div>
{/if}
    {#if showTimeSkip}
	<div class="time-skip">
		<p>{texts.timeSkip.someTimeLater}</p>
	</div>
{/if}
	<div class="world" style="transform: translateX(-{$cameraX}px);">
    {#if showCampDialog}
	<div
		class="speech-box"
		style="
			left: {$player.x + 20}px;
			top: {$player.y - 120}px;
		"
	>
		<div class="speaker-name">Red</div>
		<div class="speech-text">{texts.dialog.redStopHere}</div>
		<button on:click={startCamp}>▶</button>
	</div>
{/if}
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
			<h1>{texts.minigame.helpLucas}</h1>
			<div class="bar">
				<div
					class="bar-fill"
					style="width: {(rescuePower / maxRescuePower) * 100}%;"
				></div>
			</div>

			<div class="key">A</div>
			<p>{texts.minigame.pressA}</p>
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

	margin: 0 auto;
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
.time-skip {
	position: absolute;
	left: 0;
	top: 0;

	width: 1280px;
	height: 720px;

	background: black;
	color: white;

	z-index: 30;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 42px;
	font-family: Arial, sans-serif;
}
.menu-button {
	position: absolute;

	top: 80px;
	right: 25px;

	width: 120px;
	height: 42px;

	z-index: 100;

	font-size: 15px;
	font-weight: bold;
	letter-spacing: 1px;

	color: #d8c8ff;

	background: rgba(35, 20, 60, 0.8);

	border: 2px solid #9c84d8;
	border-radius: 8px;

	cursor: pointer;

	box-shadow:
		0 0 8px rgba(156, 132, 216, 0.35),
		inset 0 0 4px rgba(255, 255, 255, 0.1);

	transition: 0.2s;
}

.menu-button:hover {
    cursor: pointer;

	transform: scale(1.05);

	background: rgba(70, 40, 110, 0.95);

	border-color: #d8c8ff;

	color: white;
}

.pause-menu button {
	width: 240px;
	height: 50px;

	font-size: 18px;
	font-weight: 900;

	color: white;

	background: rgba(35, 20, 60, 0.85);

	border: 2px solid #9c84d8;
	border-radius: 8px;

	cursor: pointer;

	transition: 0.2s;

    gap: 30px;
}

.pause-menu button:hover {
	color: white;

	background: rgba(70, 40, 110, 0.95);

	transform: scale(1.05);
}
.pause-overlay {
	position: absolute;

	left: 0;
	top: 0;

	width: 1280px;
	height: 720px;

	background: rgba(0, 0, 0, 0.55);

	z-index: 100;

	display: flex;
	align-items: center;
	justify-content: center;
}
</style>