<script lang="ts">
 import { createEventDispatcher } from 'svelte';
 import fundo from '../assets/menu.png';

  const dispatch = createEventDispatcher();

  let options = ['JOGAR', 'CONTINUAR', 'OPÇÕES']; 
  let botaoativo = 0;

  function handleClick(i: number): void {
    botaoativo = i;

    if (options[i] === 'JOGAR') {
      dispatch('jogar');
  }
}

</script>

  <!-- 🎮 MENU -->
  <div
    class="tela1"
    style={`background-image: url(${fundo});`}
  >
    <div class="panel">
      {#each options as opt, i}
        <button
          class:on={i == botaoativo}
          on:click={() => handleClick(i)}
        >
          {opt}
        </button>
      {/each}
    </div>
  </div>


<style>
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  .tela1 {
    position: relative;
    width: 100vw;
    height: 100vh;

    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

  }

  /* ── BOTÕES ── */
  .panel {
    position: relative;
    z-index: 10;
    margin-top: 350px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
    gap: 15px;
  }

  button {
    font-family: 'Press Start 2P', monospace;
    font-size: 15px;
    color: #7b6a9a;
    background: transparent;
    border: none;
    padding: 8px 0 8px 20px;
    width: 320px;
    height: 30px;
    cursor: pointer;
    letter-spacing: 3px;
    text-align: left;
    position: relative;
  }

  button::before {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%);
    width: 8px; height: 2px;
    background: #4b2d8f;
    transition: all 0.15s;
  }

  button:hover,
  button.on {
    color: #f5f0ff;
  }

  button:hover::before,
  button.on::before {
    width: 14px;
    background: #cc1f1f;
  }
</style>