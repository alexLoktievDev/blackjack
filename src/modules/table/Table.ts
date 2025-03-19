import { UIElementFactory } from '@/utils';
import './Table.scss';

export class Table {
  readonly element: HTMLDivElement;
  readonly dealerArea: HTMLDivElement;
  readonly playerArea: HTMLDivElement;
  readonly chipArea: HTMLDivElement;
  readonly balanceArea: HTMLDivElement;

  constructor() {
    // Create main table element
    this.element = UIElementFactory.createAndAppend(
      'div',
      'table',
      '',
      document.body,
    ) as HTMLDivElement;

    // Create dealer area
    this.dealerArea = UIElementFactory.createAndAppend(
      'div',
      'dealer-area',
      '',
      this.element,
    ) as HTMLDivElement;

    // Create player area
    this.playerArea = UIElementFactory.createAndAppend(
      'div',
      'player-seat-area', // Note: Fix typo if original had 'player-seat-area'
      '',
      this.element,
    ) as HTMLDivElement;

    // Create chip area
    this.chipArea = UIElementFactory.createAndAppend(
      'div',
      'chip-area',
      '',
      this.element,
    ) as HTMLDivElement;

    // Create balance area
    this.balanceArea = UIElementFactory.createAndAppend(
      'div',
      'balance-area',
      '',
      this.element,
    ) as HTMLDivElement;
  }

  getChipArea(): HTMLElement {
    return this.chipArea;
  }

  getBalanceArea(): HTMLElement {
    return this.balanceArea;
  }

  getDealerArea(): HTMLDivElement {
    return this.dealerArea;
  }

  getPlayerArea(): HTMLDivElement {
    return this.playerArea;
  }
}
