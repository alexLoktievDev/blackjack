import { Card } from '../modules/card';
import { UIElementFactory } from '@/utils/UIElementFactory';

describe('Card', () => {
  let createElementMock: jest.SpyInstance;

  beforeEach(() => {
    createElementMock = jest
      .spyOn(UIElementFactory, 'createElement')
      .mockImplementation((tag, className = '', text) => {
        const element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        return element;
      });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a card with correct rank and suit', () => {
    const card = new Card('A', '♠');

    expect(card.rank).toBe('A');
    expect(card.suit).toBe('♠');
    expect(card.isFlipped).toBe(false);
    expect(card.element).toBeTruthy();

    expect(createElementMock).toHaveBeenCalledWith('div', 'card-value', 'A');
    expect(createElementMock).toHaveBeenCalledWith('div', 'card-suit', '♠');
    expect(createElementMock).toHaveBeenCalledWith(
      'div',
      'card-value bottom',
      'A',
    );
  });

  it('should flip the card correctly', () => {
    const card = new Card('10', '♥');

    expect(card.isFlipped).toBe(false);
    expect(card.element.classList.contains('flipped')).toBe(false);

    card.flip();

    expect(card.isFlipped).toBe(true);
    expect(card.element.classList.contains('flipped')).toBe(true);

    card.flip();
    expect(card.isFlipped).toBe(false);
    expect(card.element.classList.contains('flipped')).toBe(false);
  });

  it('should force flip the card correctly', () => {
    const card = new Card('10', '♣');

    card.flip(true);
    expect(card.isFlipped).toBe(true);
    expect(card.element.classList.contains('flipped')).toBe(true);

    card.flip(false);
    expect(card.isFlipped).toBe(false);
    expect(card.element.classList.contains('flipped')).toBe(false);
  });

  it('should calculate the correct value', () => {
    expect(new Card('K', '♠').getValue()).toBe(10);
    expect(new Card('Q', '♠').getValue()).toBe(10);
    expect(new Card('J', '♠').getValue()).toBe(10);
    expect(new Card('A', '♠').getValue()).toBe(11);
    expect(new Card('10', '♠').getValue()).toBe(10);
    expect(new Card('5', '♠').getValue()).toBe(5);
    expect(new Card('2', '♠').getValue()).toBe(2);
  });

  it('should attach to parent correctly', () => {
    const card = new Card('5', '♦');
    const parent = document.createElement('div');

    card.attachToParent(parent);

    expect(parent.contains(card.element)).toBe(true);
  });

  it('should handle attachToParent error when parent is null', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const card = new Card('5', '♦');
    card.attachToParent(null as any);

    expect(consoleErrorSpy).toHaveBeenCalledWith('Parent element is null');

    consoleErrorSpy.mockRestore();
  });

  it('should move the card to target with animation', () => {
    jest.useFakeTimers();

    const card = new Card('7', '♠');
    const target = document.createElement('div');

    jest.spyOn(card.element, 'getBoundingClientRect').mockReturnValue({
      left: 100,
      top: 50,
      width: 50,
      height: 70,
      right: 150,
      bottom: 120,
      x: 100,
      y: 50,
      toJSON: () => '',
    });

    card.moveTo(target, 200);

    expect(card.element.style.getPropertyValue('--start-x')).toBe('100px');
    expect(card.element.style.getPropertyValue('--start-y')).toBe('150px');
    expect(card.element.style.animation).toBe('fly-card 0.5s forwards');

    jest.advanceTimersByTime(500);
    expect(target.contains(card.element)).toBe(true);
    expect(card.element.style.animation).toBe('');

    jest.useRealTimers();
  });
});
