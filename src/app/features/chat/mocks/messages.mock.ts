import { Message } from '../../../shared/models/message.model';

export const MOCK_MESSAGES: Message[] = [
  {
    id: 'm1',
    conversationId: 'equipe-produto',
    author: 'Marina',
    text: 'A tela principal ja pode abrir direto no chat?',
    time: '09:31',
    mine: false,
  },
  {
    id: 'm2',
    conversationId: 'equipe-produto',
    author: 'Voce',
    text: 'Sim. Removi o boilerplate e deixei a experiencia inicial pronta para evoluir.',
    time: '09:35',
    mine: true,
  },
  {
    id: 'm3',
    conversationId: 'equipe-produto',
    author: 'Marina',
    text: 'Perfeito. Vou validar com o time ainda hoje.',
    time: '09:42',
    mine: false,
  },
  {
    id: 'm4',
    conversationId: 'suporte',
    author: 'Joao',
    text: 'Cliente pediu retorno sobre o plano Pro.',
    time: '08:15',
    mine: false,
  },
  {
    id: 'm5',
    conversationId: 'suporte',
    author: 'Voce',
    text: 'Pode encaminhar pra mim, eu respondo ainda hoje.',
    time: '08:17',
    mine: true,
  },
  {
    id: 'm6',
    conversationId: 'design',
    author: 'Lucas',
    text: 'Nova proposta de layout enviada no figma.',
    time: 'Ontem',
    mine: false,
  },
];
