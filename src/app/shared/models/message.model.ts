export interface Message {
  id: string;
  conversationId: string;
  author: string;
  text: string;
  time: string;
  mine: boolean;
}
