import Dom from './Dom';

type TCombinations = number[];

document.addEventListener('DOMContentLoaded', () => {
  class Actions extends Dom {
    combinations: TCombinations[];
    AI: number[];
    player: number[];

    constructor() {
      super();
      this.combinations = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
      ];
      this.AI = [];
      this.player = [];
    }

    init() {
      if (this.startButton) {
        this.startButton.addEventListener('click', this.start.bind(this));
      } else {
        return;
      }

      if (this.resetButton) {
        this.resetButton.addEventListener('click', this.reset.bind(this));
      }
    }

    start() {
      this.AIHandle();

      /**
       * Отключаю кнопку, чтобы нельзя было запускать игру более 1 раза
       */
      if (this.startButton instanceof HTMLButtonElement) {
        this.startButton.disabled = true;
      }

      this.cells.forEach(this.handleCell);
    }

    /**
     * Тут будет запуск новой игры
     */
    reset() {
      // Code...
    }

    handleCell(cell: Node) {
      cell.addEventListener('click', () => {
        if (cell instanceof HTMLElement) {
          // Если ячейка уже выбрана
          if (cell.classList.contains('cell--non-active')) {
            return;
          }

          cell.classList.add('cell--tic', 'cell--non-active');
        }
      });
    }

    AIHandle() {
      // Сначала первый ходу Ищем случайный ID.
      const firstId = Math.floor(Math.random() * 9);

      if (this.cells[firstId] instanceof HTMLElement) {
        this.cells[firstId].classList.add('cell--tac', 'cell--non-active');
      }
    }
  }

  const start = new Actions();
  start.init();
});
