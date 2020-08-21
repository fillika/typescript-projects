import model from './model/model';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('site');

  /**
   * Здесь Я прохожусь по будущей модели страницы и получаю блоки для рендера
   * Тип блока является ключом для функции, которая будет отвечать за рендер
   * Функции находятся в объекте templates
   */
  model.forEach((block: IModel) => {
      container?.insertAdjacentHTML('beforeend', block.toHTML());
  });
});
