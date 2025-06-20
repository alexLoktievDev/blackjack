import { Card } from '@/modules/card';

export class Deck {
  public cards: Card[] = [];

  constructor() {
    this.initializeDeck();
    this.shuffle();
  }

  private initializeDeck(): void {
    const suits = ['♠', '♣', '♥', '♦'];
    const ranks = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];

    suits.forEach((suit) => {
      ranks.forEach((rank) => {
        this.cards.push(new Card(rank, suit));
      });
    });
  }

  public shuffle(): void {
    gtag('event', 'start_deck_shuffle', {
      event_category: 'interaction',
      event_label: 'Start Deck Shuffle',
    });

    this.cards.sort(() => Math.random() - 0.5);
  }

  draw(parent: HTMLElement): Card {
    if (this.cards.length === 0) this.initializeDeck();

    const card = this.cards.pop()!;
    card.attachToParent(parent);
    return card;
  }
}
