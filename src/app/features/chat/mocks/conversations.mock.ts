import { Conversation } from '../../../shared/models/conversation.model';

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'equipe-produto',
    name: 'Equipe Produto',
    lastMessage: 'Revisamos o fluxo de onboarding.',
    time: '09:42',
    unread: 3,
    avatarColor: 'bg-blue-600',
  },
  {
    id: 'suporte',
    name: 'Suporte',
    lastMessage: 'Cliente pediu retorno sobre o plano.',
    time: '08:17',
    unread: 1,
    avatarColor: 'bg-teal-700',
  },
  {
    id: 'design',
    name: 'Design',
    lastMessage: 'Nova proposta de layout enviada.',
    time: 'Ontem',
    unread: 0,
    avatarColor: 'bg-purple-600',
  },
];
