import Data from './Data';
import { isHTMLElement } from './helpers';
import { TCombinations } from './definitions/types';

export default class CommonActions extends Data {
  constructor() {
    super();

    this.reset = this.reset.bind(this);
    this.setMessage = this.setMessage.bind(this);
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
    this.isGame = true;
  }

  aIMoveFirstMove(): void {
    // Сначала первый ходу Ищем случайный ID.
    const id = Math.floor(Math.random() * 9);
    this.aiGetCell(id);
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

      combo.forEach(getCount);

      function getCount(number: number): void {
        if (count === 3) {
          return;
        }

        const result = arr.indexOf(number);

        if (result !== -1) {
          count++;
        } else {
          count = 0;
        }
      }

      return count === 3;
    }
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

  /**
   * Функция принимает массив чисел (которые уже имеются либо у ИИ, либо у игрока)
   * И находит по этим числам все кобинации, которые могут привести к победе
   * Функция не учитывает занятые клетки, она не фильтрует
   * @param arr
   */
  getAllCombo(arr: number[]): TCombinations[] {
    const result: TCombinations[] = [];

    this.combinations.forEach((combination) => {
      arr.forEach((number) => combination.includes(number) && result.push(combination));
    });

    return result;
  }
}
