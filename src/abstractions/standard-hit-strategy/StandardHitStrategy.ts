export interface IHitStrategy {
  shouldHit(score: number): boolean;
}

export class StandardHitStrategy implements IHitStrategy {
  shouldHit(score: number): boolean {
    return score < 17;
  }
}
