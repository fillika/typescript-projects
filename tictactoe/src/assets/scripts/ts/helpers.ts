// eslint-disable-next-line
export const isHTMLElement = (el: any): el is HTMLElement => el instanceof HTMLElement;

export function getMaxOfArray(numArray: number[]):number {
  return Math.min.apply(null, numArray);
}
