import { HeaderCard1 } from './cardReducr';

export const addCard = (card: HeaderCard1) => ({
  type: 'ADD_CARD',
  payload: card
});

export const splitCard = (index: number) => ({
  type: 'SPLIT_CARD',
  payload: { index }
});

export const removeCard = (index: number) => ({
  type: 'REMOVE_CARD',
  payload: { index }
});
