import { BetManager } from '../modules/bet-manager';

describe('BetManager', () => {
  let betManager: BetManager;

  beforeEach(() => {
    betManager = new BetManager();
  });

  it('should initialize with a bet of 0', () => {
    expect(betManager.getBet()).toBe(0);
  });

  it('should place a bet and return true', () => {
    const result = betManager.placeBet(100);
    expect(result).toBe(true);
    expect(betManager.getBet()).toBe(100);
  });

  it('should calculate winnings correctly', () => {
    betManager.placeBet(50);
    const winnings = betManager.winBet();
    expect(winnings).toBe(100); // 50 * 2 = 100
  });

  it('should reset the bet after losing', () => {
    betManager.placeBet(200);
    betManager.loseBet();
    expect(betManager.getBet()).toBe(0);
  });

  it('should reset the bet after clearing', () => {
    betManager.placeBet(300);
    betManager.clear();
    expect(betManager.getBet()).toBe(0);
  });

  it('should handle multiple wins and losses', () => {
    betManager.placeBet(100);
    expect(betManager.winBet()).toBe(200);
    betManager.placeBet(150);
    betManager.loseBet(); // Loss
    expect(betManager.getBet()).toBe(0);
  });

  it('should overwrite the previous bet when a new bet is placed', () => {
    betManager.placeBet(100);
    expect(betManager.getBet()).toBe(100);

    betManager.placeBet(200);
    expect(betManager.getBet()).toBe(300);
  });
});
