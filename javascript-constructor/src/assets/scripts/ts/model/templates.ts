/**
 * Функция создает верстку, если у неё тип title
 * @param {string} value - тип получаемого объекта
 */
import { row, col } from '../utils/utils';

function generateTitle({ value, options }: IModel): string {
  const {styles, tag} = options;
  let str = '';

  if (typeof value === 'string') {
    str = col(`<${tag}>${ value }</${tag}>`);
  }

  return row(str, styles);
}

/**
 * Функция создает верстку, если у неё тип string
 * @param {string} value - тип получаемого объекта
 * @param options
 */
function generateText({ value, options }: IModel): string {
  const {styles, tag} = options;
  let str = '';

  if (typeof value === 'string') {
    str = col(`<${tag}>${ value }</${tag}>`);
  }

  return row(str, styles);
}

/**
 * Функция создает верстку, если у неё тип array
 * @param {string} value - тип получаемого объекта
 * @param options
 */
function generateTextColums({ value, options }: IModel): string {
  const {styles, tag} = options;
  let str = '';

  if (Array.isArray(value)) {
    str = value.map((text: string) => col(`<${tag}>${ text }</${tag}>`)).join('');
  }

  return row(str, styles);
}

/**
 * Функция создает верстку, если у неё тип array
 * @param {string} value - тип получаемого объекта
 * @param options
 */
function generateImage({ value, options }: IModel): string {
  const {alt, styles, tag} = options;
  let str = '';

  if (typeof value === 'string') {
    str = col(`<${tag} src='${value}' alt='${alt}'/>`);
  }

  return row(str, styles);
}

export const templates: IFunc = {
  title: generateTitle,
  text: generateText,
  textColums: generateTextColums,
  image: generateImage,
};
