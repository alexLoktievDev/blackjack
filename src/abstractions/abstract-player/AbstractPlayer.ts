import { Card } from '@/modules/card';
import { BetManager } from '@/modules/bet-manager';
import { UIElementFactory } from '@/utils';

export abstract class AbstractPlayer {
  public name: string;
  public handAmount: number = 0;
  protected hand: Card[] = [];
  protected element: HTMLElement;
  protected elementInner: HTMLElement;
  protected scoreElement: HTMLElement;
  protected betAmountElement: HTMLElement;
  protected betManager = new BetManager();

  constructor(name: string, parent: HTMLElement, addBet: boolean = false) {
    this.name = name;
    this.element = UIElementFactory.createAndAppend(
      'div',
      'player-seat-spot',
      '',
      parent,
    );

    UIElementFactory.createAndAppend(
      'div',
      'player-seat-name',
      this.name,
      this.element,
    );

    this.elementInner = UIElementFactory.createAndAppend(
      'div',
      'player-seat-spot-inner',
      '',
      this.element,
    );

    this.scoreElement = UIElementFactory.createAndAppend(
      'div',
      'player-seat-info',
      `Score: ${this.getScore()}`,
      this.element,
    );

    this.betAmountElement = UIElementFactory.createAndAppend(
      'div',
      'player-seat-info',
      `Bet: $${this.getBet()}`,
      addBet ? this.element : undefined,
    );
  }

  placeBet(amount: number): boolean {
    return this.betManager.placeBet(amount);
  }

  winBet(): number {
    return this.betManager.winBet();
  }

  loseBet(): void {
    this.betManager.loseBet();
  }

  getScore(): number {
    let score = this.hand.reduce((sum, card) => sum + card.getValue(), 0);
    let aceCount = this.hand.filter((card) => card.rank === 'A').length;

    while (score > 21 && aceCount > 0) {
      score -= 10;
      aceCount--;
    }

    return score;
  }

  addCard(card: Card, hidden = false): void {
    this.hand.push(card);
    this.handAmount = this.hand.length;
    card.attachToParent(this.elementInner);
    card.moveTo(this.elementInner);
    if (!hidden) this.updateScore();
  }

  updateScore(): void {
    this.scoreElement.textContent = `Score: ${this.getScore()}`;
  }

  setBet(amount: number): void {
    this.betManager.placeBet(amount);
    if (this.betAmountElement) {
      this.betAmountElement.textContent = `Bet: $${this.betManager.getBet()}`;
    }
  }

  getBet(): number {
    return this.betManager.getBet();
  }

  clearBet(): void {
    this.betManager.clear();
    if (this.betAmountElement) {
      this.betAmountElement.textContent = `Bet: $0`;
    }
  }

  reset(): void {
    this.elementInner.textContent = '';
    this.hand = [];
    this.updateScore();
    this.clearBet();
  }

  getInnerElement(): HTMLElement {
    return this.elementInner;
  }
}
