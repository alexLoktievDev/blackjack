import './styles/index.scss';
import { Game } from '@/modules/game/Game';

window.onload = () => {
  console.log('All resources and assets are fully loaded.');

  // Initialize the game via Singleton instance method
  const game = Game.getInstance();
};
