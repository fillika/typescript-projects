import img from '@img/image.png';
import { TitleBlock, ImageBlock, TextBlock, TextColumnsBlock } from '../classes/Block';

const model: IModel[] = [
  new TitleBlock('Test title', {
    tag: 'H2',
    styles: 'background-color: darkkhaki; color: #ccc;',
  }),
  new TextBlock('Lorem ipsum dolorem', {
    tag: 'p',
    styles: 'color: blue;',
  }),
  new TextColumnsBlock([
    'Lorem ipsum dolorem',
    'Lorem ipsum dadada 2',
    'Lorem ipsum nonono 3',
  ], {
    tag: 'p',
    styles: 'color: red;',
  }),
  new ImageBlock(img, {
    tag: 'img',
    styles: 'max-width: 100%',
    alt: 'Просто картинка',
  }),
];

export default model;
