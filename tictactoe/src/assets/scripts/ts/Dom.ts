/**
 * Класс для получения Dom элементов
 */
export default class Dom {
  startButton: HTMLElement | null;
  resetButton: HTMLElement | null;
  cells: NodeList;
  classes: {
    [key: string]: string
  };

  constructor() {
    this.startButton = document.getElementById('start');
    this.resetButton = document.getElementById('reset');
    this.cells = document.querySelectorAll('.js-cell');
    this.classes = {
      tic: 'cell--tic',
      tac: 'cell--tac',
      nonActive: 'cell--non-active',
    };
  }
}
