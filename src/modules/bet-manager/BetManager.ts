export class BetManager {
  protected bet: number = 0;

  placeBet(amount: number): boolean {
    this.bet += amount;
    return true;
  }

  winBet(): number {
    return this.bet * 2;
  }

  loseBet(): void {
    this.bet = 0;
  }

  getBet(): number {
    return this.bet;
  }

  clear(): void {
    this.bet = 0;
  }
}
