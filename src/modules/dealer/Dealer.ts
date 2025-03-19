import { Card } from '@/modules/card';
import { Deck } from '@/modules/deck';
import { EventEmitter } from '@/utils';
import {
  IHitStrategy,
  StandardHitStrategy,
  AbstractPlayer,
} from '@/abstractions';

export class Dealer extends AbstractPlayer {
  public events = new EventEmitter();
  private hitStrategy: IHitStrategy;
  private deck: Deck;

  constructor(
    name: string,
    parent: HTMLElement,
    deck: Deck,
    hitStrategy?: IHitStrategy,
  ) {
    super(name, parent);
    this.deck = deck;
    this.hitStrategy = hitStrategy || new StandardHitStrategy();
    this.element.classList.add('dealer');
  }

  addCard(card: Card, isFlipped: boolean = false): void {
    if (isFlipped) {
      card.flip();
    }

    super.addCard(card, isFlipped);
  }

  revealCards(): void {
    this.hand.forEach((card: Card) => {
      if (card.isFlipped) {
        card.flip();
      }
    });
    this.updateScore();
  }

  play(): void {
    while (this.hitStrategy.shouldHit(this.getScore())) {
      const card = this.deck.draw(this.getInnerElement());
      this.addCard(card);
    }
    this.updateScore();
    this.events.emit('finished');
  }
}
