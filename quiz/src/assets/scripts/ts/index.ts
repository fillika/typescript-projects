import './polyfills';

document.addEventListener('DOMContentLoaded', function () {
  /**
   * Объект с результатами теста. Ключ - это имя теста, а внутри функции,
   * каждая производит расчет ответа
   */
  const finalMessage: IFunc = {
    first_test: function (result) {
      let message;

      if (result <= 2) {
        message = '0-2 балла: Скромно. Рекомендуем вам ОС семейства Windows ;)';
      } else if (result >= 3 && result <= 6) {
        message = '3-6 баллов: Но недостаточно. Возьмите что-то с визуальным интерфейсом!';
      } else {
        message = '7-10 баллов: Отлично! Мы рекомендуем Linux с голой консолью!';
      }

      return message;
    },
    second_test: function (result) {
      var message;

      if (result === 1) {
        message = 'Windows - довольно требовательная к ресурсам ОС, рекомендуем Виртуальный сервер 2/2/48 HDD за 1300 руб./мес. и не забывайте про стоимость аренды ОС...';
      } else {
        message = 'Современные ОС на Linux довольно требовательные, например, для  Centos 7 или выше мы рекомендуем Виртуальный сервер 2/2/48 HDD за 1300 руб./мес., но можно установить Centos 6 и взять Виртуальный сервер 1/1/32 HDD за 650 руб./мес., решать вам!';
      }

      return message;
    },
    third_test: function (result) {
      let message;

      if (result <= 3) {
        message = 'Рекомендуем тариф Cloud Standart за 950 руб./мес.';
      } else if (result >= 4 && result <= 5) {
        message = 'Рекомендуем тариф Cloud Optimal за 1900 руб./мес.';
      } else if (result >= 6 && result <= 10) {
        message = 'Рекомендуем тариф Cloud Maximum за 2800 руб./мес.';
      } else {
        message = 'Рекомендуем рассмотреть аренду физического сервера, с тарифами вы можете ознакомиться <a href="/data-center/dedicated/" target="_blank">тут</a>. Но если Виртуальный сервер принципиален - попробуйте тариф Cloud Ultra за 5600 руб./мес';
      }

      return message;
    },
    fourth_test: function (result) {
      let message;

      if (result <= 3) {
        message = 'Рекомендуем тариф Cloud Optimal за 1900 руб./мес., не забудьте, что нужен Виртуальный сервер под базу данных - тариф по размеру базы.';
      } else if (result >= 6 && result <= 11) {
        message = 'Рекомендуем тариф Cloud Maximum за 2800 руб./мес или Cloud Ultra за 5600 руб./мес. в зависимости от размера базы.';
      } else {
        message = 'Рекомендуем рассмотреть аренду физического сервера, с тарифами вы можете ознакомиться <a href="/data-center/dedicated/" target="_blank">тут</a>';
      }

      return message;
    },
    fifth_test: function (result) {
      let message;

      if (result === 1) {
        message = 'Рекомендуем тариф Cloud Standart за 950 руб./мес.';
      } else if (result === 2) {
        message = 'Виртуальный сервер в Российском дата-центре вам не подойдет, напишите нам и мы подберем тариф за рубежом.';
      } else if (result === 3) {
        message = 'Рекомендуем тариф Cloud Standart за 950 руб./мес. + администрирование, напишите нам!';
      } else {
        message = 'Виртуальный сервер в Российском дата-центре вам не подойдет, напишите нам и мы подберем тариф за рубежом и обсудим тариф на администрирование.';
      }

      return message;
    },
    default: function () {
      return 'Отлично! Вы прошли тест!';
    },
  };

  class Dom implements IDom {
    $el: HTMLElement | null;
    $options: IFunc;
    $totalResult: number;
    questions: NodeListOf<HTMLElement> | undefined;
    answers: NodeListOf<HTMLElement> | undefined;
    quizWrappers: NodeListOf<HTMLElement> | undefined;
    buttons: NodeListOf<HTMLElement> | undefined;
    extraButtons: NodeListOf<HTMLElement> | undefined;
    resultField: HTMLElement | null;
    nextIdBlock: string | null;
    key: string | null;

    constructor(element: HTMLElement | null, options: IFunc) {
      this.$el = element;
      this.$options = options;
      this.$totalResult = 0;
      this.questions = undefined; // Все блоки с вопросами, 1 блок = 1 вопросу
      this.answers = undefined; // Все варианты ответов
      this.quizWrappers = undefined; // Обертки. В одной вопросы, в другой поделиться, в третьей форма ОС
      this.buttons = undefined; // Кнопки дальше
      this.extraButtons = undefined; // Кнопки поделиться, связаться с нами и т.д.
      this.resultField = null; // Поле с результатом
      this.nextIdBlock = null; // data-id следующего блока
      this.key = null;
      this.init();
    }

    init() {
      if (!this.$el) return;
      this.getHTML();
    }

    /**
     * Метод, в котором Я определяю по селекторам основные HTML
     * элементы, с которыми буду работать
     */
    getHTML() {
      if (this.$el) {
        /**
         * Все вопросы, включая результат
         * @type {NodeListOf<Element>}
         */
        this.questions = this.$el.querySelectorAll('.js-quiz-question');
        this.answers = this.$el.querySelectorAll('.js-answer'); // Все ответы;

        /**
         * Все обертки внутри квиза. В одной вопросы, в другой форма обратной связи.
         * В третьей поделиться с результатами
         * @type {NodeListOf<Element>}
         */
        this.quizWrappers = this.$el.querySelectorAll('.js-quiz-wrapper');

        /**
         * Запускаю поиск кнопок "Дальше" и вешаю на каждую клик
         * @type {NodeListOf<Element>}
         */
        this.buttons = this.$el.querySelectorAll('.js-quiz-button');

        this.extraButtons = this.$el.querySelectorAll('[data-selector]'); // Кнопка "Связаться с нами"

        this.resultField = this.$el.querySelector('.js-quiz-result'); // Кнопка поделиться

        this.start();
      }
    }

    start() {

    }
  }

  class Quiz extends Dom implements IQuiz {
    constructor(element: HTMLElement | null, options: IFunc) {
      super(element, options);
    }

    start() {
      /* ----- привязка контекста ----- */

      this.handleNextButton = this.handleNextButton.bind(this); // Привязка, чтобы не терять контекст this
      this.handleAnswers = this.handleAnswers.bind(this); // Привязка, чтобы не терять контекст this
      this.nextWrapper = this.nextWrapper.bind(this); // Привязка, чтобы не терять контекст this

      /* ----- Вещаю методы на кнопки ----- */

      this.buttons?.forEach(this.handleNextButton); // Клик по кнопкам "дальше"

      this.answers?.forEach(this.handleAnswers); // Клик по ответам на вопросы

      this.extraButtons?.forEach(this.nextWrapper);

      this.share();
    }

    /**
     * Метод, который будет работать при клике на оранжевую кнопку "Дальше"
     * При клике считываем href нашей кнопки. Она должна равняться ID следующего блока
     * Именно по нему мы поймем какой блок показывать.
     * так же важно, чтобы у вариантов ответа был data-clickable. Если он false, то мы ничего не делаем
     * Сделана эта проверка, чтобы нельзя было выбрать 2 и более вариантов ответа
     */
    handleNextButton(button: Node) {
      button.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const target = e.target;

        if (target instanceof HTMLElement) {
          const parent = target.closest('.quiz-question'); // родитель с вопросами у кнопки
          const key = target.dataset.testKey;

          if (parent) {
            const isSelected = parent.querySelector('.answer')?.getAttribute('data-clickable'); // Ищу ближайший ответ

            //Проверка, если на вопрос еще не ответили, то ничего не делаем
            if (isSelected === 'false') {
              return;
            }
          }

          if (key) {
            this.key = key;
          }

          /**
           * Скрываю все вопросы и показываю следующий, ищу по ID.
           */
          this.questions?.forEach(question => {
            question.classList.remove('quiz-question--active');

            if (this.$el) {
              this.$el.querySelector(`[data-id=${ this.nextIdBlock }]`)?.classList.add('quiz-question--active');
            }
          });

          // Блок с результатами, сюда передаем ключ, по которому будем искать функцию в объекте options
          if (this.nextIdBlock === 'result') {
            this.finishQuiz(this.key);
          }
        }

      });
    }

    /**
     * Метод клика по ответу на вопрос. Внутри идет проверка на клик по дата атрибуту
     * А так же присвоение нужного класса
     * @param answer
     */
    handleAnswers(answer: Node) {
      answer.addEventListener('click', (e: Event) => {
        const target = e.target;

        if (target instanceof HTMLElement) {
          const isSelected = target.getAttribute('data-clickable');
          const point = target.getAttribute('data-point'); // Кол-во очков
          const parent = target.parentElement;
          const allQuestionInParent = parent?.querySelectorAll('[data-clickable="false"]'); // Все вопросы в текущем родителе

          this.nextIdBlock = target.getAttribute('data-next'); // ata-id след блока

          if (isSelected === 'false') {
            allQuestionInParent?.forEach(question => {
              question.setAttribute('data-clickable', 'true');
            });

            target.classList.add('selected');

            if (point) {
              this.$totalResult += parseInt(point);
            }
          }
        }
      });
    }

    /**
     * Фунция переключает на следующее окно после ответа на все вопросы
     * Это финальное окно, где будет разделение на "Поделиться" или "Связаться с нами"
     * @param button
     */
    nextWrapper(button: Node) {
      button.addEventListener('click', (e: Event) => {
        e.preventDefault();

        const target = e.target;

        if (target instanceof HTMLElement) {

          const id = target.getAttribute('href')?.slice(1); // удаляю символ #

          this.quizWrappers?.forEach(wrapper => {
            wrapper.classList.remove('is-active');

            if (this.$el) {
              this.$el.querySelector('[data-id="' + id + '"]')?.classList.add('is-active');
            }

          });
        }

      });
    }

    /**
     * Метод, который срабатывает, когда мы заканчиваем опросник
     * Тут так же меняется текст в зависимости от результатов.
     * Тут мы получаем так же ключ, по которому можем определить сообщение и msg для
     * конечного пользователя в зависимости от результата
     */
    finishQuiz(key: string | null) {
      let message;

      if (key) {
        message = this.$options[key](this.$totalResult);
      } else {
        message = this.$options.default(2);
      }

      if (this.resultField) {
        this.resultField.innerHTML = message;
      }
    }

    share() {
      if (this.$el) {
        const vkButton = this.$el.querySelector('.js-share-vk');
        const fbButton = this.$el.querySelector('.js-share-fb');
        const okButton = this.$el.querySelector('.js-share-ok');

        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent('Я прошел тест на ITSOFT');
        const img = encodeURIComponent('https://itsoft.ru/include/5.1/itsoft.png');

        if (vkButton) {
          vkButton.addEventListener('click', function (e: Event) {
            e.preventDefault();

            const shareLink = 'https://vk.com/share.php?url=' + url + '&title=' + title + '&image=' + img;

            if (window.innerWidth >= 992) {
              window.open(shareLink,
                'sharer',
                'width=700,height=400,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no');
            } else {
              window.open(shareLink);
            }
          });
        }

        if (fbButton) {
          fbButton.addEventListener('click', function (e: Event) {
            e.preventDefault();
            //
            const fbLink = ('http://www.facebook.com/sharer.php?u=' + url + '&t' + title);

            if (window.innerWidth >= 992) {
              window.open(fbLink,
                'sharer',
                'width=700,height=400,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no');
            } else {
              window.open(fbLink);
            }
          });
        }

        if (okButton) {
          okButton.addEventListener('click', function (e: Event) {
            e.preventDefault();

            const okLink = ('https://connect.ok.ru/offer?url=' + url + '&title=' + title + '&imageUrl=' + img);

            if (window.innerWidth >= 992) {
              window.open(okLink,
                'sharer',
                'width=700,height=400,left=200,top=100,location=no, directories=no,status=no,toolbar=no,menubar=no');
            } else {
              window.open(okLink);
            }
          });
        }
      }
    }
  }

  const quiz_1 = new Quiz(document.getElementById('test_1'), finalMessage);
  const quiz_2 = new Quiz(document.getElementById('test_2'), finalMessage);
});
