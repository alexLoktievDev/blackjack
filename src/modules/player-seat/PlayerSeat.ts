import { Hand } from '@/modules/hand';
import { AbstractPlayer } from '@/abstractions';
import './PlayerSeat.scss';

export class PlayerSeat extends AbstractPlayer {
  private balance: number = 1000;
  private balanceArea: HTMLElement;
  private hands: Hand[] = [];

  constructor(
    name: string,
    parent: HTMLElement,
    balanceArea: HTMLElement,
    addBeat: boolean = true,
  ) {
    super(name, parent, addBeat);
    this.balanceArea = balanceArea;
    this.hands.push(new Hand());
  }

  placeBet(amount: number): boolean {
    if (this.balance >= amount) {
      this.balance -= amount;
      this.updateBalanceDisplay();
      return super.placeBet(amount);
    }
    return false;
  }

  setBalance(amount: number): void {
    this.balance = amount;
  }

  getBalance(): number {
    return this.balance;
  }

  winBet(): number {
    const winAmount = super.winBet();
    this.balance += winAmount;
    this.updateBalanceDisplay();
    return winAmount;
  }

  loseBet(): void {
    this.hands.forEach((hand) => hand.loseBet());
    this.updateBalanceDisplay();
  }

  pushBet(): void {
    this.balance += this.hands.reduce((sum, hand) => sum + hand.getBet(), 0);
    this.updateBalanceDisplay();
  }

  updateBalanceDisplay(): void {
    this.balanceArea.textContent = `${this.balance}`;
  }
}
