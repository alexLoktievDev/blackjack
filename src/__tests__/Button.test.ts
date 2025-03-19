import { Button } from '../modules/button/Button';
import { UIElementFactory } from '@/utils';

describe('Button', () => {
  let createElementMock: jest.SpyInstance;
  let clickHandler: jest.Mock;

  beforeEach(() => {
    clickHandler = jest.fn();

    createElementMock = jest
      .spyOn(UIElementFactory, 'createElement')
      .mockImplementation((tag, className, text) => {
        const element = document.createElement(tag);
        element.textContent = text;
        return element;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a button with correct label and class', () => {
    const button = new Button('Click Me', 'test-button', clickHandler);

    const element = button.getElement();

    expect(element).toBeInstanceOf(HTMLButtonElement);
    expect(element.textContent).toBe('Click Me');
  });

  it('should attach click event handler', () => {
    const button = new Button('Click Me', 'test-button', clickHandler);

    const element = button.getElement();
    element.click();

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });

  it('should call UIElementFactory to create button', () => {
    new Button('Click Me', 'test-button', clickHandler);

    expect(createElementMock).toHaveBeenCalledWith(
      'button',
      'button',
      'Click Me',
    );
  });

  it('should return the correct HTMLButtonElement', () => {
    const button = new Button('Submit', 'submit-button', clickHandler);
    const element = button.getElement();

    expect(element).toBeTruthy();
    expect(element.tagName).toBe('BUTTON');
    expect(element.textContent).toBe('Submit');
  });

  it('should execute the onClick handler when clicked', () => {
    const button = new Button('Click Me', 'test-button', clickHandler);

    const element = button.getElement();

    element.click();

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
