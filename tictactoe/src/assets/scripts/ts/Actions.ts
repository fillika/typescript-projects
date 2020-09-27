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
    let allCombo: TCombinations[] = [];

    /**
     *  Сначала Я беру все возможные комбинации. Я беру совпадения по комбинациям и везде, где они есть
     *  Я пушу в общий массив
     */
    this.combinations.forEach(combo => this.aI.forEach(number => combo.includes(number) && allCombo.push(combo)));

    /**
     * Потом фильтрую на уже занятые клетки. Беру все занятые клетки игроком и проверяю их наличие в
     * комбинациях. Если они есть, значит комбинация нам не подходит. Тут остаются те, что нам подходят
     */
    this.player.forEach(cellId => allCombo = allCombo.filter(array => array.every(number => number !== cellId)));

    /**
     * Дальше Я фильтрую на занятые AI клетки. Сначала Я делаю конкатенацию всех чисел,
     * чтобы получить из них один массив, а потом фильтрую его
     */
    let allNumbers = [].concat(...allCombo);
    this.aI.forEach(number => allNumbers = allNumbers.filter(num => number !== num));

    /**
     * Далее Я выбираю максимальное число и оно будет следующим ID для хода. Тут нужен дополнительный слой
     * логики, который будет выбирать вес и оптимальное число. Можно попробовать сравнить все числа
     */
    console.log('Это те, что подходят', allCombo);
    console.log('allNumbers', allNumbers);

    const id = getMaxOfArray(allNumbers);
    this.aiGetCell(id);

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
