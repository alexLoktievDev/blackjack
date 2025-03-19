export class UIElementFactory {
  static createElement(
    tag: keyof HTMLElementTagNameMap,
    className: string,
    text: string,
  ): HTMLElement {
    const el = document.createElement(tag);
    el.classList.add(...className.split(' '));
    el.textContent = text;
    return el;
  }

  static appendToParent(el: HTMLElement, parent?: HTMLElement): void {
    if (parent && el !== parent && !parent.contains(el)) {
      parent.appendChild(el);
    }
  }

  static createAndAppend(
    tag: keyof HTMLElementTagNameMap,
    className: string,
    text: string,
    parent?: HTMLElement,
  ): HTMLElement {
    const el = this.createElement(tag, className, text);
    this.appendToParent(el, parent);
    return el;
  }
}
