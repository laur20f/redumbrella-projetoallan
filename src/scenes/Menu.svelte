<script lang="ts">
    import pt from '../data/i18n/pt';
    import en from '../data/i18n/en';

    import { language } from '../stores/language';
	import fundo from '../assets/menu.png';

	export let onStart: () => void;

    let texts = pt;

    $: texts = $language === 'pt'
	? pt
	: en;

	let screen: 'menu' | 'language' | 'about' = 'menu';
</script>

<div
	class="menu"
	style={`background-image: url(${fundo});`}
>
	{#if screen === 'menu'}
		<div class="buttons">
			<button on:click={onStart}>
				{texts.menu.newGame}
			</button>

			<button on:click={() => screen = 'language'}>
				{texts.menu.language}
			</button>

			<button on:click={() => screen = 'about'}>
				{texts.menu.about}
			</button>
		</div>
	{/if}

	{#if screen === 'language'}
		<div class="panel">
			<h1>Idioma</h1>

			<button on:click={() => {
	language.set('pt');
	screen = 'menu';
}}>
	Português
</button>

<button on:click={() => {
	language.set('en');
	screen = 'menu';
}}>
	English
</button>
		</div>
	{/if}

	{#if screen === 'about'}
		<div class="panel">
			<h1>RED UMBRELLA</h1>

			<p>
				PROJETO DESENVOLVIDO POR ALUNOS DO 1º PERÍODO DE TECNOLOGIA EM DESENVOLVIMENTO DE SISTEMAS PARA INTERNET 
				DO INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE PERNAMBUCO - CAMPUS IGARASSU, NA DISCIPLINA DE PROGRAMAÇÃO IMPERATIVA MINISTRADA
				PELO PROFESSOR ALLAN LIMA.
			</p>

			<p>
				DESENVOLVIDO POR ERONILDO JUNIOR, GIUSEPPE SOUZA, HELOISA MENDONÇA E LAURA SILVA. 
			</p>

			<button on:click={() => screen = 'menu'}>
				Voltar
			</button>
		</div>
	{/if}
</div>

<style>
	.menu {
		width: 1280px;
		height: 720px;

		background-size: cover;
		background-position: center;

		position: relative;
	}

	.buttons {
	position: absolute;

	left: 50%;
	top: 68%;

	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;

	gap: 18px;
}

button {
	width: 220px;
	height: 52px;

	font-size: 18px;
	font-family: monospace;
	font-weight: bold;
	letter-spacing: 2px;

	color: #d8c8ff;

	background: rgba(35, 20, 60, 0.75);

	border: 2px solid #9c84d8;
	border-radius: 8px;

	cursor: pointer;

	box-shadow:
		0 0 8px rgba(156, 132, 216, 0.3),
		inset 0 0 4px rgba(255, 255, 255, 0.1);

	transition: all 0.2s ease;
}
.panel {
	position: absolute;

	left: 50%;
	top: 50%;

	transform: translate(-50%, -50%);

	display: flex;
	flex-direction: column;

	align-items: center;

	gap: 15px;

	background: rgba(0, 0, 0, 0.8);

	padding: 30px;

	color: white;

	border: 2px solid white;
	border-radius: 8px;
}

button:hover {
	transform: scale(1.05);

	background: rgba(70, 40, 110, 0.9);

	border-color: #d8c8ff;

	box-shadow:
		0 0 12px rgba(216, 200, 255, 0.5),
		inset 0 0 6px rgba(255, 255, 255, 0.2);
}
</style>