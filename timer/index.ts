document.addEventListener('DOMContentLoaded', () => {
  interface Timer {
    el: HTMLElement;
    total: number;
  }

  interface ITime {
    total: number;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  /**
   * Класс создает динамический таймер, который берет из дата атрибута
   * Для точного подсчета времени в секундах нужно указать вот такой формат
   * August 15 2020 12:50:00 GMT+03:00
   * В остальном подойдет любой формат которые понимает Date.parse()
   */
  class Timer implements Timer {
    constructor(element: HTMLElement) {
      this.el = element;
      this.total;
      this.init();
    }

    /**
     * Метод для запуска функции
     * Тут идет проверка на наличие элемента и на наличие у него дата атрибута
     * Если их нет, то функция завершается
     */
    init(): void {
      if (!this.el) {
        return;
      }

      if (this.el instanceof HTMLElement) {
        const deadline = this.el.dataset.deadline;

        if (!deadline) {
          return;
        }

        const intervalId = setInterval(() => {
          this.calculateTime(deadline);

          if (this.total <= 0) {
            clearInterval(intervalId);
            this.destroy();
          }
        }, 1000);
      }
    }

    /**
     * Функция запускает 2 других функции, в которых идет расчет времени, а после него
     * рендер данных на страницу
     * @param {string} deadline - данные из data-атрибута
     */
    calculateTime(deadline: string): void {
      const time = this.getTimeRemaining(deadline);
      this.render(this.createString(time));
    }

    /**
     * Метод создает объект и возвращает его.
     * Объект содержит в себе данные общего кол-ва времени, а так же отдельно считаются секунды,
     * часы, минуты и дни.
     * @param {string} deadline
     */
    getTimeRemaining(deadline: string): ITime {
      const currentDay: Date = new Date();
      const t = Date.parse(deadline) - Date.parse(currentDay.toString());
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));

      this.total = t;

      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds,
      };
    }

    /**
     * Метод принимает объект с данными, в которых хранится кол-во дней, часов, минут, секунд
     * Внутри создается html и возвращается в виде строки
     * @param data
     */
    createString(data: ITime): string {
      const sec = data.seconds === 1 ? 'секунда' : data.seconds >= 2 && data.seconds <= 4 ? 'секунды' : 'секунд';
      const min = data.minutes === 1 ? 'минута' : data.minutes >= 2 && data.minutes <= 4 ? 'минуты' : 'минут';
      const hour = data.hours === 1 ? 'час' : data.hours >= 2 && data.hours <= 4 ? 'часа' : 'часов';
      const day = data.days <= 20
        ? countDays(data.days)
        : (data.days > 20 &&  data.days <= 99)
          ? countDays(data.days % 10)
          : countDays(data.days % 100)

      /**
       * Функция принимает кол-во дней и в зависимости от их кол-ва выбирает правильный вариант
       * @param {number} days оставшееся  кол-во дней
       */
      function countDays(days:number):string {
        return days === 1 ? 'день' : (days >= 2 && days <= 4) ? 'дня' : 'дней'
      }

      return `
        <div class='timer-body'>
            <div class='timer-body__title'>До эфира осталось</div>
            <div class='timer-body__time'>
                <span class='timer-body__number'>${ data.days }</span> ${ day }
                <span class='timer-body__number'>${ data.hours }</span> ${ hour }
                <span class='timer-body__number'>${ data.minutes }</span> ${ min }
                <span class='timer-body__number'>${ data.seconds }</span> ${ sec }
            </div>
        </div>
      `;
    }

    /**
     * Принимает готовую строку в формате html, чтобы вставить её на страницу
     * @param {string} data
     */
    render(data: string):void {
      this.el.innerHTML = data;
    }

    /**
     * Метод срабатывает, когда таймер заканчивает свою работу.
     * Метод удаляет таймер
     */
    destroy(): void {
      this.el.parentElement?.removeChild(this.el);
    }
  }

  const allTimer = document.querySelectorAll('.js-timer');

  allTimer.forEach((timer: Node) => new Timer(timer as HTMLElement));
});
