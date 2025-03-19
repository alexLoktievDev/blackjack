import { UIElementFactory } from '@/utils/UIElementFactory';
import './Card.scss';

export class Card {
  public rank: string;
  public suit: string;
  readonly element: HTMLDivElement;
  public isFlipped: boolean = false;

  constructor(rank: string, suit: string, isFlipped: boolean = false) {
    this.rank = rank;
    this.suit = suit;

    this.element = document.createElement('div');
    this.element.classList.add('card');

    this.element.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    ${UIElementFactory.createElement('div', 'card-value', rank).outerHTML}
                    ${UIElementFactory.createElement('div', 'card-suit', suit).outerHTML}
                    ${UIElementFactory.createElement('div', 'card-value bottom', rank).outerHTML}
                </div>
                <div class="card-back"></div>
            </div>
        `;

    if (isFlipped) {
      this.flip(true);
    }
  }

  attachToParent(parent: HTMLElement): void {
    if (parent) {
      parent.appendChild(this.element);
    } else {
      console.error('Parent element is null');
    }
  }

  moveTo(target: HTMLElement, number: number = 0): void {
    const cardRect = this.element.getBoundingClientRect();

    const deltaX = number - cardRect.left;
    const deltaY = number - cardRect.top;

    this.element.style.setProperty('--start-x', `${deltaX}px`);
    this.element.style.setProperty('--start-y', `${deltaY}px`);

    this.element.style.animation = 'fly-card 0.5s forwards';

    setTimeout(() => {
      target.appendChild(this.element);
      this.element.style.animation = '';
    }, 500);
  }

  getValue(): number {
    if (['K', 'Q', 'J'].includes(this.rank)) return 10;
    if (this.rank === 'A') return 11;
    return parseInt(this.rank) || 0;
  }

  flip(forceFlip?: boolean): void {
    this.isFlipped = forceFlip !== undefined ? forceFlip : !this.isFlipped;
    if (this.isFlipped) {
      this.element.classList.add('flipped');
    } else {
      this.element.classList.remove('flipped');
    }
  }
}
