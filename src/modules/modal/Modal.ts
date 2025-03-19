import './Modal.scss';

export class Modal {
  readonly element: HTMLDivElement;

  constructor(
    message: string,
    onClose?: () => void,
    buttonText: string = 'Start a new game',
  ) {
    this.element = document.createElement('div');
    this.element.classList.add('modal');
    this.element.innerHTML = `
            <div class="modal-content">
                <h2>${message}</h2>
                <button id="modal-close-btn" class="modal-close-btn">${buttonText}</button>
            </div>
        `;

    document.body.appendChild(this.element);

    // Close button event
    this.element
      .querySelector('#modal-close-btn')
      ?.addEventListener('click', () => {
        this.close();
        onClose?.();
      });
  }

  close() {
    this.element.remove();
  }
}
