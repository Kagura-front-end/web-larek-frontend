import { CDN_URL, DEFAULT_IMAGE } from './constants';
export type SelectorElement<T extends HTMLElement = HTMLElement> = string | T;


export function isSelector<T extends HTMLElement>(
  selector: SelectorElement<T>
): selector is string {
    return typeof selector === 'string';
}

export function ensureElement<T extends HTMLElement>(
  selectorElement: SelectorElement<T>,
  context: Document | HTMLElement = document
): T {
    if (isSelector(selectorElement)) {
        const el = context.querySelector(selectorElement);
        if (!el) {
            throw new Error(`Element with selector "${selectorElement}" not found`);
        }
        if (!(el instanceof HTMLElement)) {
            throw new Error(`Element "${selectorElement}" is not an HTMLElement`);
        }
        return el as T;
    }

    if (!(selectorElement instanceof HTMLElement)) {
        throw new Error('Provided element is not an instance of HTMLElement');
    }

    return selectorElement;
}

export function ensureAllElements<T extends HTMLElement>(
  selector: string,
  context: Document | HTMLElement = document
): T[] {
    const nodeList = context.querySelectorAll(selector);
    return Array.from(nodeList).filter((el): el is T => el instanceof HTMLElement);
}

export function getImageUrl(imageName: string): string {
    if (!imageName) return DEFAULT_IMAGE;
    if (!imageName.startsWith('/')) return DEFAULT_IMAGE;
    //TODO need to add regular expression template for checking imageName. Template should be in constants
    imageName = imageName.replace(/^\/+/, '');
    return new URL(imageName, CDN_URL).toString();
}
