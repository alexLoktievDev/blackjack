import './Modal.scss';
import { UIElementFactory } from '@/utils';
import { Button } from '@/modules/button/Button';

export class Modal {
  readonly element: HTMLDivElement;

  constructor(
    message: string,
    onClose?: () => void,
    buttonText: string = 'Start a new game',
  ) {
    // Create modal container
    this.element = UIElementFactory.createAndAppend(
      'div',
      'modal',
      '',
    ) as HTMLDivElement;

    // Create modal content
    const modalContent = UIElementFactory.createAndAppend(
      'div',
      'modal-content',
      '',
      this.element,
    );

    // Add message
    UIElementFactory.createAndAppend('h2', '', message, modalContent);

    // Create button using Button class
    const closeButton = new Button(buttonText, 'modal-close-btn', () => {
      this.close();
      onClose?.();
    });

    modalContent.appendChild(closeButton.element);

    // Append modal to document body
    document.body.appendChild(this.element);
  }

  close() {
    this.element.remove();
  }
}
