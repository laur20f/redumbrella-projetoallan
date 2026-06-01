<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const textos: string[] = [

  'Ano 2048...',
  'Após um desastre biológico, a humanidade precisou se adaptar. Apesar das cicatrizes deixadas pelo passado, a vida continuou.',
  'Em meio às ruínas deste mundo tão cruel para os humanos que sobreviveram, existe uma menina. Ninguém conhece seu verdadeiro nome; todos a chamam de "Red". O motivo é simples: o velho guarda-chuva vermelho que ela leva para todos os lugares, além de sua inseparavel capa roxa.',
  'Todos os dias, Red atravessava cidades abandonadas, pontes destruídas e florestas que faziam qualquer pessoa se arrepiar só de olhar, em busca de uma única pessoa: seu irmão mais velho, desaparecido em meio ao caos que tomou conta do mundo.',
  'Em meio a tantas dificuldades, Red não desistia, sempre acreditando que seu irmão ainda estava vivo.',
  'Ao chegar a uma das únicas cidades que restaram, Red encontra um velho amigo de seu irmão. Ele conta que, antes de desaparecer, seu irmão frequentava uma escola que ainda permanecia em funcionamento.',
  'Pela primeira vez em muito tempo, Red sente um fio de esperança. Talvez seu irmão ainda estivesse vivo, e ela finalmente pudesse encontrá-lo.',
  'Determinada a descobrir a verdade, Red decide ir para essa escola e o amigo do seu irmão decide ajuda-la.',
  'Hoje...',
  'Uma nova história começa na vida de Red.'
];

	let indice = 0;

	function proximoTexto(): void {
		if (indice < textos.length - 1) {
			indice++;
		} else {
			dispatch('continuar');
		}
	}
</script>

<div class="intro" on:click={proximoTexto}>
	<p>{textos[indice]}</p>

	<span>Clique para continuar...</span>
</div>

<style>
	.intro {
		width: 100vw;
		height: 100vh;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background: black;
		color: white;

		text-align: center;
		padding: 2rem;

		cursor: pointer;
	}

	p {
		font-size: 2rem;
        text-align: center;
		max-width: 800px;
		line-height: 1.6;
	}

	span {
	position: absolute;
	bottom: 40px;
	right: 40px;
	opacity: 0.6;
}
	
</style>