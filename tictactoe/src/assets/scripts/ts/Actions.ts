import Dom from './Dom';
import { getMaxOfArray, isHTMLElement } from './helpers';
import { TCombinations } from './definitions/types';

export default class Actions extends Dom {
  combinations: TCombinations[];
  aI: number[];
  player: number[];
  cellsId: number[];

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
    this.cellsId = Array.from(Array(9).keys());

    this.playerMove = this.playerMove.bind(this);
    this.aIMove = this.aIMove.bind(this);
    this.start = this.start.bind(this);
    this.reset = this.reset.bind(this);
  }

  init(): void {
    if (this.startButton) {
      this.startButton.addEventListener('click', this.start.bind(this));
    } else {
      return;
    }

    if (this.resetButton) {
      this.resetButton.addEventListener('click', this.reset.bind(this));
    }
  }

  start(): void {
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
  reset(): void {
    this.aI = [];
    this.player = [];
    this.cellsId = Array.from(Array(9).keys());
    this.cells.forEach(cell => {
      if (isHTMLElement(cell)) cell.classList.remove(this.classes.tic, this.classes.tac, this.classes.nonActive);
    });
    this.aIMoveFirstMove();
  }

  playerMove(cell: Node): void {
    cell.addEventListener('click', () => {
      if (isHTMLElement(cell)) {
        // Если ячейка уже выбрана
        if (cell.classList.contains(this.classes.nonActive)) {
          return;
        }

        const { id } = cell.dataset;

        if (id !== undefined) {
          this.player.push(+id);
          cell.classList.add(this.classes.tic, this.classes.nonActive);

          this.filterNumbers(+id);
          this.aIMove();

          if (this.player.length >= 3) {
            const isWin = this.checkWin(this.player); // Проверка победы Игрока

            if (isWin) {
              // Логика победы
              this.win('You');
            } else {
              // Продолжение игры
            }
          }
        }
      }
    });
  }

  aIMove(): void {
    /**
     * Найти все комбинации для ИИ
     */
    const allCombinations = this.getAllCombo(this.aI);

    /**
     * Отфильтровать все занятые клетки на поле
     */
    const filteredCombinations = this.filteredCombo(allCombinations);

    /**
     * Далее Я выбираю максимальное число и оно будет следующим ID для хода. Тут нужен дополнительный слой
     * логики, который будет выбирать вес и оптимальное число. Можно попробовать сравнить все числа
     */
    // const id = getMaxOfArray(allNumbers);
    // this.aiGetCell(id);

    if (this.aI.length >= 3) {
      const isWin = this.checkWin(this.aI); // Проверка победы Игрока

      if (isWin) {
        // Логика победы
        console.log('AI Win');
      } else {
        // Продолжение игры
      }
    }
  }

  /**
   * Функция принимает массив чисел (которые уже имеются либо у ИИ, либо у игрока)
   * И находит по этим числам все кобинации, которые могут привести к победе
   * Функция не учитывает занятые клетки, она не фильтрует
   * @param arr
   */
  getAllCombo(arr: number[]): TCombinations[] {
    const result: TCombinations[] = [];

    this.combinations.forEach(combination => {
      arr.forEach(number => combination.includes(number) && result.push(combination));
    });

    return result;
  }

  /**
   * Функция фильтрует все занятые клетки в массиве из списка возможных комбинаций
   * @param arr
   */
  filteredCombo(arr: TCombinations[]): TCombinations[] {
    const result = [];

    arr.forEach(combination => {
      console.log(combination);
    });

    return result;
  }

  aIMoveFirstMove(): void {
    // Сначала первый ходу Ищем случайный ID.
    const id = Math.floor(Math.random() * 9);
    // this.aiGetCell(id);
    this.aiGetCell(4);
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
   * Функция проверки победы
   * @param {array} arr - массив чисел, по сути ID клеток
   */
  checkWin(arr: number[]): boolean {
    let result = false;

    /**
     * В цикле Я проверяю есть ли совпадения по выигрышным комбинациям.
     * Если есть - тогда Я заканчиваю проверку, прерываю цикл и выдаю результат в виде true.
     * Если нет - то переменная result останется false
     */
    for (let i = 0; i < this.combinations.length; i++) {
      result = getResult(this.combinations[i]);
      if (result) break;
    }

    return result;

    function getResult(combo: TCombinations): boolean {
      let count = 0;

      combo.forEach(number => {
        if (count === 3) {
          return count === 3;
        }

        const result = arr.indexOf(number);

        if (result !== -1) {
          count++;
        } else {
          count = 0;
        }
      });

      return count === 3;
    }
  }

  /**
   * Тут Я фильтрую числа, оставляю только те, которые доступны для выбора (для ИИ)
   * @param {number} id - выбранный ID
   */
  filterNumbers(id: number): void {
    this.cellsId = this.cellsId.filter(number => number !== id);
  }

  /**
   * Функция победы. Запускается, когда определяется победитель.
   * Передаем текст, в который подставляем имя победителя
   * @param {string} winner
   */
  win(winner: string): void {
    // eslint-disable-next-line no-console
    console.log(`${ winner } is WIN`, this.player);
  }
}
