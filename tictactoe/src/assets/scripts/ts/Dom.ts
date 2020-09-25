/**
 * Класс для получения Dom элементов
 */
export default class Dom {
  startButton: HTMLElement | null;

  resetButton: HTMLElement | null;

  cells: NodeList;

  constructor() {
    this.startButton = document.getElementById('start');
    this.resetButton = document.getElementById('reset');
    this.cells = document.querySelectorAll('.js-cell');
  }
}
