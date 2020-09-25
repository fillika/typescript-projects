import Dom from './Dom';

type TCombinations = number[];

document.addEventListener('DOMContentLoaded', () => {
  class Actions extends Dom {
    combinations: TCombinations[];
    aI: number[];
    player: number[];

    constructor() {
      super();
      this.combinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      this.aI = [];
      this.player = [];

      this.playerMove = this.playerMove.bind(this);
      this.aIMove = this.aIMove.bind(this);
      this.start = this.start.bind(this);
      this.reset = this.reset.bind(this);
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
      this.aIMoveFirstMove();

      /**
       * Отключаю кнопку, чтобы нельзя было запускать игру более 1 раза
       */
      if (this.startButton instanceof HTMLButtonElement) {
        this.startButton.disabled = true;
      }

      this.cells.forEach(this.playerMove.bind(this));
    }

    /**
     * Тут будет запуск новой игры
     */
    reset() {
      // Code...
    }

    playerMove(cell: Node) {
      cell.addEventListener('click', () => {
        if (cell instanceof HTMLElement) {
          // Если ячейка уже выбрана
          if (cell.classList.contains('cell--non-active')) {
            return;
          }

          const { id } = cell.dataset;

          if (id) {
            this.player.push(+id);
            cell.classList.add('cell--tic', 'cell--non-active');

            if (this.player.length >= 3) {
              const isWin = this.checkWin(this.player); // Проверка победы Игрока

              if (isWin) {
                // Логика победы
              } else {
                // Продолжение игры
              }
            }
          }
        }
      });
    }

    aIMove() {
      if (this.aI.length >= 3) {
        const isWin = this.checkWin(this.aI); // Проверка победы Игрока

        if (isWin) {
          // Логика победы
        } else {
          // Продолжение игры
        }
      }
    }

    aIMoveFirstMove() {
      // Сначала первый ходу Ищем случайный ID.
      const id = Math.floor(Math.random() * 9);
      this.aI.push(id);

      if (this.cells[id] instanceof HTMLElement) {
        this.cells[id].classList.add('cell--tac', 'cell--non-active');
      }
    }

    /**
     * Функция проверки победы
     * @param {array} arr - массив чисел, по сути ID клеток
     */
    checkWin(arr: number[]): boolean {
      let count = 0;

      this.combinations.forEach(combo => {
        combo.forEach(number => {
          if (count === 3) {
            return;
          }

          const result = arr.indexOf(number);

          if (result !== -1) {
            count++;
          } else {
            count = 0;
          }
        });
      });

      return count === 3;
    }
  }

  const start = new Actions();
  start.init();
});
