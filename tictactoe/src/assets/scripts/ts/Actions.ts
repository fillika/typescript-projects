import { getMaxOfArray, isHTMLElement } from './helpers';
import CommonActions from './CommonActions';

export default class Actions extends CommonActions {
  constructor() {
    super();

    this.filteredUsedCellsPersonOrAI = this.filteredUsedCellsPersonOrAI.bind(this);
    this.filteredUsedCells = this.filteredUsedCells.bind(this);
    this.getIdAndGetCell = this.getIdAndGetCell.bind(this);
    this.playerMove = this.playerMove.bind(this);
    this.aIMove = this.aIMove.bind(this);
  }

  playerMove(cell: Node): void {
    cell.addEventListener('click', () => {
      if (isHTMLElement(cell)) {
        if (!this.isGame) return;

        // Если ячейка уже выбрана
        if (cell.classList.contains(this.classes.nonActive)) {
          this.setMessage('Выберите свободную клетку');
          return;
        }

        this.setMessage('');

        const { id } = cell.dataset;

        if (id !== undefined) {
          this.player.push(+id);
          cell.classList.add(this.classes.tic, this.classes.nonActive);

          this.filterNumbers(+id);

          /**
           * Тут Я получаю все комбинации для выигрыша у человека
           * Они не отфильтрованы
           */
          this.playerWinsCombinations = this.getAllCombo(this.player);

          this.player.forEach(number => this.filteredUsedCells(number, 'player'));
          this.aI.forEach(number => this.filteredUsedCellsPersonOrAI(number, 'player'));

          this.aIMove();

          if (this.player.length >= 3) {
            const isWin = this.checkWin(this.player); // Проверка победы Игрока

            if (isWin) {
              this.setMessage('Вы победили');
              this.isGame = false;
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
    this.aIWinsCombinations = this.getAllCombo(this.aI);

    /**
     * Отфильтровать все занятые клетки на поле. Найти комбинации для выигрыша
     * Следующие 2 строчки сначала фильтруют все занятые клетки ИИ
     * Потом удаляют комбинации, в которых есть занятые клетки игроком
     */
    this.aI.forEach(number => this.filteredUsedCells(number, 'AI'));
    this.player.forEach(number => this.filteredUsedCellsPersonOrAI(number, 'AI'));

    /**
     * Следующие строки выбирают оптимальное решение из полученных комбинаций.
     * Чем меньше длина массива, тем лучше (тем меньше осталось ходов)
     */
    this.getIdAndGetCell();

    if (this.aI.length >= 3) {
      const isWin = this.checkWin(this.aI); // Проверка победы Игрока

      if (isWin) {
        this.setMessage('Победил компьютер');
        this.isGame = false;
      }
    }
  }


  /**
   * Функция фильтрует все комбинации. Т.е. убирает из них все занятые клетки
   */
  filteredUsedCells(number: number, target: 'AI' | 'player'): void {
    if (target === 'AI') {
      this.aIWinsCombinations =
        this.aIWinsCombinations.map((combination) => combination.filter((num) => number !== num));
    } else {
      this.playerWinsCombinations =
        this.playerWinsCombinations.map((combination) => combination.filter((num) => number !== num));
    }
  }

  /**
   * Эта строчка фильтрует комбинации, в которых есть клетки игрока и они не подходят
   * Т.Е. не подходит вся комбинация, если есть хотя бы 1 клетка
   */
  filteredUsedCellsPersonOrAI(number: number, target: 'AI' | 'player'): void {
    if (target === 'AI') {
      this.aIWinsCombinations = this.aIWinsCombinations.filter((combination) => !combination.includes(number));
    } else {
      this.playerWinsCombinations = this.playerWinsCombinations.filter((combination) => !combination.includes(number));
    }
  }

  /**
   * В этой функции Я выбираю подходящую, наилучшую комбинацию для следующего хода.
   * Чем меньше чисел внутри комбинации, тем она лучше. Поэтому Я сравниваю длину массива
   * Сначала Я беру самый первый массив, а потом заменяю его на самый короткий
   */
  getIdAndGetCell(): void {
    let res: number[] = [];
    let id: number;

    /**
     * Проверка, которая срабатывает на первом ходу. Если 4 свободна, то
     * ИИ занимает её, так как это самая выгодная для него позиция
     */
    if (this.cellsId.includes(4)) {
      id = 4;
    } else {
      this.aIWinsCombinations.forEach((combination) => {
        if (res.length === 0) {
          res = combination;
        }

        if (res.length >= combination.length) {
          res = combination;
        }
      });

      // Тут Я выбираю
      this.playerWinsCombinations.forEach((combination) => {
        if (combination.length < res.length) {
          res = combination;
        }
      });

      id = getMaxOfArray(res);
    }

    /**
     * Если ID равен undefined, значит у нас ничья. И так как компьютер ходит первым
     * у нас остается последнее число, на котором игра завершается.
     */
    // eslint-disable-next-line no-restricted-globals
    if (isFinite(id)) {
      this.aiGetCell(id);
    } else {
      this.aiGetCell(this.cellsId[0]);
      this.setMessage('Ничья');
      this.isGame = false;
    }
  }
}
