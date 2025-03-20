import { Deck } from '@/modules/deck';
import { PlayerSeat } from '@/modules/player-seat';
import { Dealer } from '@/modules/dealer';
import { Chip } from '@/modules/chip';
import { Table } from '@/modules/table';
import { Button } from '@/modules/button';
import { AudioManager } from '@/modules/audio-manager';
import { Modal } from '@/modules/modal';

export class Game {
  private static instance: Game;
  private deck = new Deck();
  private playerSeats: PlayerSeat[] = [];
  private dealer: Dealer;
  private audioManager: AudioManager;
  private table: Table;

  private hitButton!: Button;
  private standButton!: Button;
  private dealButton!: Button;
  private chips: Chip[] = [];
  private betPlaced: boolean = false;
  private chipsEnabled: boolean = true;

  private constructor() {
    this.table = new Table();
    this.dealer = new Dealer('Dealer', this.table.getDealerArea(), this.deck);
    this.audioManager = new AudioManager('/assets/sound.mp3');

    const playerArea = this.table.getPlayerArea();
    const balanceArea = this.table.getBalanceArea();
    this.playerSeats.push(new PlayerSeat('Player 1', playerArea, balanceArea));

    this.createButtons();
    this.createChips();
    this.createBalance();
    this.updateDealButtonState();

    this.dealer.events.on('finished', () => {
      this.checkWinner();
    });
  }

  public static getInstance(): Game {
    if (!Game.instance) {
      Game.instance = new Game();
    }
    return Game.instance;
  }

  private createButtons(): void {
    const controls = document.createElement('div');
    controls.id = 'controls';

    this.dealButton = new Button('Deal', 'dealButton', this.start.bind(this));
    this.dealButton.getElement().disabled = true;

    this.hitButton = new Button('Hit', 'hitButton', this.handleHit.bind(this));
    this.hitButton.getElement().disabled = true;

    this.standButton = new Button(
      'Stand',
      'standButton',
      this.handleStand.bind(this),
    );
    this.standButton.getElement().disabled = true;

    controls.appendChild(this.dealButton.getElement());
    controls.appendChild(this.hitButton.getElement());
    controls.appendChild(this.standButton.getElement());

    document.body.appendChild(controls);
  }

  private createChips(): void {
    const chipArea = this.table.getChipArea();
    const chipValues = [10, 20, 50, 100];

    chipValues.forEach((value) => {
      const chip = new Chip(value, chipArea, (amount) =>
        this.handleBet(amount),
      );
      this.chips.push(chip);
    });
  }

  private enableChips(enabled: boolean): void {
    this.chipsEnabled = enabled;
    this.chips.forEach((chip) => {
      chip.element.style.pointerEvents = enabled ? 'auto' : 'none';
      chip.element.style.opacity = enabled ? '1' : '0.5';
    });
  }

  private createBalance(): void {
    const balanceArea = this.table.getBalanceArea();
    balanceArea.append(this.playerSeats[0].getBalance().toString());
  }

  private handleBet(amount: number): void {
    if (!this.chipsEnabled) return;

    const player = this.playerSeats[0];
    if (player.placeBet(amount)) {
      player.setBet();
      this.betPlaced = true;
      this.updateDealButtonState();
    }
  }

  private updateDealButtonState(): void {
    this.dealButton.getElement().disabled = !this.betPlaced;
    this.hitButton.getElement().disabled = true;
    this.standButton.getElement().disabled = true;
  }

  private resetGame(): void {
    this.betPlaced = false;
    this.playerSeats.forEach((player) => player.reset());
    this.dealer.reset();
    this.deck.shuffle();

    this.updateDealButtonState();
    this.dealButton.getElement().disabled = true;
    this.enableChips(true);
  }

  start(): void {
    this.audioManager.play();
    this.enableChips(false);

    this.playerSeats.forEach((player) => {
      if (player.getBet()) {
        player.addCard(this.deck.draw(player.getInnerElement()));
        player.addCard(this.deck.draw(player.getInnerElement()));
      }

      if (player.getScore() === 21) {
        this.checkWinner();
      }
    });

    this.dealer.addCard(this.deck.draw(this.dealer.getInnerElement()));
    this.dealer.addCard(this.deck.draw(this.dealer.getInnerElement()), true);

    this.hitButton.getElement().disabled = false;
    this.standButton.getElement().disabled = false;

    this.dealButton.getElement().disabled = true;
    this.betPlaced = false;
  }

  private handleHit(): void {
    const player = this.playerSeats[0];
    player.addCard(this.deck.draw(player.getInnerElement()));

    if (player.getScore() >= 21) {
      this.checkWinner();
    }
  }

  private handleStand(): void {
    setTimeout(() => {
      this.dealer.play();
    }, 500);
  }

  private checkWinner(): void {
    this.dealer.revealCards();
    const dealerScore = this.dealer.getScore();
    let message = '';
    const playersWithNoBalance: PlayerSeat[] = [];

    this.playerSeats.forEach((player) => {
      if (!player.getBalance()) {
        playersWithNoBalance.push(player);
      }

      if (player.getScore() === 21 && player.handAmount == 2) {
        message += `🎉 Blackjack! ${player.name} wins!\n`;
        player.winBet();
      } else if (player.getScore() > 21) {
        message += `${player.name} busted!\n`;
        player.loseBet();
      } else if (dealerScore > 21 || player.getScore() > dealerScore) {
        message += `${player.name} wins!`;
        player.winBet();
      } else if (player.getScore() === dealerScore) {
        message += `${player.name} pushes!`;
        player.pushBet();
      } else {
        message += `Dealer wins!`;
        player.loseBet();
      }
    });

    setTimeout(() => {
      new Modal(message, () => {
        this.resetGame();

        if (playersWithNoBalance.length) {
          new Modal(
            `Players with names: "${playersWithNoBalance
              .map((item) => item.name)
              .join(
                ',',
              )}" do not have enough balance. \n Do you want to top up your balances? 💸`,
            () => {
              playersWithNoBalance.forEach((playerWithNoBalance) =>
                playerWithNoBalance?.setBalance(1000),
              );
            },
            'Yes',
          );
        }
      });
    }, 500);
  }
}
