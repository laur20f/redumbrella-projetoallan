export type Fala = {
  nome: string;
  texto: string;
  personagem: 'red' | 'lucas' | 'none';
  cenario: 'entrada' | 'corredor' | 'sala';
  escolha?: boolean;
  fim?: boolean;
};

export const ROTA_SIM_1 = 5;
export const ROTA_NAO_1 = 12;
export const ROTA_SIM_2 = 15;
export const ROTA_NAO_2 = 17;

export const dialogos: Fala[] = [
  // índice 0
  { nome: 'Red', texto: 'Então esta é a escola...', personagem: 'red', cenario: 'entrada' },
  // índice 1
  { nome: 'Red', texto: 'Tudo bem... vamos entrar.', personagem: 'red', cenario: 'entrada' },
  // índice 2
  { nome: 'Red', texto: 'Uau...', personagem: 'red', cenario: 'corredor' },
  // índice 3
  { nome: 'Red', texto: 'Este lugar é enorme...', personagem: 'red', cenario: 'corredor' },

  // índice 4 — primeira escolha
  { nome: '', texto: 'Olá, você parece perdida, aluna nova?', personagem: 'lucas', cenario: 'corredor', escolha: true },

  // índice 5 — rota SIM da escolha 1
  { nome: 'Red', texto: 'Sim... é meu primeiro dia, acabei de ser transferida.', personagem: 'red', cenario: 'corredor' },
  // índice 6
  { nome: '', texto: 'Acertei então, lembraria do seu rostinho por aqui, haha!!', personagem: 'lucas', cenario: 'corredor' },
  // índice 7
  { nome: '', texto: 'Prazer, meu nome é Lucas.', personagem: 'lucas', cenario: 'corredor' },
  // índice 8
  { nome: 'Red', texto: 'É, legal...', personagem: 'red', cenario: 'corredor' },
  // índice 9
  { nome: 'lucas', texto: 'E qual o seu nome, princesa?', personagem: 'lucas', cenario: 'corredor' },
// índice 10 — segunda escolha
   { nome: 'Red', texto: 'Não to muito afim de falar agora, pode me dizer onde fica a diretoria?', personagem: 'red', cenario: 'sala' },
  // índice 11 — segunda escolha
  { nome: 'lucas', texto: 'Posso te mostrar se quiser...', personagem: 'lucas', cenario: 'corredor', escolha: true },

  // índice 12 — rota NÃO da escolha 1
  { nome: 'Red', texto: 'Não, surgi do nada em uma escola apocalíptica.', personagem: 'red', cenario: 'sala' },
  // índice 13
  { nome: 'Red', texto: 'Tchau!', personagem: 'red', cenario: 'sala' },
  // índice 14 — fim rota não
  { nome: 'Red', texto: 'Por onde eu começo a procurar...', personagem: 'red', cenario: 'sala' },

  // índice 14 — rota SIM da escolha 2
  { nome: 'Red', texto: 'Tudo bem, obrigada!', personagem: 'red', cenario: 'corredor' },
  // índice 15
  { nome: 'lucas', texto: 'Ótimo! Por aqui.', personagem: 'lucas', cenario: 'corredor' },

  // índice 16 — rota NÃO da escolha 2
  { nome: 'Red', texto: 'Me refiro a ir sozinha, a gente se vê por ai.', personagem: 'red', cenario: 'sala' },
  // índice 17
  { nome: 'Red', texto: 'Vou dar uma volta...', personagem: 'red', cenario: 'sala' },
];