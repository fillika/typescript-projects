import Dom from './Dom';
import { TCombinations } from './definitions/types';

/**
 * Класс отвечает за данные.
 * Тут хранятся выигрышные комбинации, а так же
 */
export default class Data extends Dom {
  combinations: TCombinations[];
  aIWinsCombinations: TCombinations[];
  playerWinsCombinations: TCombinations[];
  aI: number[];
  player: number[];
  cellsId: number[];
  isGame: boolean;

  constructor() {
    super();

    this.isGame = false;
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
    this.aIWinsCombinations = []; // Тут содержаться все комбинации, которые позволяют Ai выиграть
    this.playerWinsCombinations = []; // Тут содержаться все комбинации, которые позволяют Ai выиграть
    this.player = [];
    this.cellsId = Array.from(Array(9).keys());
  }
}
