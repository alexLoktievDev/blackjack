import { UIElementFactory } from '@/utils';
import './Button.scss';

export class Button {
  readonly element: HTMLButtonElement;

  constructor(label: string, id: string, onClick: () => void) {
    this.element = UIElementFactory.createElement(
      'button',
      id,
      label,
    ) as HTMLButtonElement;
    this.element.addEventListener('click', onClick);
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }
}
