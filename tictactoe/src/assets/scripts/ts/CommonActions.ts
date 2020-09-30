import Data from './Data';
import { isHTMLElement } from './helpers';

export default class CommonActions extends Data {
  constructor() {
    super();

    this.reset = this.reset.bind(this);
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

  /**
   * Тут будет запуск новой игры
   */
  reset(): void {
    this.setMessage('');
    this.aI = [];
    this.player = [];
    this.cellsId = Array.from(Array(9).keys());
    this.cells.forEach((cell) => {
      if (isHTMLElement(cell)) cell.classList.remove(this.classes.tic, this.classes.tac, this.classes.nonActive);
    });
    this.aIMoveFirstMove();
  }

  aIMoveFirstMove(): void {
    // Сначала первый ходу Ищем случайный ID.
    const id = Math.floor(Math.random() * 9);
    this.aiGetCell(id);
  }

  aiGetCell(id: number): void {
    const cell = document.querySelector(`[data-id="${ id }"]`);

    this.aI.push(id);
    this.filterNumbers(id);

    if (isHTMLElement(cell)) {
      cell.classList.add(this.classes.tac, this.classes.nonActive);
    }
  }

  /**
   * Тут Я фильтрую числа, оставляю только те, которые доступны для выбора (для ИИ)
   * @param {number} id - выбранный ID
   */
  filterNumbers(id: number): void {
    this.cellsId = this.cellsId.filter((number) => number !== id);
  }

  setMessage(mgs: string): void {
    if (isHTMLElement(this.message)) {
      this.message.innerHTML = mgs;
    }
  }
}
