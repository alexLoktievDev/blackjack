import './Chip.scss';

export class Chip {
  readonly element: HTMLDivElement;
  readonly value: number;

  constructor(
    value: number,
    parent: HTMLElement,
    onClick: (value: number) => void,
  ) {
    this.value = value;

    this.element = document.createElement('div');
    this.element.classList.add('chip');
    this.element.textContent = `$${value}`;
    this.element.addEventListener('click', () => onClick(this.value));

    parent.appendChild(this.element);
  }
}
