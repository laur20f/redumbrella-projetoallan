<script lang="ts">
  import entrada from '../assets/cenarios/entrada.png';
  import corredor from '../assets/cenarios/corredor.png';
  import sala from '../assets/cenarios/sala.png';
  import red from '../assets/personagens/red.png';
  import lucas from '../assets/personagens/lucas.png';

  import {
    dialogos,
    ROTA_SIM_1,
    ROTA_NAO_1,
    ROTA_SIM_2,
    ROTA_NAO_2
  } from '../data/dialogos';

  let indice: number = 0;
  let qualEscolha: number = 1;
  let mostrarEscolha: boolean = false;
  let historico: number[] = [];

  $: fala = dialogos[indice];

  $: cenarioAtual =
    fala.cenario === 'entrada'
      ? entrada
      : fala.cenario === 'corredor'
        ? corredor
        : sala;

  $: personagemAtual =
    fala.personagem === 'lucas'
      ? lucas
      : red;

  function proximo(): void {
    if (fala.escolha) {
      mostrarEscolha = true;
      return;
    }
    if (indice < dialogos.length - 1) {
      historico = [...historico, indice];
      indice++;
    }
  }

  function escolher(resposta: 'sim' | 'nao'): void {
    mostrarEscolha = false;
    historico = [...historico, indice];

    if (qualEscolha === 1) {
      indice = resposta === 'sim' ? ROTA_SIM_1 : ROTA_NAO_1;
      qualEscolha = 2;
    } else if (qualEscolha === 2) {
      indice = resposta === 'sim' ? ROTA_SIM_2 : ROTA_NAO_2;
    }
  }

  function voltar(): void {
  if (historico.length === 0) return;

  const anterior = historico[historico.length - 1];
  historico = historico.slice(0, -1);
  indice = anterior;

  // ← aqui tá a correção
  if (dialogos[anterior].escolha) {
    mostrarEscolha = true;
  } else {
    mostrarEscolha = false;
  }

  if (dialogos[indice].escolha) {
    qualEscolha = historico.filter(i => dialogos[i]?.escolha).length + 1;
  }

  }
</script>

<div class="cenario" style={`background-image: url(${cenarioAtual});`}>

  <img
    class="personagem {fala.personagem}"
    src={personagemAtual}
    alt={fala.nome}
  />

  <div class="caixa">

    {#if fala.nome}
      <div class="nome-interno">
        {fala.nome}
      </div>
    {/if}

    <p>{fala.texto}</p>

    {#if !mostrarEscolha}
      <div class="acoes">
        {#if historico.length > 0}
          <button class="btn-voltar" on:click={voltar}>
            ← Voltar
          </button>

        {/if}
       {#if fala.fim}
      <!-- fim da cena -->
      <span class="fim-cena">— fim da cena —</span>
       {:else}
      <button class="btn-proximo" on:click={proximo}>
        Próximo →
      </button>
    {/if}
       
      </div>
    {/if}

    {#if mostrarEscolha}
      <div class="escolha">
        <button on:click={() => escolher('sim')}>Sim</button>
        <button on:click={() => escolher('nao')}>Não</button>
      </div>
    {/if}

  </div>
</div>

<style>
  .cenario {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
  }

  .personagem {
    position: absolute;
    bottom: 0;
    height: 85vh;
    pointer-events: none;
  }

  .personagem.red {
    left: 80px;
  }

  .personagem.lucas {
    right: 80px;
  }

  .caixa {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    background: rgba(0, 0, 0, 0.85);
    padding: 20px;
    border-radius: 12px;
    color: white;
    display: flex;
    flex-direction: column;
  }

  .nome-interno {
    font-weight: bold;
    margin-bottom: 10px;
    background: rgba(0, 0, 0, 0.9);
    padding: 6px 12px;
    border-radius: 6px;
    width: fit-content;
  }

  p {
    font-size: 1.4rem;
    line-height: 1.6;
  }

  .acoes {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  button {
  padding: 10px 24px;
  cursor: pointer;
  border-radius: 999px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.95rem;
  letter-spacing: 1px;
  backdrop-filter: blur(4px);
  transition: all 0.2s ease;
}

button:hover {
  background: rgba(255, 182, 193, 0.35);
  border-color: #ffb6c1;
  color: #ffe4e8;
  transform: scale(1.04);
}

.btn-voltar {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
}

.btn-voltar:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
  transform: scale(1.02);
}

.btn-proximo {
  background: rgba(255, 182, 193, 0.2);
  border-color: #ffb6c1;
}

.escolha {
  display: flex;
  gap: 12px;
  margin-top: 14px;
  justify-content: center;
}

.escolha button {
  min-width: 100px;
  background: rgba(255, 182, 193, 0.15);
  border-color: #ffb6c1;
}

.escolha button:hover {
  background: rgba(255, 182, 193, 0.4);
}
</style>