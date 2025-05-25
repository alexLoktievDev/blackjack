import './styles/index.scss';
import { Game } from '@/modules/game/Game';

window.onload = () => {
  console.log('All resources and assets are fully loaded.');

  if (typeof gtag === 'function') {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }

  // Initialize the game via Singleton instance method
  const game = Game.getInstance();
};
