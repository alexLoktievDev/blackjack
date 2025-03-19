import { Chip } from '../modules/chip/Chip';

describe('Chip', () => {
  let parent: HTMLElement;
  let clickHandler: jest.Mock;

  beforeEach(() => {
    parent = document.createElement('div');
    clickHandler = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a chip with correct value and class', () => {
    const chip = new Chip(100, parent, clickHandler);

    expect(chip.element).toBeInstanceOf(HTMLDivElement);
    expect(chip.element.classList.contains('chip')).toBe(true);
    expect(chip.element.textContent).toBe('$100');

    expect(parent.contains(chip.element)).toBe(true);
  });

  it('should assign the correct value', () => {
    const chip = new Chip(200, parent, clickHandler);

    expect(chip.value).toBe(200);
    expect(chip.element.textContent).toBe('$200');
  });

  it('should trigger the onClick event with correct value when clicked', () => {
    const chip = new Chip(50, parent, clickHandler);

    chip.element.click();

    expect(clickHandler).toHaveBeenCalledTimes(1);
    expect(clickHandler).toHaveBeenCalledWith(50);
  });

  it('should append chip to the parent container', () => {
    const chip = new Chip(150, parent, clickHandler);

    expect(parent.contains(chip.element)).toBe(true);
  });

  it('should display the value with "$" prefix', () => {
    const chip = new Chip(300, parent, clickHandler);

    expect(chip.element.textContent).toBe('$300');
  });

  it('should add "chip" class to the element', () => {
    const chip = new Chip(75, parent, clickHandler);

    expect(chip.element.classList.contains('chip')).toBe(true);
  });
});
