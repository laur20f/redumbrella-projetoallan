<script lang="ts">
	import Menu from './components/menu.svelte';
	import Introducao from './components/introducao.svelte';
	import Dialogo from './components/dialogo.svelte';

	type Tela = 'menu' | 'introducao' | 'dialogo';

	let telaAtual: Tela = 'menu';

	function iniciarJogo(): void {
		telaAtual = 'introducao';
	}

	function terminarIntroducao(): void {
		telaAtual = 'dialogo';
	}
</script>

{#if telaAtual === 'menu'}
	<Menu on:jogar={iniciarJogo} />
{/if}

{#if telaAtual === 'introducao'}
	<Introducao on:continuar={terminarIntroducao} />
{/if}

{#if telaAtual === 'dialogo'}
	<Dialogo />
{/if}
<style>
  :global(html, body) {
    margin: 0;
    padding: 0;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  :global(#app) {
    width: 100%;
    height: 100%;
  }
</style>