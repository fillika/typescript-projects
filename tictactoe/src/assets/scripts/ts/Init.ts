import Actions from './Actions';

/**
 * Класс для запуска игры
 */
export default class Init extends Actions {
  constructor() {
    super();
    this.start = this.start.bind(this);
  }

  init(): void {
    if (this.startButton) {
      this.startButton.addEventListener('click', this.start);
    } else {
      return;
    }

    if (this.resetButton) {
      this.resetButton.addEventListener('click', this.reset);
    }
  }

  start(): void {
    if (this.resetButton instanceof HTMLButtonElement) {
      this.resetButton.disabled = false;
    }

    /**
     * Отключаю кнопку, чтобы нельзя было запускать игру более 1 раза
     */
    if (this.startButton instanceof HTMLButtonElement) {
      this.startButton.disabled = true;
    }

    this.aIMoveFirstMove();
    this.cells.forEach(this.playerMove.bind(this));
  }
}
